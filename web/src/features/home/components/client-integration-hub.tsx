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
import { ArrowRight, Check, Copy, Sparkles, Wrench } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { AnimateInView } from "@/components/animate-in-view"
import { useStatus } from "@/hooks/use-status"
import { cn } from "@/lib/utils"

interface SnippetTab {
  id: string
  label: string
  filename: string
  language: string
  code: string
}

interface CodeToken {
  type: "comment" | "keyword" | "string" | "flag" | "property" | "boolean" | "plain"
  text: string
}

const TOKEN_REGEX =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|(?<=^|\s)(?:--[a-zA-Z0-9_-]+|-[a-zA-Z])(?=\s|$)|\\b(?:export|import|from|const|await|new|curl|print)\b|\\b(?:true|false)\b|\\b(?:ANTHROPIC_BASE_URL|ANTHROPIC_API_KEY|baseURL|apiKey|base_url|api_key|model|messages|role|content|stream)\b)/g

function tokenizeLine(line: string): CodeToken[] {
  const trimmed = line.trimStart()
  if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
    return [{ type: "comment", text: line }]
  }

  let cursor = 0
  const tokens: CodeToken[] = []
  const matches = [...line.matchAll(TOKEN_REGEX)]

  matches.forEach((m) => {
    if (m.index! > cursor) {
      tokens.push({ type: "plain", text: line.slice(cursor, m.index) })
    }
    const val = m[0]
    let type: CodeToken["type"] = "plain"
    if (val.startsWith('"') || val.startsWith("'")) {
      type = "string"
    } else if (val.startsWith("-")) {
      type = "flag"
    } else if (
      ["export", "import", "from", "const", "await", "new", "curl", "print"].includes(val)
    ) {
      type = "keyword"
    } else if (["true", "false"].includes(val)) {
      type = "boolean"
    } else {
      type = "property"
    }
    tokens.push({ type, text: val })
    cursor = m.index! + val.length
  })

  if (cursor < line.length) {
    tokens.push({ type: "plain", text: line.slice(cursor) })
  }

  return tokens
}

function renderToken(token: CodeToken, idx: number) {
  switch (token.type) {
    case "comment":
      return (
        <span key={idx} className="text-[#8b949e] italic font-normal">
          {token.text}
        </span>
      )
    case "string":
      return (
        <span key={idx} className="text-[#7ee787] font-medium">
          {token.text}
        </span>
      )
    case "keyword":
      return (
        <span key={idx} className="text-[#ff7b72] font-semibold">
          {token.text}
        </span>
      )
    case "flag":
      return (
        <span key={idx} className="text-[#d2a8ff] font-medium">
          {token.text}
        </span>
      )
    case "property":
      return (
        <span key={idx} className="text-[#79c0ff] font-medium">
          {token.text}
        </span>
      )
    case "boolean":
      return (
        <span key={idx} className="text-[#ffa657] font-semibold">
          {token.text}
        </span>
      )
    default:
      return (
        <span key={idx} className="text-[#e6edf3]">
          {token.text}
        </span>
      )
  }
}

