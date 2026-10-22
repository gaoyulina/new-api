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
import { HelpCircle, Plus } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { AnimateInView } from "@/components/animate-in-view"
import { cn } from "@/lib/utils"

interface FaqItem {
  id: string
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    id: "how-to-use",
    q: "How do I get started with an API Key?",
    a: "After creating an account, generate an API Key from the Console tokens page. Then point your developer tool (Cursor, Claude Code, etc.) or SDK Base URL to our endpoint, paste your key, and start invoking models immediately.",
  },
  {
    id: "advantages",
    q: "What are the advantages compared to buying directly from official platforms?",
    a: "1. No need for overseas credit cards or managing multiple provider accounts; 2. Unified access to Claude, DeepSeek, GPT-4o, and Gemini under one balance; 3. Native Prompt Cache discounts (up to 90% savings); 4. Automated multi-channel failover to ensure production-scale uptime.",
  },
  {
    id: "failover",
    q: "How does the gateway handle upstream 429 rate limits or outages?",
    a: "Our gateway features automated health probes and multi-channel routing. If a primary channel hits rate limits or network latency spikes, traffic is automatically rerouted to standby pools in milliseconds with zero client-side connection drops.",
  },
  {
    id: "billing",
    q: "How is billing calculated, and does quota expire?",
    a: "Billing is strictly pay-as-you-go, calculated to 6 decimal places according to actual token usage. Every transaction is transparently recorded in your access log. Quota balances never expire and have no expiration dates.",
  },
  {
    id: "streaming",
    q: "Are streaming SSE, multimodal vision, and tool calls fully supported?",
    a: "Yes. Our relay architecture natively normalizes Server-Sent Events (SSE) streaming, Tool Calls / Function Calling, and multimodal payloads across all supported providers without conversion penalties.",
  },
]

export function HomeFaq() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="relative z-10 border-t border-border/40 px-6 py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <AnimateInView className="mb-8 md:mb-10 text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <HelpCircle className="size-3.5 text-primary" />
            <span>{t("Frequently Asked Questions")}</span>
          </div>
          <h2 className="text-2xl leading-tight font-bold tracking-tight md:text-3xl text-foreground">
            {t("Got Questions? We Have Answers.")}
          </h2>
        </AnimateInView>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <AnimateInView
                key={item.id}
                delay={idx * 50}
                animation="fade-up"
                className="overflow-hidden rounded-xl border border-border/70 bg-card/60 backdrop-blur-xs transition-colors hover:border-border"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left md:px-6 md:py-5"
                >
                  <span className="font-semibold text-sm text-foreground md:text-base">
                    {t(item.q)}
                  </span>
                  <div
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/40 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-45 text-primary"
                    )}
                  >
                    <Plus className="size-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border/40 px-5 pb-5 pt-3 text-xs leading-relaxed text-muted-foreground md:px-6 md:text-sm">
                    {t(item.a)}
                  </div>
                )}
              </AnimateInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
