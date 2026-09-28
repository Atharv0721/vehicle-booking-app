'use client '
import { AlertTriangle } from 'lucide-react'
import React from 'react'

function RejectionCard({title,reason,actionLabel,onAction}:any) {
  return (
    <div className='bg-red-50 dark:bg-red-950/30
        border border-red-200 dark:border-red-900/50
        rounded-2xl md:rounded-3xl 
        p-5 sm:p-6 md:p-8 
        space-y-4'>
      <div className='flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm sm:text-base'>
        <AlertTriangle size={18}/>
        {title}
      </div>
      <div className='bg-card border border-border rounded-xl p-4 text-sm sm:text-base text-foreground'>
        {reason}
      </div>
      {onAction && (
        <button
        onClick={onAction}
        className=' w-full sm:w-auto
            px-6 
            py-2.5 
            bg-accent 
            text-accent-foreground 
            rounded-xl 
            text-sm sm:text-base
            font-medium
            hover:opacity-90 
            transition-all duration-200'
        >
{actionLabel || "retry"}
        </button>
      )}
    </div>
  )
}

export default RejectionCard
