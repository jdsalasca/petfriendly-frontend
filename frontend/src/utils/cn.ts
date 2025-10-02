import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: Array<string | false | null | undefined>) => {
  return twMerge(clsx(inputs))
}
