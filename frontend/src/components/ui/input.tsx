import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const baseClasses = 'w-full rounded-2xl border border-slate-700/60 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn(baseClasses, className)} {...props} />
})

Input.displayName = 'Input'
