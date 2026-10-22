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
import { Laptop } from "lucide-react"
import { useTranslation } from "react-i18next"

import { AnimateInView } from "@/components/animate-in-view"
import { getLobeIcon } from "@/lib/lobe-icon"

import { SpotlightCard } from "./spotlight-card"

interface ToolCard {
  id: string
  name: string
  tag: string
  desc: string
  icon: string
  spotlightColor: string
}

const TOOLS: ToolCard[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    tag: "AGENTIC CLI",
    desc: "Anthropic official terminal CLI, deeply integrated with codebase contexts and autonomous execution.",
    icon: "ClaudeCode.Color",
    spotlightColor: "rgba(217, 119, 6, 0.12)",
  },
  {
    id: "cursor",
    name: "Cursor & Trae",
    tag: "AI CODE EDITOR",
    desc: "Next-gen AI code editor with native support for multi-file Composer, smart completions, and agent modes.",
    icon: "Cursor",
    spotlightColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    id: "cherry-studio",
    name: "Cherry Studio / NextChat",
    tag: "DESKTOP CLIENT",
    desc: "Full-featured desktop & web chat client supporting multi-model comparisons and key synchronization.",
    icon: "CherryStudio.Color",
    spotlightColor: "rgba(168, 85, 247, 0.12)",
  },
  {
    id: "dify",
    name: "Dify & Official SDKs",
    tag: "AI WORKFLOW FRAMEWORK",
    desc: "Enterprise AI workflow orchestration platform and standard OpenAI Python/TypeScript libraries.",
    icon: "OpenAI.Color",
    spotlightColor: "rgba(16, 185, 129, 0.12)",
  },
]

export function ToolsEcosystem() {
  const { t } = useTranslation()

  return (
    <section className="relative z-10 border-t border-border/40 bg-muted/10 px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <AnimateInView className="mb-8 md:mb-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <Laptop className="size-3.5 text-primary" />
            <span>{t("Ecosystem Compatibility")}</span>
          </div>
          <h2 className="text-2xl leading-tight font-bold tracking-tight md:text-3xl text-foreground">
            {t("Fully Compatible With")}
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
              {t("Your Favorite AI Development Tools")}
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {t(
              "Zero friction drop-in compatibility. Connect seamlessly without altering IDE configurations or writing adapter code."
            )}
          </p>
        </AnimateInView>

        {/* 4 Tool Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool, idx) => (
            <AnimateInView
              key={tool.id}
              delay={idx * 70}
              animation="scale-in"
              className="flex"
            >
              <SpotlightCard
                spotlightColor={tool.spotlightColor}
                className="flex w-full flex-col justify-between p-6 transition-all duration-300 hover:border-border"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-border/60 bg-muted/40 p-2">
                      {getLobeIcon(tool.icon, 28)}
                    </div>
                    <span className="rounded bg-muted px-2 py-0.5 font-mono text-[9px] font-bold text-muted-foreground">
                      {tool.tag}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold text-base text-foreground">
                    {tool.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t(tool.desc)}
                  </p>
                </div>
              </SpotlightCard>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
