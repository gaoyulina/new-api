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
import { ArrowRight, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'

import { SpotlightCard } from '../spotlight-card'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  if (props.isAuthenticated) {
    return null
  }

  return (
    <section className='relative z-10 overflow-hidden px-6 py-16 md:py-24'>
      <div className='mx-auto max-w-4xl'>
        <AnimateInView animation='scale-in'>
          <SpotlightCard
            spotlightColor='rgba(59, 130, 246, 0.14)'
            className='relative overflow-hidden p-8 text-center md:p-14'
          >
            <div className='mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground'>
              <Terminal className='size-3.5 text-primary' />
              <span>{t('Get Started in Seconds')}</span>
            </div>

            <h2 className='text-2xl leading-tight font-bold tracking-tight md:text-4xl'>
              {t('Ready to build resilient,')}
              <br />
              <span className='bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/60 bg-clip-text text-transparent'>
                {t('production-grade AI applications?')}
              </span>
            </h2>
            <p className='text-muted-foreground/80 mx-auto mt-4 max-w-lg text-sm leading-relaxed md:text-base'>
              {t(
                'Deploy your own enterprise gateway or connect immediately to start routing requests with automated failover and transparent billing.'
              )}
            </p>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
              <Button
                className='group h-11 rounded-lg px-6 text-sm font-medium'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started Free')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='border-border/50 hover:border-border hover:bg-muted/50 h-11 rounded-lg px-6 text-sm font-medium'
                render={<Link to='/pricing' />}
              >
                {t('Explore Models & Pricing')}
              </Button>
            </div>
          </SpotlightCard>
        </AnimateInView>
      </div>
    </section>
  )
}
