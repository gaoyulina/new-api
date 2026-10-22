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
import { Activity, Cpu, Layers, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { SpotlightCard } from '../spotlight-card'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

function Counter(props: CounterProps) {
  const { end, suffix = '', prefix = '', duration = 1600, decimals = 0 } = props
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  const formatValue = useCallback(
    (v: number) =>
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
    [decimals]
  )

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = `${prefix}${formatValue(eased * end)}${suffix}`
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, prefix, suffix, formatValue])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      el.textContent = `${prefix}${formatValue(end)}${suffix}`
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, end, prefix, suffix, formatValue])

  return (
    <span ref={ref} className='tabular-nums'>
      {prefix}0{suffix}
    </span>
  )
}

interface StatsProps {
  className?: string
}

interface StatItem {
  end: number
  suffix: string
  label: string
  tag: string
  icon: typeof Activity
  accent: 'emerald' | 'blue' | 'purple' | 'amber'
  subtext: string
}

export function Stats(_props: StatsProps) {
  const { t } = useTranslation()

  const stats: StatItem[] = [
    {
      end: 50,
      suffix: '+',
      label: t('Upstream Services Integrated'),
      tag: '40+ PROVIDERS',
      icon: Cpu,
      accent: 'blue',
      subtext: 'Auto Load Balancing',
    },
    {
      end: 100,
      suffix: '+',
      label: t('Model Billing Coverage'),
      tag: '6-DECIMAL FINOPS',
      icon: Layers,
      accent: 'emerald',
      subtext: 'Cache Hit Ratio Aware',
    },
    {
      end: 50,
      suffix: '+',
      label: t('Standardized API Endpoints'),
      tag: 'SUB-10MS OVERHEAD',
      icon: Activity,
      accent: 'purple',
      subtext: 'Zero Protocol Penalty',
    },
    {
      end: 10,
      suffix: '+',
      label: t('Scheduling & QoS Controls'),
      tag: 'CIRCUIT BREAKER',
      icon: ShieldCheck,
      accent: 'amber',
      subtext: 'Multi-Key Failover',
    },
  ]

  return (
    <div className='relative z-10 border-y border-border/40 bg-muted/10 py-12 md:py-16'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <SpotlightCard
                key={s.label}
                spotlightColor={
                  s.accent === 'emerald'
                    ? 'rgba(16, 185, 129, 0.14)'
                    : s.accent === 'blue'
                      ? 'rgba(59, 130, 246, 0.14)'
                      : s.accent === 'purple'
                        ? 'rgba(168, 85, 247, 0.14)'
                        : 'rgba(245, 158, 11, 0.14)'
                }
                className='flex flex-col justify-between p-5 transition-all duration-300 hover:border-border'
              >
                {/* Header row: Badge and Icon */}
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-muted-foreground'>
                    <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
                    <span>{s.tag}</span>
                  </div>
                  <div className='flex size-7 items-center justify-center rounded-md border border-border/40 bg-muted/20 text-muted-foreground/80'>
                    <Icon className='size-3.5' />
                  </div>
                </div>

                {/* Counter value */}
                <div className='mb-1.5 font-mono text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl'>
                  <Counter end={s.end} suffix={s.suffix} />
                </div>

                {/* Label & Technical subtext */}
                <div>
                  <div className='text-xs font-medium text-foreground/90'>
                    {s.label}
                  </div>
                  <div className='mt-1 font-mono text-[10px] text-muted-foreground/60'>
                    {s.subtext}
                  </div>
                </div>
              </SpotlightCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
