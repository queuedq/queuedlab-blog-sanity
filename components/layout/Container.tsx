import { type ClassValue } from 'clsx'
import React from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps {
  className?: ClassValue[]
  children: React.ReactNode
}

export default function Container({ className, children }: ContainerProps) {
  return (
    // The outer div prevents layout shift caused by a scrollbar.
    // Reference: https://dev.to/rashidshamloo/preventing-the-layout-shift-caused-by-scrollbars-2flp
    // (But I ended up with a different solution)
    <div className={cn('relative ml-[calc((100vw-100%))]', className)}>
      <div className="container mx-auto max-w-3xl px-5">{children}</div>
    </div>
  )
}