export function ClientIntegrationHub() {
  const { t } = useTranslation()
  const { status } = useStatus()
  const [activeId, setActiveId] = useState("claude-code")
  const [copied, setCopied] = useState(false)

  const docsUrl =
    (status?.docs_link as string | undefined) || "https://docs.newapi.pro"

  const snippets: SnippetTab[] = [
    {
      id: "claude-code",
      label: "Claude Code",
      filename: "terminal",
      language: "bash",
      code: `# 1. Export unified gateway endpoint & API key
export ANTHROPIC_BASE_URL="https://api.yourdomain.com/v1"
export ANTHROPIC_API_KEY="sk-your-api-key"

# 2. Run agentic Claude Code CLI with zero friction
claude --model claude-3-7-sonnet-20250219`,
    },
    {
      id: "cursor",
      label: "Cursor",
      filename: ".cursorrules",
      language: "markdown",
      code: `# Settings > Models > OpenAI API Key & Base URL:
Base URL: https://api.yourdomain.com/v1
API Key:  sk-your-api-key

# In your project .cursorrules:
model: claude-3-7-sonnet-20250219
# Or use deepseek-reasoner for advanced math & coding tasks`,
    },
    {
      id: "openai-python",
      label: "OpenAI SDK",
      filename: "main.py",
      language: "python",
      code: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.yourdomain.com/v1",
    api_key="sk-your-api-key"
)

# Seamlessly invoke any supported upstream model
response = client.chat.completions.create(
    model="deepseek-reasoner",  # or claude-3-7-sonnet, gpt-4o
    messages=[{"role": "user", "content": "Analyze system architecture"}]
)
print(response.choices[0].message.content)`,
    },
    {
      id: "typescript",
      label: "Node.js / TS",
      filename: "index.ts",
      language: "typescript",
      code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.yourdomain.com/v1",
  apiKey: "sk-your-api-key",
});

const response = await client.chat.completions.create({
  model: "claude-3-7-sonnet-20250219",
  messages: [{ role: "user", content: "Optimize throughput" }],
});
console.log(response.choices[0].message.content);`,
    },
    {
      id: "curl",
      label: "cURL",
      filename: "shell",
      language: "bash",
      code: `curl https://api.yourdomain.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-reasoner",
    "messages": [{"role": "user", "content": "Hello world"}],
    "stream": true
  }'`,
    },
  ]

  const activeSnippet =
    snippets.find((s) => s.id === activeId) ?? snippets[0]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <section className="relative z-10 px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Context, instructions, documentation link */}
          <AnimateInView className="flex flex-col items-start lg:col-span-5">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
              <Wrench className="size-3.5 text-primary" />
              <span>{t("Quick Start Guide")}</span>
            </div>
            <h2 className="text-2xl leading-tight font-bold tracking-tight md:text-3xl text-foreground">
              {t("Seamless Integration")}
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
                {t("Into Your Existing Workflow")}
              </span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t(
                "Whether you are working in Claude Code CLI, Cursor IDE, or standard official SDKs, you can start calling leading models instantly by replacing the Base URL and API Key."
              )}
            </p>
            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-primary/25 bg-primary/5 p-3.5 text-xs font-mono text-muted-foreground">
              <Sparkles className="size-4 shrink-0 text-primary mt-0.5" />
              <div>
                <span className="text-foreground font-semibold">Tip: </span>
                {t("Replace sk-your-api-key in snippets with your generated API Token.")}
              </div>
            </div>
            <div className="mt-6">
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:underline"
              >
                <span>{t("Explore Full Integration Docs")}</span>
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </AnimateInView>

          {/* Right Column: High-contrast Dark macOS IDE Code Block */}
          <AnimateInView animation="scale-in" className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117] shadow-2xl ring-1 ring-white/10">
              {/* Window Header Bar */}
              <div className="flex flex-col gap-3 border-b border-[#30363d]/80 bg-[#161b22] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: macOS Window Controls + Tab Pills */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* macOS Traffic Lights */}
                  <div className="hidden sm:flex items-center gap-1.5 pr-2 border-r border-[#30363d]">
                    <span className="size-3 rounded-full bg-[#ff5f56]" />
                    <span className="size-3 rounded-full bg-[#ffbd2e]" />
                    <span className="size-3 rounded-full bg-[#27c93f]" />
                  </div>

                  {/* Tabs */}
                  <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#0d1117]/80 p-1 border border-[#30363d]/60">
                    {snippets.map((s) => {
                      const isActive = s.id === activeId
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setActiveId(s.id)
                            setCopied(false)
                          }}
                          className={cn(
                            "rounded-md px-2.5 py-1 font-mono text-xs transition-all duration-150",
                            isActive
                              ? "bg-[#21262d] text-white font-semibold shadow-xs ring-1 ring-[#30363d]"
                              : "text-[#8b949e] hover:bg-[#21262d]/50 hover:text-[#c9d1d9]"
                          )}
                        >
                          {s.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Right: Filename indicator & Copy button */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="rounded bg-[#21262d] px-2 py-0.5 font-mono text-[10px] text-[#8b949e] border border-[#30363d]/80 hidden sm:inline">
                    {activeSnippet.filename}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 font-mono text-xs text-[#c9d1d9] hover:bg-[#30363d] hover:text-white transition-all duration-150 shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">{t("Copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 text-[#8b949e]" />
                        <span>{t("Copy Code")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Display Area with Syntax Highlighting and Line Numbers */}
              <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed bg-[#0d1117] overflow-x-auto min-h-[220px]">
                <div className="space-y-0.5">
                  {activeSnippet.code.split("\n").map((line, lineIdx) => {
                    const tokens = tokenizeLine(line)
                    return (
                      <div key={lineIdx} className="flex items-start">
                        <span className="w-6 shrink-0 select-none text-right mr-4 text-[#484f58] font-mono text-[11px] leading-relaxed">
                          {lineIdx + 1}
                        </span>
                        <span className="flex-1 whitespace-pre break-all sm:break-normal font-mono text-[12px] leading-relaxed">
                          {tokens.map((token, tIdx) => renderToken(token, tIdx))}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
