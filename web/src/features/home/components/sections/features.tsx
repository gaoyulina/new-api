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
import { Code, Shield, Zap } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateInView } from "@/components/animate-in-view"

import { SpotlightCard } from "../spotlight-card"

interface FeaturesProps {
  className?: string
}

export function Features(_props: FeaturesProps) {
  const { t } = useTranslation()

  const features = [
    {
      id: "failover",
      num: "01",
      title: t("Intelligent Circuit Breaker & Failover"),
      desc: t(
        "Automated health monitoring, channel weight balancing, and zero-downtime failover across 40+ providers."
      ),
      icon: <Zap className="size-3.5 text-blue-400" />,
      spotlightColor: "rgba(59, 130, 246, 0.12)",
      visual: (
        <div className="mt-6 space-y-2 font-mono text-[11px]">
          <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-muted-foreground">Primary Node</span>
            </div>
            <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-500">
              HTTP 429
            </span>
          </div>
          <div className="flex items-center justify-center py-0.5">
            <span className="text-[10px] text-muted-foreground/60">
              ↓ 0ms Auto-Failover
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-foreground">Backup Node</span>
            </div>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-semibold text-[10px] text-emerald-400">
              ROUTED · 200 OK
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "finops",
      num: "02",
      title: t("Transparent FinOps Cost Engine"),
      desc: t(
        "6-decimal cost transparency with native prompt cache discounts (up to 90% savings) and model multipliers."
      ),
      icon: <Shield className="size-3.5 text-emerald-400" />,
      spotlightColor: "rgba(16, 185, 129, 0.12)",
      visual: (
        <div className="mt-6 rounded-lg border border-border/50 bg-muted/20 p-3 font-mono text-[11px] space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Prompt Cache Hit</span>
            <span className="font-semibold text-emerald-400">1,024 toks · 0.1x</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Reasoning Tokens</span>
            <span className="font-semibold text-foreground">512 toks</span>
          </div>
          <div className="my-1 h-px bg-border/40" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Settled Quota</span>
            <span className="font-bold text-emerald-400">$0.000412</span>
          </div>
        </div>
      ),
    },
    {
      id: "protocol",
      num: "03",
      title: t("Zero-Friction Protocol Converter"),
      desc: t(
        "Translate standard OpenAI format into Anthropic Messages, Google Vertex, or Bedrock payloads on the fly."
      ),
      icon: <Code className="size-3.5 text-purple-400" />,
      spotlightColor: "rgba(168, 85, 247, 0.12)",
      visual: (
        <div className="mt-6 flex flex-col gap-2 font-mono text-[11px]">
          <div className="flex items-center justify-between gap-1">
            <div className="flex-1 rounded-md border border-border/50 bg-muted/30 p-2 text-center">
              <div className="text-[10px] text-muted-foreground">Inbound</div>
              <div className="mt-0.5 font-semibold text-xs text-foreground">OpenAI /chat</div>
            </div>
            <div className="px-1 font-bold text-muted-foreground">⇄</div>
            <div className="flex-1 rounded-md border border-primary/30 bg-primary/5 p-2 text-center">
              <div className="text-[10px] text-primary">Gateway</div>
              <div className="mt-0.5 font-semibold text-xs text-primary">Relay Core</div>
            </div>
            <div className="px-1 font-bold text-muted-foreground">⇄</div>
            <div className="flex-1 rounded-md border border-border/50 bg-muted/30 p-2 text-center">
              <div className="text-[10px] text-muted-foreground">Upstream</div>
              <div className="mt-0.5 font-semibold text-xs text-foreground">Anthropic / Gemini</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground/70 pt-1">
            <span>• Stream SSE Normal</span>
            <span>• Tools Normalized</span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section className="relative z-10 px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <AnimateInView className="mb-8 md:mb-10 max-w-xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <Shield className="size-3.5 text-primary" />
            <span>{t("Enterprise Gateway Architecture")}</span>
          </div>
          <h2 className="text-2xl leading-tight font-bold tracking-tight md:text-3xl text-foreground">
            {t("Production-Grade Infrastructure,")}
            <br />
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/60 bg-clip-text text-transparent">
              {t("Engineered for Resilient AI Workloads")}
            </span>
          </h2>
        </AnimateInView>

        {/* Clean 3-column architecture cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <AnimateInView
              key={f.id}
              delay={i * 80}
              animation="scale-in"
              className="flex"
            >
              <SpotlightCard
                spotlightColor={f.spotlightColor}
                className="flex w-full flex-col justify-between p-6 md:p-7"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-6 items-center justify-center rounded-md border border-border/60 bg-muted/60 font-mono text-[10px] font-semibold text-muted-foreground tabular-nums">
                        {f.num}
                      </span>
                      <h3 className="font-semibold text-sm text-foreground">{f.title}</h3>
                    </div>
                    <div className="flex size-6 items-center justify-center rounded-md border border-border/40 bg-muted/20">
                      {f.icon}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
                {f.visual}
              </SpotlightCard>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
