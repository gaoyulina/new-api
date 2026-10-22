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
  ArrowRight,
  Check,
  Coins,
  Copy,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'

import { SpotlightCard } from './spotlight-card'

interface CuratedModel {
  id: string
  name: string
  modelId: string
  provider: string
  icon: string
  tags: string[]
  inputPrice: string
  outputPrice: string
  cachePrice: string
  context: string
  categories: string[]
}

const CURATED_MODELS: CuratedModel[] = [
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    modelId: 'claude-3-7-sonnet-20250219',
    provider: 'Anthropic',
    icon: 'Claude.Color',
    tags: ['Reasoning', 'Coding', 'Tools'],
    inputPrice: '$3.00',
    outputPrice: '$15.00',
    cachePrice: '$0.30',
    context: '200K',
    categories: ['reasoning', 'coding', 'multimodal'],
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    modelId: 'deepseek-reasoner',
    provider: 'DeepSeek',
    icon: 'DeepSeek.Color',
    tags: ['Reasoning Chain', 'Math', 'Open Weights'],
    inputPrice: '$0.55',
    outputPrice: '$2.19',
    cachePrice: '$0.14',
    context: '64K',
    categories: ['reasoning', 'coding', 'low-cost'],
  },
  {
    id: 'o3-mini',
    name: 'OpenAI o3-mini',
    modelId: 'o3-mini',
    provider: 'OpenAI',
    icon: 'OpenAI.Color',
    tags: ['STEM Reasoning', 'High Speed', 'Code'],
    inputPrice: '$1.10',
    outputPrice: '$4.40',
    cachePrice: '$0.55',
    context: '200K',
    categories: ['reasoning', 'coding'],
  },
  {
    id: 'gpt-4o',
    name: 'OpenAI GPT-4o',
    modelId: 'gpt-4o',
    provider: 'OpenAI',
    icon: 'OpenAI.Color',
    tags: ['Omni Multimodal', 'Vision', 'Function Calling'],
    inputPrice: '$2.50',
    outputPrice: '$10.00',
    cachePrice: '$1.25',
    context: '128K',
    categories: ['coding', 'multimodal'],
  },
  {
    id: 'gemini-2-5-flash',
    name: 'Gemini 2.5 Flash',
    modelId: 'gemini-2.5-flash',
    provider: 'Google',
    icon: 'Gemini.Color',
    tags: ['1M Context', 'Sub-100ms', 'Multimodal'],
    inputPrice: '$0.075',
    outputPrice: '$0.30',
    cachePrice: '$0.018',
    context: '1M',
    categories: ['multimodal', 'low-cost'],
  },
  {
    id: 'qwen-2-5-coder',
    name: 'Qwen 2.5 Coder 32B',
    modelId: 'qwen-2.5-coder-32b-instruct',
    provider: 'Alibaba Cloud',
    icon: 'Qwen.Color',
    tags: ['Code Specialist', 'Repo Level', 'Fast'],
    inputPrice: '$0.20',
    outputPrice: '$0.60',
    cachePrice: '$0.05',
    context: '128K',
    categories: ['coding', 'low-cost'],
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    modelId: 'deepseek-chat',
    provider: 'DeepSeek',
    icon: 'DeepSeek.Color',
    tags: ['MoE 671B', 'High Throughput', 'General'],
    inputPrice: '$0.14',
    outputPrice: '$0.28',
    cachePrice: '$0.014',
    context: '64K',
    categories: ['low-cost'],
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large 2',
    modelId: 'mistral-large-latest',
    provider: 'Mistral AI',
    icon: 'Mistral.Color',
    tags: ['123B', 'Multilingual', 'Code & Reasoning'],
    inputPrice: '$2.00',
    outputPrice: '$6.00',
    cachePrice: '$0.50',
    context: '128K',
    categories: ['coding'],
  },
]

