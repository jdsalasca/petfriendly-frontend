import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('animate-pulse rounded-2xl bg-slate-800/80', className)} {...props} />
}
