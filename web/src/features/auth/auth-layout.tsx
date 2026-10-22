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
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import authBgLightWebp from '@/assets/images/auth-bg-light.webp'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeSwitch } from '@/components/theme-switch'
import { Skeleton } from '@/components/ui/skeleton'
import { useSystemConfig } from '@/hooks/use-system-config'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='relative grid min-h-svh w-full grid-cols-1 overflow-x-hidden bg-background text-foreground lg:grid-cols-12'>
      {/* Left Column: Enterprise Brand & 3D Art Showcase (Desktop only) */}
      <div className='relative hidden flex-col justify-between overflow-hidden border-r border-slate-200/80 bg-slate-50/50 p-10 lg:col-span-6 lg:flex xl:col-span-7 xl:p-14 dark:border-border/60 dark:bg-muted/10'>
        {/* Background 3D High-Tech Canvas Layer */}
        <div className='pointer-events-none absolute inset-0 select-none overflow-hidden'>
          <picture>
            <source srcSet={authBgLightWebp} type='image/webp' />
            <img
              src='/images/auth-bg-light.jpg'
              alt=''
              aria-hidden='true'
              className='h-full w-full object-cover object-center opacity-90 transition-opacity dark:opacity-40'
              loading='eager'
              decoding='async'
            />
          </picture>
          {/* Soft atmospheric gradient wash so the 3D pipelines pop while text has 100% legibility */}
          <div className='absolute inset-0 bg-gradient-to-t from-slate-100/95 via-slate-100/40 to-slate-100/70 dark:from-background dark:via-background/40 dark:to-background/70' />
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,transparent_30%,rgba(241,245,249,0.6)_100%)] dark:bg-transparent' />
        </div>

        {/* Top Brand Info */}
        <div className='relative z-10'>
          <Link
            to='/'
            className='group inline-flex items-center gap-3 transition-opacity hover:opacity-90'
          >
            <div className='relative size-10 shrink-0'>
              {loading ? (
                <Skeleton className='absolute inset-0 rounded-xl' />
              ) : (
                <img
                  src={logo}
                  alt={t('Logo')}
                  className='size-10 rounded-xl object-cover shadow-sm ring-1 ring-slate-200/80 dark:ring-border'
                />
              )}
            </div>
            <div>
              <h1 className='text-xl font-bold tracking-tight text-slate-900 dark:text-foreground'>
                {systemName}
              </h1>
              <div className='flex items-center gap-1.5 font-mono text-[11px] text-slate-600 dark:text-muted-foreground'>
                <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
                <span>{t('Production-Grade AI Gateway Infrastructure')}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center Brand Value Proposition */}
        <div className='relative z-10 my-auto max-w-lg space-y-6 py-8'>
          <div className='space-y-3'>
            <span className='inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary backdrop-blur-xs'>
              <Sparkles className='size-3 text-primary' />
              <span>Enterprise AI Mesh</span>
            </span>
            <h2 className='text-3xl font-extrabold tracking-tight text-slate-900 leading-[1.2] xl:text-4xl dark:text-foreground'>
              {t('One API Key,')}
              <br />
              <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-primary dark:via-primary/90 dark:to-primary/60'>
                {t('Connecting Every Leading AI Model')}
              </span>
            </h2>
            <p className='text-slate-600 text-sm leading-relaxed dark:text-muted-foreground'>
              {t(
                'Connect 40+ leading AI providers through a single unified endpoint. Enjoy zero-downtime automated failover, millisecond edge routing, and transparent billing without managing multiple overseas accounts.'
              )}
            </p>
          </div>

          {/* Feature Pills */}
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div className='flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/85 p-3.5 shadow-xs backdrop-blur-md transition-all hover:border-primary/40 hover:bg-white hover:shadow-sm dark:border-border/60 dark:bg-card/70'>
              <div className='flex size-9 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-2xs dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400'>
                <Zap className='size-4' />
              </div>
              <div className='min-w-0'>
                <div className='truncate text-xs font-semibold text-slate-900 dark:text-foreground'>
                  {t('Zero Downtime Failover')}
                </div>
                <div className='truncate font-mono text-[10px] text-slate-500 dark:text-muted-foreground'>
                  0ms Failover
                </div>
              </div>
            </div>

            <div className='flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/85 p-3.5 shadow-xs backdrop-blur-md transition-all hover:border-primary/40 hover:bg-white hover:shadow-sm dark:border-border/60 dark:bg-card/70'>
              <div className='flex size-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-2xs dark:border-primary/20 dark:bg-primary/10 dark:text-primary'>
                <ShieldCheck className='size-4' />
              </div>
              <div className='min-w-0'>
                <div className='truncate text-xs font-semibold text-slate-900 dark:text-foreground'>
                  {t('40+ Native Upstream Engines')}
                </div>
                <div className='truncate font-mono text-[10px] text-slate-500 dark:text-muted-foreground'>
                  Claude · DeepSeek · GPT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Reliability Bar */}
        <div className='relative z-10 flex items-center gap-2 border-t border-slate-200/70 pt-4 font-mono text-xs text-slate-500 dark:border-border/40 dark:text-muted-foreground'>
          <CheckCircle2 className='size-4 text-emerald-600 dark:text-emerald-500' />
          <span>99.99% SLA High Availability Guaranteed</span>
        </div>
      </div>

      {/* Right Column: Clean, Focused Auth Panel */}
      <div className='relative flex min-h-svh flex-col justify-between bg-white p-6 sm:p-10 lg:col-span-6 lg:p-12 xl:col-span-5 xl:p-16 dark:bg-background'>
        {/* Top Navigation Bar */}
        <div className='flex items-center justify-between'>
          {/* Mobile-only brand logo */}
          <Link to='/' className='flex items-center gap-2.5 lg:hidden'>
            <div className='relative size-8 shrink-0'>
              {loading ? (
                <Skeleton className='absolute inset-0 rounded-lg' />
              ) : (
                <img
                  src={logo}
                  alt={t('Logo')}
                  className='size-8 rounded-lg object-cover'
                />
              )}
            </div>
            <span className='text-base font-bold text-foreground'>
              {systemName}
            </span>
          </Link>

          {/* Desktop spacer */}
          <div className='hidden lg:block' />

          {/* Controls: Language, Theme, Back to Home */}
          <div className='flex items-center gap-1.5'>
            <LanguageSwitcher />
            <ThemeSwitch />
            <div className='mx-1 h-4 w-px bg-border/60' />
            <Link
              to='/'
              className='group inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-2xs backdrop-blur-xs transition-all hover:border-primary/40 hover:bg-background hover:text-foreground'
            >
              <ArrowLeft className='size-3.5 transition-transform group-hover:-translate-x-0.5' />
              <span>{t('Back to Home')}</span>
            </Link>
          </div>
        </div>

        {/* Central Auth Children Form */}
        <div className='my-auto flex w-full flex-col justify-center py-8'>
          <div className='mx-auto w-full max-w-[420px]'>
            {children}
          </div>
        </div>

        {/* Bottom Footnote */}
        <div className='flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground'>
          <span className='font-mono text-[11px]'>
            {systemName} © {new Date().getFullYear()}
          </span>
          <span className='flex items-center gap-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400'>
            <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
            Systems Operational
          </span>
        </div>
      </div>
    </div>
  )
}
