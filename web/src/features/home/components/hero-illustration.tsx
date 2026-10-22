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
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Activity,
  ArrowRight,
  Database,
  KeyRound,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react"

import { getLobeIcon } from "@/lib/lobe-icon"
import { cn } from "@/lib/utils"

interface ModelTarget {
  id: string
  name: string
  vendor: string
  icon: string
  ratio: string
  highlight: string
  latency: string
  accentBorder: string
  glowColor: string
  tagColor: string
}

const TARGET_MODELS: ModelTarget[] = [
  {
    id: "claude-3-7",
    name: "Claude 3.7",
    vendor: "Anthropic",
    icon: "Claude.Color",
    ratio: "0.7x",
    highlight: "Prompt Cache -90%",
    latency: "24ms",
    accentBorder: "border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    glowColor: "rgba(245, 158, 11, 0.25)",
    tagColor: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    vendor: "DeepSeek",
    icon: "DeepSeek.Color",
    ratio: "0.5x",
    highlight: "Full Reasoning Chain",
    latency: "18ms",
    accentBorder: "border-indigo-500/60 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    glowColor: "rgba(99, 102, 241, 0.25)",
    tagColor: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    vendor: "OpenAI",
    icon: "OpenAI.Color",
    ratio: "0.8x",
    highlight: "Multimodal Vision",
    latency: "21ms",
    accentBorder: "border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.25)",
    tagColor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  },
  {
    id: "gemini-2-5",
    name: "Gemini 2.5",
    vendor: "Google",
    icon: "Gemini.Color",
    ratio: "0.7x",
    highlight: "1M Long Context",
    latency: "14ms",
    accentBorder: "border-sky-500/60 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    glowColor: "rgba(56, 189, 248, 0.25)",
    tagColor: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  },
]

interface HeroIllustrationProps {
  className?: string
}

