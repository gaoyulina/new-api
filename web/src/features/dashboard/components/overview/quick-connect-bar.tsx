/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from '@tanstack/react-router'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  Globe,
  KeyRound,
  Zap,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { CopyButton } from '@/components/copy-button'
import { Button } from '@/components/ui/button'
import { IconBadge } from '@/components/ui/icon-badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getLatencyColorClass,
  testUrlLatency,
} from '@/features/dashboard/lib/api-info'
import type { PingStatus } from '@/features/dashboard/types'
import { fetchTokenKey } from '@/features/keys/api'
import type { ApiKey } from '@/features/keys/types'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { handleServerError } from '@/lib/handle-server-error'
import { MOTION_TRANSITION } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface QuickConnectBarProps {
  endpoint?: string
  preferredKey?: ApiKey | null
  model?: string
}

function getBaseUrl(rawUrl?: string): string {
  if (typeof window === 'undefined') return ''
  const trimmed = rawUrl?.trim() || window.location.origin
  const withoutTrailingSlash = trimmed.replace(/\/+$/, '')
  if (withoutTrailingSlash.endsWith('/v1/chat/completions')) {
    return withoutTrailingSlash.replace(/\/chat\/completions$/, '')
  }
  if (withoutTrailingSlash.endsWith('/v1')) {
    return withoutTrailingSlash
  }
  return `${withoutTrailingSlash}/v1`
}

function formatMaskedKey(key?: string): string {
  if (!key) return 'sk-...'
  const full = key.startsWith('sk-') ? key : `sk-${key}`
  if (full.length <= 14) return full
  return `${full.slice(0, 8)}...${full.slice(-4)}`
}

