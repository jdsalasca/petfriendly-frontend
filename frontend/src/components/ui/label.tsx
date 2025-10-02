import { forwardRef } from 'react'
import type { LabelHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const baseClasses = 'text-sm font-medium text-slate-300'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <label ref={ref} className={cn(baseClasses, className)} {...props} />
})

Label.displayName = 'Label'
