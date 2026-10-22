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
import { BarChart3, ChevronRight, Settings, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

import { SpotlightCard } from '../spotlight-card'

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '01',
      title: t('Configure'),
      desc: t(
        'Add your API keys, set up channels and configure access permissions'
      ),
      icon: <Settings className='size-5 text-blue-400' strokeWidth={1.5} />,
      badge: 'Step 1 · Credential Provisioning',
      snippet: 'Set Upstream Keys & Routing Rules',
    },
    {
      num: '02',
      title: t('Connect'),
      desc: t(
        'Connect through OpenAI, Claude, Gemini, and other compatible API routes'
      ),
      icon: <Zap className='size-5 text-emerald-400' strokeWidth={1.5} />,
      badge: 'Step 2 · Gateway Routing',
      snippet: 'POST /v1/chat/completions',
    },
    {
      num: '03',
      title: t('Monitor'),
      desc: t('Track usage, costs and performance with real-time analytics'),
      icon: <BarChart3 className='size-5 text-purple-400' strokeWidth={1.5} />,
      badge: 'Step 3 · Real-time Telemetry',
      snippet: 'FinOps Breakdown & Audit Logs',
    },
  ]

  return (
    <section className='relative z-10 border-t border-border/40 px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 text-center md:mb-20'>
          <p className='mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase'>
            {t('How It Works')}
          </p>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('Three steps to get started')}
          </h2>
        </AnimateInView>

        <div className='grid gap-6 md:grid-cols-3'>
          {steps.map((step, i) => (
            <AnimateInView
              key={step.num}
              delay={i * 120}
              animation='fade-up'
              className='relative flex flex-col'
            >
              <SpotlightCard
                spotlightColor={
                  i === 0
                    ? 'rgba(59, 130, 246, 0.12)'
                    : i === 1
                      ? 'rgba(16, 185, 129, 0.12)'
                      : 'rgba(168, 85, 247, 0.12)'
                }
                className='flex h-full flex-col justify-between p-6'
              >
                <div>
                  <div className='mb-4 flex items-center justify-between'>
                    <div className='flex size-10 items-center justify-center rounded-xl border border-border/50 bg-muted/30'>
                      {step.icon}
                    </div>
                    <span className='font-mono font-bold text-xs text-muted-foreground/60 tabular-nums'>
                      {step.num}
                    </span>
                  </div>

                  <div className='mb-1 font-mono text-[10px] text-muted-foreground/70'>
                    {step.badge}
                  </div>
                  <h3 className='mb-2 font-semibold text-base text-foreground'>
                    {step.title}
                  </h3>
                  <p className='text-xs leading-relaxed text-muted-foreground'>
                    {step.desc}
                  </p>
                </div>

                <div className='mt-6 flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-3 py-2 font-mono text-[11px] text-muted-foreground/80'>
                  <span className='truncate'>{step.snippet}</span>
                  <ChevronRight className='size-3.5 shrink-0 text-muted-foreground/50' />
                </div>
              </SpotlightCard>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