export function QuickConnectBar(props: QuickConnectBarProps) {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'curl' | 'python' | 'cursor' | 'clients'>('curl')
  const [pingStatus, setPingStatus] = useState<PingStatus>({
    latency: null,
    testing: false,
    error: false,
  })
  const [isCopyingKey, setIsCopyingKey] = useState(false)
  const [hasCopiedKey, setHasCopiedKey] = useState(false)
  const { copyToClipboard } = useCopyToClipboard({ notify: false })

  const baseUrl = useMemo(() => getBaseUrl(props.endpoint), [props.endpoint])
  const activeModel = props.model || 'gpt-4o-mini'
  const displayKey = useMemo(
    () => formatMaskedKey(props.preferredKey?.key),
    [props.preferredKey?.key]
  )

  const handlePing = useCallback(async () => {
    if (!baseUrl || pingStatus.testing) return
    setPingStatus((prev) => ({ ...prev, testing: true, error: false }))
    const result = await testUrlLatency(baseUrl)
    setPingStatus(result)
  }, [baseUrl, pingStatus.testing])

  useEffect(() => {
    if (baseUrl) {
      void handlePing()
    }
  }, [baseUrl, handlePing])

  const handleCopyApiKey = async () => {
    if (!props.preferredKey?.id || isCopyingKey) return
    setIsCopyingKey(true)
    try {
      const result = await fetchTokenKey(props.preferredKey.id)
      const key = result.success && result.data?.key ? result.data.key : ''
      if (!key) {
        handleServerError(result, t('Failed to copy to clipboard'))
        return
      }
      const fullKey = key.startsWith('sk-') ? key : `sk-${key}`
      const copied = await copyToClipboard(fullKey)
      if (copied) {
        setHasCopiedKey(true)
        toast.success(t('Copied to clipboard'))
        setTimeout(() => setHasCopiedKey(false), 2000)
      } else {
        toast.error(t('Failed to copy to clipboard'))
      }
    } catch (error) {
      handleServerError(error, t('Failed to copy to clipboard'))
    } finally {
      setIsCopyingKey(false)
    }
  }

  const curlSnippet = useMemo(() => {
    return [
      `curl ${baseUrl}/chat/completions \\`,
      '  -H "Content-Type: application/json" \\',
      `  -H "Authorization: Bearer ${displayKey}" \\`,
      `  -d '{"model":"${activeModel}","messages":[{"role":"user","content":"Hello!"}]}'`,
    ].join('\n')
  }, [baseUrl, displayKey, activeModel])

  const pythonSnippet = useMemo(() => {
    return [
      'from openai import OpenAI',
      '',
      'client = OpenAI(',
      `    base_url="${baseUrl}",`,
      `    api_key="${displayKey}",`,
      ')',
      '',
      'response = client.chat.completions.create(',
      `    model="${activeModel}",`,
      '    messages=[{"role": "user", "content": "Hello!"}],',
      ')',
      'print(response.choices[0].message.content)',
    ].join('\n')
  }, [baseUrl, displayKey, activeModel])

  const cursorSnippet = useMemo(() => {
    return [
      '# Cursor / Claude Code Configuration',
      `Base URL : ${baseUrl}`,
      `API Key  : ${displayKey}`,
      `Model    : ${activeModel}`,
    ].join('\n')
  }, [baseUrl, displayKey, activeModel])

  const clientsSnippet = useMemo(() => {
    return [
      '# NextChat / Cherry Studio / LobeChat Settings:',
      'Provider : OpenAI Compatible',
      `Endpoint : ${baseUrl}`,
      `API Key  : ${displayKey}`,
      `Model    : ${activeModel}`,
    ].join('\n')
  }, [baseUrl, displayKey, activeModel])

  const currentSnippetCode = useMemo(() => {
    switch (activeTab) {
      case 'curl':
        return curlSnippet
      case 'python':
        return pythonSnippet
      case 'cursor':
        return cursorSnippet
      case 'clients':
        return clientsSnippet
    }
  }, [activeTab, curlSnippet, pythonSnippet, cursorSnippet, clientsSnippet])

  return (
    <div className='bg-card/80 border-border/80 relative overflow-hidden rounded-2xl border shadow-xs backdrop-blur'>
      <div className='bg-primary/20 pointer-events-none absolute inset-x-0 top-0 h-px' aria-hidden='true' />

      <div className='flex flex-wrap items-center justify-between gap-3 p-3.5 sm:px-5 sm:py-3.5'>
        <div className='flex min-w-0 flex-1 flex-wrap items-center gap-3'>
          <div className='flex items-center gap-2'>
            <IconBadge tone='info' size='sm'>
              <Globe className='size-3.5' />
            </IconBadge>
            <span className='text-xs font-semibold tracking-wide text-foreground uppercase'>
              {t('Base URL')}
            </span>
          </div>

          <div className='bg-muted/50 border-border/60 flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs text-foreground'>
            <span className='select-all font-medium'>{baseUrl}</span>
            <CopyButton
              value={baseUrl}
              size='sm'
              className='size-5 p-0'
              iconClassName='size-3'
            />
          </div>

          <button
            type='button'
            onClick={handlePing}
            disabled={pingStatus.testing}
            title={t('Test Latency')}
            className='hover:bg-muted/60 border-border/60 flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs transition-colors'
          >
            <Zap
              className={cn(
                'size-3',
                pingStatus.testing && 'animate-spin text-warning'
              )}
            />
            {pingStatus.testing ? (
              <span className='text-muted-foreground font-mono text-[11px]'>
                {t('Testing...')}
              </span>
            ) : pingStatus.latency !== null ? (
              <span
                className={cn(
                  'font-mono text-[11px] font-medium',
                  getLatencyColorClass(pingStatus.latency)
                )}
              >
                {pingStatus.latency}ms
              </span>
            ) : pingStatus.error ? (
              <span className='text-destructive font-mono text-[11px]'>
                {t('N/A')}
              </span>
            ) : (
              <span className='text-muted-foreground font-mono text-[11px]'>
                {t('Test Latency')}
              </span>
            )}
          </button>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          {props.preferredKey ? (
            <div className='border-border/60 bg-muted/50 flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs'>
              <KeyRound className='text-muted-foreground size-3.5 shrink-0' />
              <span className='text-muted-foreground max-w-28 truncate font-medium'>
                {props.preferredKey.name}
              </span>
              <span className='text-foreground font-mono'>{displayKey}</span>
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground hover:text-foreground size-5 p-0'
                disabled={isCopyingKey}
                onClick={handleCopyApiKey}
                aria-label={t('Copy')}
              >
                {hasCopiedKey ? (
                  <Check className='text-success size-3' />
                ) : (
                  <Copy className='size-3' />
                )}
              </Button>
            </div>
          ) : (
            <Button
              size='sm'
              variant='outline'
              className='h-7 text-xs'
              render={<Link to='/keys' />}
            >
              <KeyRound data-icon='inline-start' className='size-3.5' />
              {t('Create API Key')}
            </Button>
          )}

          <Button
            variant='outline'
            size='sm'
            className='h-7 gap-1 px-2.5 text-xs'
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            <Code2 className='size-3.5' />
            <span>{t('Integrations')}</span>
            {isExpanded ? (
              <ChevronUp className='size-3' />
            ) : (
              <ChevronDown className='size-3' />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
          animate={
            shouldReduceMotion ? undefined : { height: 'auto', opacity: 1 }
          }
          transition={MOTION_TRANSITION.fast}
          className='border-border/60 bg-muted/20 border-t p-3 sm:px-5 sm:py-4'
        >
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as typeof activeTab)}
          >
            <div className='flex flex-wrap items-center justify-between gap-2 pb-2'>
              <TabsList className='bg-muted/60 h-7'>
                <TabsTrigger value='curl' className='h-6 px-2 text-xs'>
                  cURL
                </TabsTrigger>
                <TabsTrigger value='python' className='h-6 px-2 text-xs'>
                  Python
                </TabsTrigger>
                <TabsTrigger value='cursor' className='h-6 px-2 text-xs'>
                  Cursor / Claude
                </TabsTrigger>
                <TabsTrigger value='clients' className='h-6 px-2 text-xs'>
                  Chat Clients
                </TabsTrigger>
              </TabsList>

              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground font-mono text-[11px]'>
                  {activeModel}
                </span>
                <CopyButton
                  value={currentSnippetCode}
                  variant='outline'
                  size='sm'
                  className='h-7 gap-1 px-2 text-xs'
                >
                  <Copy className='size-3' />
                  <span>{t('Copy')}</span>
                </CopyButton>
              </div>
            </div>

            <div className='bg-foreground/[0.04] border-border/40 relative overflow-hidden rounded-xl border p-3 font-mono text-xs'>
              <TabsContent value='curl' className='m-0 overflow-x-auto whitespace-pre text-muted-foreground'>
                {curlSnippet}
              </TabsContent>
              <TabsContent value='python' className='m-0 overflow-x-auto whitespace-pre text-muted-foreground'>
                {pythonSnippet}
              </TabsContent>
              <TabsContent value='cursor' className='m-0 overflow-x-auto whitespace-pre text-muted-foreground'>
                {cursorSnippet}
              </TabsContent>
              <TabsContent value='clients' className='m-0 overflow-x-auto whitespace-pre text-muted-foreground'>
                {clientsSnippet}
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      )}
    </div>
  )
}
