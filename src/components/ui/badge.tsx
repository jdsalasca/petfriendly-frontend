import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'emerald' | 'slate'
  children: ReactNode
}

export const Badge = ({ className, tone = 'emerald', children, ...props }: BadgeProps) => {
  const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-200 border border-emerald-400/40',
    slate: 'bg-slate-800/80 text-slate-200 border border-slate-700/60'
  }

  return (
    <span
      className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]', tones[tone], className)}
      {...props}
    >
      {children}
    </span>
  )
}
