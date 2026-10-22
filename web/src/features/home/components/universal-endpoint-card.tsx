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
import { Check, Copy, ShieldCheck, Terminal, Zap } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { getLobeIcon } from "@/lib/lobe-icon"
import { cn } from "@/lib/utils"

interface EndpointModel {
  id: string
  name: string
  modelId: string
  icon: string
  provider: string
  latency: string
  cacheSaving: string
  promptExample: string
}

const MODELS: EndpointModel[] = [
  {
    id: "claude",
    name: "Claude 3.7",
    modelId: "claude-3-7-sonnet-20250219",
    icon: "Claude.Color",
    provider: "Anthropic",
    latency: "85ms",
    cacheSaving: "90%",
    promptExample: "Write an asynchronous retry loop with exponential backoff.",
  },
  {
    id: "deepseek",
    name: "DeepSeek R1",
    modelId: "deepseek-reasoner",
    icon: "DeepSeek.Color",
    provider: "DeepSeek",
    latency: "110ms",
    cacheSaving: "75%",
    promptExample: "Verify prime factor decomposition with formal math proof.",
  },
  {
    id: "gpt4o",
    name: "GPT-4o",
    modelId: "gpt-4o",
    icon: "OpenAI.Color",
    provider: "OpenAI",
    latency: "95ms",
    cacheSaving: "50%",
    promptExample: "Extract structured JSON entities from multimodal receipt image.",
  },
  {
    id: "gemini",
    name: "Gemini 2.5",
    modelId: "gemini-2.5-flash",
    icon: "Gemini.Color",
    provider: "Google",
    latency: "68ms",
    cacheSaving: "75%",
    promptExample: "Summarize 500-page engineering design document in seconds.",
  },
]

export function UniversalEndpointCard({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [selectedId, setSelectedId] = useState("claude")
  const [copied, setCopied] = useState(false)

  const activeModel = MODELS.find((m) => m.id === selectedId) ?? MODELS[0]

  const curlCode = `curl https://api.yourdomain.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-your-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${activeModel.modelId}",
    "messages": [{"role": "user", "content": "${activeModel.promptExample}"}],
    "stream": true
  }'`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-2xl backdrop-blur-md",
        className
      )}
    >
      {/* Top Header: Mac dots + Gateway Endpoint address */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-amber-500/80" />
            <span className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
            <Terminal className="size-3.5 text-primary" />
            <span>https://api.yourdomain.com/v1</span>
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>99.99% UP</span>
          </span>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/20 px-3 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5">
          {MODELS.map((item) => {
            const isSelected = item.id === selectedId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs transition-all duration-150",
                  isSelected
                    ? "border border-primary/40 bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                )}
              >
                <div className="flex size-3.5 shrink-0 items-center justify-center">
                  {getLobeIcon(item.icon, 14)}
                </div>
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md border border-border/60 bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Copy cURL"
        >
          {copied ? (
            <>
              <Check className="size-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">{t("Copied")}</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>{t("Copy cURL")}</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className='p-4 font-mono text-xs leading-relaxed text-foreground/90 bg-black/40 overflow-x-auto'>
        <pre className='text-muted-foreground'>
          <span className='text-primary font-semibold'>curl</span>{' '}
          <span className='text-foreground'>https://api.yourdomain.com/v1/chat/completions</span>{' '}
          \
          {'\n'}  -H <span className='text-emerald-400'>"Authorization: Bearer sk-your-key"</span>{' '}
          \
          {'\n'}  -H <span className='text-emerald-400'>"Content-Type: application/json"</span>{' '}
          \
          {'\n'}  -d <span className='text-amber-300'>&#123;</span>
          {'\n'}    <span className='text-sky-300'>"model"</span>:{' '}
          <span className='text-emerald-400 font-bold'>"{activeModel.modelId}"</span>,
          {'\n'}    <span className='text-sky-300'>"messages"</span>: [
          {'\n'}      &#123; <span className='text-sky-300'>"role"</span>:{' '}
          <span className='text-emerald-400'>"user"</span>,{' '}
          <span className='text-sky-300'>"content"</span>:{' '}
          <span className='text-emerald-400'>"{activeModel.promptExample}"</span>{' '}
          &#125;
          {'\n'}    ],
          {'\n'}    <span className='text-sky-300'>"stream"</span>:{' '}
          <span className='text-purple-400 font-bold'>true</span>
          {'\n'}  <span className='text-amber-300'>&#125;</span>
        </pre>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-muted/30 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Zap className="size-3 text-primary" />
            <span>
              Latency: <strong className="text-foreground font-semibold">{activeModel.latency}</strong>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="size-3 text-emerald-400" />
            <span>
              Prompt Cache: <strong className="text-emerald-400 font-semibold">-{activeModel.cacheSaving}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground/80">
          <span>OpenAI Format ⇄</span>
          <span className="text-foreground font-medium">{activeModel.provider} Native</span>
        </div>
      </div>
    </div>
  )
}
