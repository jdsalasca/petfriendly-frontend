import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const baseClasses = 'w-full rounded-2xl border border-slate-700/60 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return <textarea ref={ref} className={cn(baseClasses, 'min-h-[120px]', className)} {...props} />
})

Textarea.displayName = 'Textarea'