export function ModelMatrixExplorer() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: t('All Models'), icon: Layers },
    { id: 'reasoning', label: t('Deep Reasoning'), icon: Sparkles },
    { id: 'coding', label: t('Coding & Agents'), icon: Zap },
    { id: 'multimodal', label: t('Vision & Multimodal'), icon: Coins },
    { id: 'low-cost', label: t('High Efficiency'), icon: Coins },
  ]

  const filteredModels =
    activeCategory === 'all'
      ? CURATED_MODELS
      : CURATED_MODELS.filter((m) => m.categories.includes(activeCategory))

  const handleCopyModelId = async (modelId: string) => {
    try {
      await navigator.clipboard.writeText(modelId)
      setCopiedId(modelId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Clipboard fallback
    }
  }

  return (
    <section className='relative z-10 px-6 py-20 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        {/* Section Header */}
        <AnimateInView className='mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6'>
          <div>
            <div className='mb-3 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground'>
              <Coins className='size-3.5 text-primary' />
              <span>{t('Live Pricing & Capability Matrix')}</span>
            </div>
            <h2 className='text-2xl leading-tight font-bold tracking-tight md:text-3xl text-foreground'>
              {t('Curated Model Matrix')}
              <br />
              <span className='bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/60 bg-clip-text text-transparent'>
                {t('Real-Time Pricing & Performance at a Glance')}
              </span>
            </h2>
          </div>

          <Button
            variant='outline'
            className='h-10 gap-1.5 border-border/70 hover:border-border font-mono text-xs self-start md:self-auto'
            render={<Link to='/pricing' />}
          >
            <span>{t('View All 100+ Models & Pricing')}</span>
            <ArrowRight className='size-3.5' />
          </Button>
        </AnimateInView>

        {/* Category Filter Pills */}
        <div className='mb-8 flex flex-wrap items-center gap-2'>
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type='button'
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-200',
                  isActive
                    ? 'border-primary/50 bg-primary/10 text-primary font-medium shadow-xs'
                    : 'border-border/60 bg-card/60 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground'
                )}
              >
                <Icon className='size-3.5' />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Models Grid */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {filteredModels.map((m, idx) => {
            const isCopied = copiedId === m.modelId
            return (
              <AnimateInView
                key={m.id}
                delay={idx * 50}
                animation='scale-in'
                className='h-full'
              >
                <SpotlightCard
                  spotlightColor='rgba(59, 130, 246, 0.12)'
                  className='flex h-full flex-col justify-between p-5'
                >
                  {/* Card Header: Icon + Provider + Copy Model ID */}
                  <div>
                    <div className='mb-3 flex items-start justify-between'>
                      <div className='flex items-center gap-2.5'>
                        <div className='flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/30'>
                          {getLobeIcon(m.icon, 20)}
                        </div>
                        <div>
                          <h3 className='font-semibold text-sm text-foreground leading-tight'>
                            {m.name}
                          </h3>
                          <span className='font-mono text-[10px] text-muted-foreground'>
                            {m.provider}
                          </span>
                        </div>
                      </div>

                      <button
                        type='button'
                        onClick={() => handleCopyModelId(m.modelId)}
                        className='flex size-7 items-center justify-center rounded-md border border-border/40 bg-muted/20 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
                        title={`Copy model ID: ${m.modelId}`}
                      >
                        {isCopied ? (
                          <Check className='size-3 text-emerald-400' />
                        ) : (
                          <Copy className='size-3' />
                        )}
                      </button>
                    </div>

                    {/* Model ID Badge */}
                    <div className='mb-3 flex items-center justify-between rounded-md border border-border/40 bg-muted/20 px-2 py-1 font-mono text-[10px] text-muted-foreground/80'>
                      <span className='truncate'>{m.modelId}</span>
                      <span className='text-[9px] uppercase tracking-wider text-muted-foreground/50 shrink-0 ml-1'>
                        {m.context}
                      </span>
                    </div>

                    {/* Capability Tags */}
                    <div className='mb-4 flex flex-wrap gap-1'>
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className='rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Matrix Bottom Row */}
                  <div className='border-t border-border/50 pt-3 font-mono text-xs'>
                    <div className='flex items-center justify-between text-muted-foreground text-[11px] mb-1'>
                      <span>Input / Output:</span>
                      <span className='text-foreground font-semibold'>
                        {m.inputPrice} / {m.outputPrice}
                      </span>
                    </div>
                    <div className='flex items-center justify-between text-[10px] text-emerald-400/90'>
                      <span>Cache Hit:</span>
                      <span>{m.cachePrice} / 1M</span>
                    </div>
                  </div>
                </SpotlightCard>
              </AnimateInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