export function HeroIllustration({ className }: HeroIllustrationProps) {
  const { t } = useTranslation()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  useEffect(() => {
    if (isUserInteracting) {
      const timer = setTimeout(() => setIsUserInteracting(false), 12000)
      return () => clearTimeout(timer)
    }

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TARGET_MODELS.length)
    }, 3200)

    return () => clearInterval(interval)
  }, [isUserInteracting])

  const activeModel = TARGET_MODELS[activeIdx]

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[530px] flex-col rounded-3xl border border-border/70 bg-gradient-to-b from-card/90 via-card/60 to-muted/20 p-4 sm:p-5.5 shadow-xl shadow-primary/5 backdrop-blur-xl select-none transition-all duration-300",
        className
      )}
    >
      {/* Dynamic ambient routing aura glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full opacity-30 blur-3xl transition-colors duration-700 -z-10"
        style={{ background: activeModel.glowColor }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-primary/10 opacity-30 blur-3xl -z-10"
      />

      {/* Top Topology Status Bar */}
      <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold text-foreground/90 uppercase tracking-wide">
            {t("Pipeline Active")}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Activity className="size-3 text-emerald-500 animate-pulse" />
            <span>&lt; 10ms</span>
          </span>
          <span>·</span>
          <span className="font-semibold text-foreground/80">99.99% SLA</span>
        </div>
      </div>

      {/* Main 3-Stage Architecture Data Flow Pipeline */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-center sm:gap-0">
        {/* Stage 1: Client Inbound (3 Cols) */}
        <div className="flex flex-col gap-2 sm:col-span-3">
          <div className="font-mono text-[9px] font-bold text-muted-foreground/80 uppercase tracking-wider">
            {t("Client Inbound")}
          </div>

          {/* Node 1: Developer Apps */}
          <div className="rounded-xl border border-border/70 bg-background/80 p-2 shadow-2xs backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-foreground font-semibold text-[11px]">
              <Terminal className="size-3.5 text-primary shrink-0" />
              <span className="truncate">{t("Developer Apps")}</span>
            </div>
            <div className="mt-1 font-mono text-[9px] text-muted-foreground truncate">
              Cursor · Claude Code · SDK
            </div>
          </div>

          {/* Node 2: Unified API Key */}
          <div className="rounded-xl border border-border/70 bg-background/80 p-2 shadow-2xs backdrop-blur-xs">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 text-foreground font-semibold text-[11px] min-w-0">
                <KeyRound className="size-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{t("1 API Key")}</span>
              </div>
              <span className="rounded bg-emerald-500/15 px-1 py-0.2 font-mono text-[8px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                200 OK
              </span>
            </div>
            <div className="mt-1 font-mono text-[9px] text-muted-foreground truncate">
              sk-live-••••98f2
            </div>
          </div>
        </div>

        {/* Conduit 1: Left to Center (1 Col) */}
        <div className="hidden sm:flex sm:col-span-1 items-center justify-center">
          <svg viewBox="0 0 32 64" fill="none" className="w-full h-16">
            <path
              d="M0 20 C16 20, 16 32, 32 32"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-border/80"
            />
            <path
              d="M0 44 C16 44, 16 32, 32 32"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-border/80"
            />
            {/* Animated Flow Dash */}
            <path
              d="M0 32 L32 32"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="text-primary animate-pulse"
            />
          </svg>
        </div>

        {/* Stage 2: New API Gateway Core Engine (4 Cols) */}
        <div className="flex flex-col sm:col-span-4 rounded-2xl border border-primary/30 bg-primary/5 p-2.5 shadow-xs backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-primary/15">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-primary">
              <Layers className="size-3 text-primary" />
              <span>{t("Gateway Engine")}</span>
            </div>
            <span className="size-1.5 rounded-full bg-primary animate-ping" />
          </div>

          <div className="flex flex-col gap-1.5">
            {/* Module 1: Auth & Rate Limit */}
            <div className="flex items-center gap-2 rounded-lg bg-background/80 border border-border/50 px-2 py-1.5 text-[10px]">
              <ShieldCheck className="size-3 text-emerald-500 shrink-0" />
              <div className="min-w-0">
                <div className="font-semibold text-foreground truncate">
                  {t("Auth & Quotas")}
                </div>
              </div>
            </div>

            {/* Module 2: 0ms Auto-Failover */}
            <div className="flex items-center gap-2 rounded-lg bg-background/80 border border-border/50 px-2 py-1.5 text-[10px]">
              <Zap className="size-3 text-amber-500 shrink-0 animate-pulse" />
              <div className="min-w-0">
                <div className="font-semibold text-foreground truncate">
                  {t("0ms Auto-Failover")}
                </div>
              </div>
            </div>

            {/* Module 3: Prompt Cache Saver */}
            <div className="flex items-center gap-2 rounded-lg bg-background/80 border border-border/50 px-2 py-1.5 text-[10px]">
              <Database className="size-3 text-sky-500 shrink-0" />
              <div className="min-w-0">
                <div className="font-semibold text-foreground truncate">
                  {t("Prompt Cache Saver")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conduit 2: Center to Right (1 Col) */}
        <div className="hidden sm:flex sm:col-span-1 items-center justify-center">
          <svg viewBox="0 0 32 160" fill="none" className="w-full h-36">
            {/* 4 Paths to Models */}
            <path d="M0 80 C16 80, 16 20, 32 20" stroke="currentColor" strokeWidth="1.2" className="text-border/70" />
            <path d="M0 80 C16 80, 16 60, 32 60" stroke="currentColor" strokeWidth="1.2" className="text-border/70" />
            <path d="M0 80 C16 80, 16 100, 32 100" stroke="currentColor" strokeWidth="1.2" className="text-border/70" />
            <path d="M0 80 C16 80, 16 140, 32 140" stroke="currentColor" strokeWidth="1.2" className="text-border/70" />

            {/* Active Glowing Flow Pipe */}
            <path
              d={
                activeIdx === 0
                  ? "M0 80 C16 80, 16 20, 32 20"
                  : activeIdx === 1
                  ? "M0 80 C16 80, 16 60, 32 60"
                  : activeIdx === 2
                  ? "M0 80 C16 80, 16 100, 32 100"
                  : "M0 80 C16 80, 16 140, 32 140"
              }
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              className="text-primary animate-pulse transition-all duration-300"
            />
          </svg>
        </div>

        {/* Stage 3: Upstream LLM Mesh (3 Cols) */}
        <div className="flex flex-col gap-1.5 sm:col-span-3">
          <div className="font-mono text-[9px] font-bold text-muted-foreground/80 uppercase tracking-wider">
            {t("Target Engines")}
          </div>

          {TARGET_MODELS.map((model, idx) => {
            const isActive = idx === activeIdx
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  setActiveIdx(idx)
                  setIsUserInteracting(true)
                }}
                className={cn(
                  "relative flex items-center justify-between rounded-xl border px-2.5 py-1.5 text-left transition-all duration-200 cursor-pointer overflow-hidden",
                  isActive
                    ? `${model.accentBorder} shadow-sm ring-1 ring-primary/25 scale-[1.02]`
                    : "border-border/60 bg-card/60 hover:border-border hover:bg-card/90"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded border border-border/50 bg-background p-0.5">
                    {getLobeIcon(model.icon, 14)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[11px] text-foreground truncate leading-tight">
                      {model.name}
                    </div>
                    <div className="font-mono text-[8px] text-muted-foreground truncate">
                      {model.latency}
                    </div>
                  </div>
                </div>

                <span className={cn("rounded px-1 py-0.2 font-mono text-[8px] font-bold border shrink-0", model.tagColor)}>
                  {model.ratio}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Summary Strip */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-2.5 font-mono text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <Sparkles className="size-3 text-primary" />
          <span>{t("40+ Native Upstream Engines")}</span>
        </div>
        <span>·</span>
        <div className="flex items-center gap-1">
          <Zap className="size-3 text-amber-500" />
          <span>{t("0ms Failover")}</span>
        </div>
        <span>·</span>
        <div className="flex items-center gap-1">
          <ShieldCheck className="size-3 text-emerald-500" />
          <span>{t("Prompt Cache")}</span>
        </div>
      </div>
    </div>
  )
}
