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
  KeyRound,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

import { getLobeIcon } from "@/lib/lobe-icon"
import { cn } from "@/lib/utils"

interface ModelRouteNode {
  id: string
  name: string
  vendor: string
  icon: string
  ratio: string
  feature: string
  latency: string
  accentColor: string
  tagColor: string
  glowColor: string
  column: "left" | "right"
}

const MODEL_ROUTES: ModelRouteNode[] = [
  {
    id: "claude-3-7",
    name: "Claude 3.7",
    vendor: "Anthropic",
    icon: "Claude.Color",
    ratio: "0.7x",
    feature: "Prompt Cache -90%",
    latency: "24ms",
    accentColor: "border-amber-500/50 bg-amber-500/5 shadow-amber-500/10",
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    glowColor: "rgba(245, 158, 11, 0.3)",
    column: "left",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    vendor: "DeepSeek",
    icon: "DeepSeek.Color",
    ratio: "0.5x",
    feature: "Full Reasoning Chain",
    latency: "18ms",
    accentColor: "border-indigo-500/50 bg-indigo-500/5 shadow-indigo-500/10",
    tagColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    glowColor: "rgba(99, 102, 241, 0.3)",
    column: "right",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    vendor: "OpenAI",
    icon: "OpenAI.Color",
    ratio: "0.8x",
    feature: "Multimodal Vision",
    latency: "21ms",
    accentColor: "border-emerald-500/50 bg-emerald-500/5 shadow-emerald-500/10",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    glowColor: "rgba(16, 185, 129, 0.3)",
    column: "left",
  },
  {
    id: "gemini-2-5",
    name: "Gemini 2.5",
    vendor: "Google",
    icon: "Gemini.Color",
    ratio: "0.7x",
    feature: "1M Long Context",
    latency: "14ms",
    accentColor: "border-sky-500/50 bg-sky-500/5 shadow-sky-500/10",
    tagColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    glowColor: "rgba(56, 189, 248, 0.3)",
    column: "right",
  },
]

export function GatewayHubSvg({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  useEffect(() => {
    if (isUserInteracting) {
      const timeout = setTimeout(() => setIsUserInteracting(false), 12000)
      return () => clearTimeout(timeout)
    }

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % MODEL_ROUTES.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [isUserInteracting])

  const activeModel = MODEL_ROUTES[activeIdx]

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[480px] flex-col rounded-3xl border border-border/70 bg-gradient-to-b from-card/90 via-card/60 to-muted/20 p-5 sm:p-6 shadow-xl shadow-primary/5 backdrop-blur-xl select-none transition-all duration-300",
        className
      )}
    >
      {/* Top Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-36 w-64 rounded-full opacity-30 blur-3xl transition-colors duration-500"
        style={{ background: activeModel.glowColor }}
      />

      {/* Top Status Header */}
      <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold text-foreground/90 uppercase tracking-wide">
            {t("Traffic Dispatcher · Auto-Routing")}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <Activity className="size-3 text-emerald-500 animate-pulse" />
          <span>{activeModel.latency}</span>
        </div>
      </div>

      {/* Stage 1: Single Unified API Key Capsule */}
      <div className="rounded-2xl border border-border/80 bg-background/80 p-3.5 shadow-xs backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-xs">
              <KeyRound className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-foreground truncate">
                  {t("ONE UNIFIED API KEY")}
                </span>
                <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                  {t("200 AUTH OK")}
                </span>
              </div>
              <div className="font-mono text-[11px] text-muted-foreground truncate">
                sk-live-••••••••••••98f2
              </div>
            </div>
          </div>

          {/* Active Target Name Badge */}
          <div className="text-right shrink-0">
            <span className="block font-mono text-[9px] text-muted-foreground uppercase">
              {t("Active Route")}
            </span>
            <span className="font-mono text-xs font-bold text-primary truncate max-w-[120px] inline-block">
              {activeModel.name}
            </span>
          </div>
        </div>

        {/* Route Path bar */}
        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-muted/40 border border-border/50 px-2.5 py-1.5 font-mono text-[11px]">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">POST</span>
            <span className="text-muted-foreground truncate">/v1/chat/completions</span>
          </div>
          <span className="text-[10px] text-muted-foreground shrink-0">
            Bearer sk-live-•••
          </span>
        </div>
      </div>

      {/* Stage 2: Elegant Fiber-Optic Conduit Splitter */}
      <div className="relative my-2.5 flex h-8 w-full items-center justify-center">
        <svg
          viewBox="0 0 400 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Neutral Paths */}
          <path
            d="M200 0 C200 16, 100 16, 100 32"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-border/80"
          />
          <path
            d="M200 0 C200 16, 300 16, 300 32"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-border/80"
          />

          {/* Active Glowing Flow Beam */}
          <path
            d={
              activeModel.column === "left"
                ? "M200 0 C200 16, 100 16, 100 32"
                : "M200 0 C200 16, 300 16, 300 32"
            }
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            className="text-primary animate-pulse"
          />

          {/* Center Dispatch Hub Icon */}
          <circle
            cx="200"
            cy="16"
            r="10"
            className="fill-card stroke-primary"
            strokeWidth="2"
          />
          <circle
            cx="200"
            cy="16"
            r="4"
            className="fill-primary animate-ping opacity-80"
          />
        </svg>

        {/* Floating Router Pill */}
        <div className="absolute top-1/2 -translate-y-1/2 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 text-[9px] font-mono text-muted-foreground shadow-xs">
          0ms Auto-Failover
        </div>
      </div>

      {/* Stage 3: 2x2 Model Telemetry Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {MODEL_ROUTES.map((route, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={route.id}
              type="button"
              onClick={() => {
                setActiveIdx(idx)
                setIsUserInteracting(true)
              }}
              className={cn(
                "relative flex flex-col justify-between rounded-2xl border p-3.5 text-left transition-all duration-200 cursor-pointer overflow-hidden",
                isActive
                  ? `${route.accentColor} shadow-md ring-1 ring-primary/20 scale-[1.02]`
                  : "border-border/60 bg-card/60 hover:border-border hover:bg-card/90 hover:shadow-xs"
              )}
            >
              {/* Header: Logo + Discount Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-background p-1 shadow-2xs">
                  {getLobeIcon(route.icon, 18)}
                </div>
                <span className={cn("rounded px-1.5 py-0.2 font-mono text-[9px] font-bold border", route.tagColor)}>
                  {route.ratio} {t("of Official")}
                </span>
              </div>

              {/* Model Name & Feature */}
              <div>
                <div className="font-semibold text-xs text-foreground truncate">
                  {route.name}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground truncate mt-0.5">
                  {t(route.feature)}
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-1.5 font-mono text-[9px]">
                <span className={isActive ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground/70"}>
                  {isActive ? t("ACTIVE ROUTE") : t("STANDBY")}
                </span>
                <span className="text-muted-foreground">{route.latency}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom Sub-bar */}
      <div className="mt-3.5 flex items-center justify-between border-t border-border/50 pt-2.5 font-mono text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <Zap className="size-3 text-amber-500" />
          <span>{t("0ms Failover")}</span>
        </div>
        <span>·</span>
        <div className="flex items-center gap-1">
          <ShieldCheck className="size-3 text-emerald-500" />
          <span>{t("Auto Balanced")}</span>
        </div>
        <span>·</span>
        <div className="flex items-center gap-1">
          <Sparkles className="size-3 text-sky-500" />
          <span>{t("Prompt Cache")}</span>
        </div>
      </div>
    </div>
  )
}

