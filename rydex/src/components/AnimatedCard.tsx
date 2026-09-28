'use client'
import React from 'react'
import {motion} from "motion/react"
function AnimatedCard({title,icon,children}:any) {
  return (
    <motion.div 
     whileHover={{ y: -4 }}
      className="bg-card text-card-foreground rounded-3xl p-8 shadow-[var(--shadow-elevated)] border border-border space-y-6 transition-shadow"
    >
        <div className='flex items-center gap-2 font-semibold tracking-tight text-foreground'>
            {icon}
            {title}
        </div>
        {children}
      
    </motion.div>
  )
}

export default AnimatedCard
