import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 shadow-lg shadow-emerald-500/5', className)}
      {...props}
    />
  )
}
