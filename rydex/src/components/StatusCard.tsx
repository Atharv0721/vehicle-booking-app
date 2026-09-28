'use client'
import React from 'react'
import { motion } from "motion/react"
function StatusCard({ icon, title, desc }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
        bg-card 
        text-card-foreground
        rounded-2xl md:rounded-3xl 
        p-5 sm:p-6 md:p-8 
        shadow-[var(--shadow-soft)] 
        border border-border
        flex 
        flex-col sm:flex-row 
        gap-4 sm:gap-5
        items-start sm:items-center
        transition-shadow
      "
        >
            <div className='bg-accent text-accent-foreground p-3 md:p-4 rounded-xl shrink-0'>
                {icon}
            </div>
            <div className='flex-1'>
                <h2 className='text-base sm:text-lg md:text-xl font-semibold tracking-tight text-foreground'>{title}</h2>
                <p className='text-muted-foreground text-sm sm:text-base mt-1'>{desc}</p>
            </div>

        </motion.div>
    )
}

export default StatusCard
