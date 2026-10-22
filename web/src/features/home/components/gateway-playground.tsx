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
import {
  Activity,
  AlertTriangle,
  Check,
  Copy,
  RotateCcw,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'

interface PlaygroundModel {
  id: string
  name: string
  modelId: string
  icon: string
  normalLatency: number
  failoverLatency: number
  tokens: number
  primaryNode: string
  backupNode: string
  normalResponse: string
  failoverResponse: string
  cost: string
}

const PLAYGROUND_MODELS: PlaygroundModel[] = [
  {
    id: 'claude-3-7',
    name: 'Claude 3.7 Sonnet',
    modelId: 'claude-3-7-sonnet-20250219',
    icon: 'Claude.Color',
    normalLatency: 118,
    failoverLatency: 132,
    tokens: 184,
    primaryNode: 'Anthropic Direct US-East',
    backupNode: 'AWS Bedrock us-west-2',
    normalResponse:
      'Architectural inference complete. Hybrid reasoning tokens analyzed across 4 clusters.',
    failoverResponse:
      'Anthropic primary node returned 429 Too Many Requests. Gateway auto-rerouted to AWS Bedrock in 14ms without dropping connection.',
    cost: '$0.00331',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    modelId: 'deepseek-reasoner',
    icon: 'DeepSeek.Color',
    normalLatency: 84,
    failoverLatency: 92,
    tokens: 246,
    primaryNode: 'DeepSeek Native Tier 1',
    backupNode: 'SiliconFlow Dedicated Cluster',
    normalResponse:
      '<think>Evaluating routing efficiency across 40+ endpoints...</think> Optimal pathway selected.',
    failoverResponse:
      'Primary engine encountered rate-limit saturation. Auto-switched to dedicated fallback cluster in 8ms.',
    cost: '$0.00067',
  },
  {
    id: 'gpt-4o',
    name: 'OpenAI GPT-4o',
    modelId: 'gpt-4o',
    icon: 'OpenAI.Color',
    normalLatency: 96,
    failoverLatency: 110,
    tokens: 168,
    primaryNode: 'OpenAI Tier 5 Direct',
    backupNode: 'Azure OpenAI Sweden Central',
    normalResponse:
      'Multimodal payload ingested and validated against unified schema with zero conversion overhead.',
    failoverResponse:
      'Upstream key quota depleted. Switched to Azure failover pool with zero client error returned.',
    cost: '$0.00210',
  },
  {
    id: 'gemini-2-5',
    name: 'Gemini 2.5 Flash',
    modelId: 'gemini-2.5-flash',
    icon: 'Gemini.Color',
    normalLatency: 68,
    failoverLatency: 76,
    tokens: 142,
    primaryNode: 'Google Vertex AI us-central1',
    backupNode: 'Google Cloud europe-west4',
    normalResponse:
      'Sub-100ms ultra-fast stream delivery complete with 1M context cache support.',
    failoverResponse:
      'Primary zone latency exceeded threshold (400ms). Gateway auto-migrated traffic to standby region in 8ms.',
    cost: '$0.00015',
  },
]

export function GatewayPlayground({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [selectedId, setSelectedId] = useState('claude-3-7')
  const [isSimulatingFailover, setIsSimulatingFailover] = useState(false)
  const [hasCopied, setHasCopied] = useState(false)

  const model =
    PLAYGROUND_MODELS.find((m) => m.id === selectedId) ?? PLAYGROUND_MODELS[0]

  const handleCopyEndpoint = async () => {
    try {
      const code = `curl https://api.yourdomain.com/v1/chat/completions \\\n  -H "Authorization: Bearer sk-your-key" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "${model.modelId}", "messages": [{"role": "user", "content": "Hello"}]}'`
      await navigator.clipboard.writeText(code)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    } catch {
      // Clipboard fallback
    }
  }

  return (
    <div
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card/90 shadow-2xl backdrop-blur-md',
        className
      )}
    >
      {/* Window Titlebar */}
      <div className='flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2.5'>
        {/* Left Mac-style control dots */}
        <div className='flex items-center gap-2'>
          <div className='flex gap-1.5'>
            <span className='size-2.5 rounded-full bg-red-500/80' />
            <span className='size-2.5 rounded-full bg-amber-500/80' />
            <span className='size-2.5 rounded-full bg-emerald-500/80' />
          </div>
          <span className='ml-2 font-mono text-[11px] font-semibold text-muted-foreground'>
            NewAPI Gateway Runtime
          </span>
        </div>

        {/* Right Telemetry status pills */}
        <div className='flex items-center gap-2 font-mono text-[10px]'>
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-medium transition-colors',
              isSimulatingFailover
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
            )}
          >
            <span
              className={cn(
                'size-1.5 rounded-full',
                isSimulatingFailover
                  ? 'bg-amber-400 animate-ping'
                  : 'bg-emerald-400 animate-pulse'
              )}
            />
            <span>
              {isSimulatingFailover
                ? t('CIRCUIT TRIP · FAILOVER ACTIVE')
                : t('ACTIVE · HIGH AVAILABILITY')}
            </span>
          </div>

          <div className='hidden sm:flex items-center gap-1 rounded border border-border/60 bg-muted/60 px-1.5 py-0.5 text-muted-foreground'>
            <Activity className='size-3 text-primary' />
            <span>
              {isSimulatingFailover
                ? `${model.failoverLatency}ms`
                : `${model.normalLatency}ms`}
            </span>
          </div>
        </div>
      </div>

      {/* Model Selector Bar */}
      <div className='flex items-center justify-between border-b border-border/50 bg-muted/20 px-4 py-2 overflow-x-auto no-scrollbar'>
        <div className='flex items-center gap-1.5'>
          {PLAYGROUND_MODELS.map((item) => {
            const isSelected = item.id === selectedId
            return (
              <button
                key={item.id}
                type='button'
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2.5 py-1.5 font-mono text-xs transition-all duration-150',
                  isSelected
                    ? 'border border-primary/40 bg-card text-foreground shadow-xs font-medium'
                    : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                )}
              >
                <div className='flex size-4 shrink-0 items-center justify-center'>
                  {getLobeIcon(item.icon, 16)}
                </div>
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        {/* Copy snippet button */}
        <button
          type='button'
          onClick={handleCopyEndpoint}
          className='hidden md:flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-1 font-mono text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
          title='Copy cURL command'
        >
          {hasCopied ? (
            <>
              <Check className='size-3 text-emerald-400' />
              <span className='text-emerald-400'>Copied</span>
            </>
          ) : (
            <>
              <Copy className='size-3' />
              <span>cURL</span>
            </>
          )}
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className='p-4 sm:p-5 space-y-4'>
        {/* Visual Channel Routing Pipeline */}
        <div className='rounded-lg border border-border/60 bg-muted/25 p-3 font-mono text-xs'>
          <div className='mb-2 flex items-center justify-between text-[11px] text-muted-foreground'>
            <div className='flex items-center gap-1.5'>
              <Zap className='size-3.5 text-primary' />
              <span>Multi-Upstream Traffic Dispatcher</span>
            </div>
            <span className='text-muted-foreground/60'>
              Protocol: OpenAI ⇄ Native
            </span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
            {/* Primary Channel */}
            <div
              className={cn(
                'flex items-center justify-between rounded-md border p-2.5 transition-all duration-300',
                isSimulatingFailover
                  ? 'border-destructive/40 bg-destructive/10 text-destructive'
                  : 'border-emerald-500/30 bg-emerald-500/5 text-foreground'
              )}
            >
              <div className='flex flex-col'>
                <span className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold'>
                  Primary Channel (Weight 80)
                </span>
                <span className='text-xs font-medium truncate max-w-[160px]'>
                  {model.primaryNode}
                </span>
              </div>
              <div className='flex items-center gap-1.5'>
                {isSimulatingFailover ? (
                  <span className='rounded bg-destructive/20 px-1.5 py-0.5 text-[10px] font-bold text-destructive'>
                    HTTP 429
                  </span>
                ) : (
                  <span className='rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400'>
                    ACTIVE · 200 OK
                  </span>
                )}
              </div>
            </div>

            {/* Standby/Failover Channel */}
            <div
              className={cn(
                'flex items-center justify-between rounded-md border p-2.5 transition-all duration-300',
                isSimulatingFailover
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-foreground ring-1 ring-emerald-500/30'
                  : 'border-border/40 bg-muted/30 text-muted-foreground'
              )}
            >
              <div className='flex flex-col'>
                <span className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold'>
                  Backup Channel (Weight 20)
                </span>
                <span className='text-xs font-medium truncate max-w-[160px]'>
                  {model.backupNode}
                </span>
              </div>
              <div className='flex items-center gap-1.5'>
                {isSimulatingFailover ? (
                  <span className='rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 animate-pulse'>
                    ROUTED 0ms
                  </span>
                ) : (
                  <span className='rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground/60'>
                    STANDBY
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Payload Stream Box */}
        <div className='rounded-lg border border-border/70 bg-black/60 p-3.5 font-mono text-xs'>
          <div className='mb-2 flex items-center justify-between text-[11px] text-muted-foreground/70'>
            <span className='text-primary font-medium'>
              POST /v1/chat/completions · {model.modelId}
            </span>
            <span>Tokens: {model.tokens}</span>
          </div>

          <div className='min-h-[56px] text-foreground/90 leading-relaxed'>
            {isSimulatingFailover ? (
              <div className='space-y-1.5'>
                <div className='flex items-center gap-1.5 text-amber-400 text-[11px] font-semibold'>
                  <AlertTriangle className='size-3.5 shrink-0' />
                  <span>[Gateway Telemetry] Auto-Circuit Trip & Re-route</span>
                </div>
                <div className='text-muted-foreground text-[11px]'>
                  {model.failoverResponse}
                </div>
              </div>
            ) : (
              <div className='text-emerald-400/90'>{model.normalResponse}</div>
            )}
          </div>

          {/* Bottom FinOps row */}
          <div className='mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-muted-foreground'>
            <div className='flex items-center gap-3'>
              <span>
                Billing: <strong className='text-foreground'>{model.cost}</strong>
              </span>
              <span>Prompt Cache: 90% Off</span>
            </div>
            <div className='flex items-center gap-1 text-emerald-400'>
              <ShieldCheck className='size-3' />
              <span>Zero Drop Invariant</span>
            </div>
          </div>
        </div>

        {/* Interactive Action Bar */}
        <div className='flex flex-wrap items-center justify-between gap-3 pt-1'>
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant={isSimulatingFailover ? 'destructive' : 'outline'}
              onClick={() => setIsSimulatingFailover((prev) => !prev)}
              className={cn(
                'h-8 gap-1.5 font-mono text-xs transition-all duration-200',
                isSimulatingFailover
                  ? 'border-destructive bg-destructive/20 text-destructive-foreground hover:bg-destructive/30'
                  : 'border-border/70 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400'
              )}
            >
              <RotateCcw
                className={cn(
                  'size-3.5 transition-transform duration-300',
                  isSimulatingFailover && 'rotate-180'
                )}
              />
              <span>
                {isSimulatingFailover
                  ? t('Reset to Normal Routing')
                  : t('Simulate 429 Outage')}
              </span>
            </Button>

            <span className='hidden sm:inline font-mono text-[10px] text-muted-foreground/70'>
              {isSimulatingFailover
                ? t('Simulating real-time upstream failure & zero-downtime failover')
                : t('Click to test instant automated channel failover and zero client drop.')}
            </span>
          </div>

          <div className='font-mono text-[11px] text-muted-foreground/80'>
            Status: <span className='text-emerald-400 font-semibold'>200 OK</span>
          </div>
        </div>
      </div>
    </div>
  )
}
