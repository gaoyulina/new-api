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
import { useTranslation } from 'react-i18next'

import { getLobeIcon } from '@/lib/lobe-icon'

interface BrandItem {
  name: string
  icon: string
}

const BRANDS: BrandItem[] = [
  { name: 'OpenAI', icon: 'OpenAI.Color' },
  { name: 'Anthropic', icon: 'Claude.Color' },
  { name: 'Google Gemini', icon: 'Gemini.Color' },
  { name: 'DeepSeek', icon: 'DeepSeek.Color' },
  { name: 'Meta Llama', icon: 'Meta.Color' },
  { name: 'Mistral AI', icon: 'Mistral.Color' },
  { name: 'Moonshot Kimi', icon: 'Moonshot.Color' },
  { name: 'Alibaba Qwen', icon: 'Qwen.Color' },
  { name: 'Zhipu GLM', icon: 'Zhipu.Color' },
  { name: 'MiniMax', icon: 'Minimax.Color' },
  { name: 'Perplexity', icon: 'Perplexity.Color' },
  { name: 'Groq', icon: 'Groq.Color' },
  { name: 'Cohere', icon: 'Cohere.Color' },
  { name: 'Ollama', icon: 'Ollama.Color' },
  { name: 'Midjourney', icon: 'Midjourney.Color' },
  { name: 'Stability AI', icon: 'Stability.Color' },
]

export function BrandMarquee() {
  const { t } = useTranslation()

  return (
    <aside
      aria-label={t('40+ Native Upstream Engines & Inference Clusters')}
      className='fixed inset-x-0 bottom-0 z-30 flex h-11 items-center border-t border-border/70 bg-background/85 px-3 shadow-lg shadow-black/5 backdrop-blur-md select-none'
    >
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Anchored Left Category Badge */}
      <div className='hidden sm:flex shrink-0 items-center gap-2 border-r border-border/60 pr-3.5 mr-2 font-mono text-[11px] font-semibold text-foreground/90'>
        <span className='relative flex size-2'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
          <span className='relative inline-flex size-2 rounded-full bg-emerald-500' />
        </span>
        <span className='whitespace-nowrap'>{t('40+ Native Upstream Engines')}</span>
      </div>

      {/* Seamless Marquee Track */}
      <div className='relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_94%,transparent)]'>
        <div className='marquee-track flex items-center gap-2.5 py-0.5'>
          {/* First Loop */}
          {BRANDS.map((brand) => (
            <div
              key={`b1-${brand.name}`}
              className='group/pill flex items-center gap-1.5 rounded-full border border-border/50 bg-card/85 px-2.5 py-1 text-xs shadow-2xs transition-all duration-200 hover:border-primary/40 hover:bg-card'
            >
              <div className='flex size-4 shrink-0 items-center justify-center'>
                {getLobeIcon(brand.icon, 16)}
              </div>
              <span className='font-medium text-[11px] text-foreground/90 whitespace-nowrap'>
                {brand.name}
              </span>
            </div>
          ))}

          {/* Second Loop for seamless wrapping */}
          {BRANDS.map((brand) => (
            <div
              key={`b2-${brand.name}`}
              aria-hidden='true'
              className='group/pill flex items-center gap-1.5 rounded-full border border-border/50 bg-card/85 px-2.5 py-1 text-xs shadow-2xs transition-all duration-200 hover:border-primary/40 hover:bg-card'
            >
              <div className='flex size-4 shrink-0 items-center justify-center'>
                {getLobeIcon(brand.icon, 16)}
              </div>
              <span className='font-medium text-[11px] text-foreground/90 whitespace-nowrap'>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
