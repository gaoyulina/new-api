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
import { Link } from "@tanstack/react-router"
import { ArrowRight, Sparkles, TrendingDown } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateInView } from "@/components/animate-in-view"
import { getLobeIcon } from "@/lib/lobe-icon"

import { SpotlightCard } from "./spotlight-card"

interface DiscountModel {
  id: string
  name: string
  icon: string
  ratio: string
  discountBadge: string
  highlight: string
  tag: string
  accentColor: string
}

const DISCOUNT_MODELS: DiscountModel[] = [
  {
    id: "claude-3-7",
    name: "Claude 3.7 Sonnet",
    icon: "Claude.Color",
    ratio: "0.7x",
    discountBadge: "30% OFF",
    highlight: "Prompt Cache 10% Off · 200K Context",
    tag: "POPULAR",
    accentColor: "rgba(217, 119, 6, 0.15)",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1 / V3",
    icon: "DeepSeek.Color",
    ratio: "0.5x",
    discountBadge: "50% OFF",
    highlight: "Full Reasoning Chain · High Concurrency",
    tag: "SUPER SAVER",
    accentColor: "rgba(99, 102, 241, 0.15)",
  },
  {
    id: "gpt-4o",
    name: "OpenAI GPT-4o",
    icon: "OpenAI.Color",
    ratio: "0.8x",
    discountBadge: "20% OFF",
    highlight: "Multimodal Vision · Global Edge Routing",
    tag: "ENTERPRISE",
    accentColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: "gemini-2-5",
    name: "Gemini 2.5 Flash",
    icon: "Gemini.Color",
    ratio: "0.7x",
    discountBadge: "30% OFF",
    highlight: "1M Long Context · Sub-100ms Inference",
    tag: "ULTRA FAST",
    accentColor: "rgba(56, 189, 248, 0.15)",
  },
]

export function DiscountStrip() {
  const { t } = useTranslation()

  return (
    <section className="relative z-10 border-y border-border/40 bg-muted/10 px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <AnimateInView className="mb-8 md:mb-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <TrendingDown className="size-3.5 text-primary" />
            <span>{t("Pricing Advantage")}</span>
          </div>
          <h2 className="text-2xl leading-tight font-bold tracking-tight md:text-3xl text-foreground">
            {t("Significantly Below Official Pricing")}
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
              {t("Transparent Real-Time Settlement")}
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {t(
              "Enjoy native Prompt Cache discounts, automated pool load balancing, and accurate pay-as-you-go billing with 6-decimal transparency."
            )}
          </p>
        </AnimateInView>

        {/* 4 Discount Highlight Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DISCOUNT_MODELS.map((item, idx) => (
            <AnimateInView
              key={item.id}
              delay={idx * 80}
              animation="scale-in"
              className="flex"
            >
              <SpotlightCard
                spotlightColor={item.accentColor}
                className="flex w-full flex-col justify-between p-6 transition-all duration-300 hover:border-border"
              >
                <div>
                  {/* Top Bar: Icon + Model Name + Tag */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 shrink-0 items-center justify-center">
                        {getLobeIcon(item.icon, 24)}
                      </div>
                      <span className="font-semibold text-sm text-foreground truncate max-w-[130px]">
                        {item.name}
                      </span>
                    </div>
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>

                  {/* Big Discount Number */}
                  <div className="my-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-4xl font-extrabold tracking-tight text-foreground">
                        {item.ratio}
                      </span>
                      <span className="font-mono text-xs font-semibold text-emerald-500 uppercase">
                        {t("of Official")}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-xs font-semibold text-primary">
                      {item.discountBadge}
                    </div>
                  </div>
                </div>

                {/* Subtext Highlight */}
                <div className="mt-4 border-t border-border/50 pt-3">
                  <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                    {item.highlight}
                  </p>
                </div>
              </SpotlightCard>
            </AnimateInView>
          ))}
        </div>

        {/* Bottom Link to Full Pricing Matrix */}
        <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            <span>{t("No minimum commitment · Instant quota top-up")}</span>
          </div>
          <Link
            to="/pricing"
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary hover:underline"
          >
            <span>{t("View All 100+ Models & Pricing")}</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
