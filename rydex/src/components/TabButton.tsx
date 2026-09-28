'use client'
import React from 'react'
import { motion } from "motion/react"
function TabButton({ active, count, onClick, icon, children }: any) {
    return (
        <motion.div
            onClick={onClick}
            whileTap={{ scale: 0.97 }}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 select-none cursor-pointer
        ${active
                    ? "bg-accent text-accent-foreground shadow-[var(--shadow-soft)]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
        >
            <span className={`flex items-center ${active ? "text-accent-foreground" : "text-muted-foreground"}`}>{icon}</span>
            <span className='hidden sm:inline'>{children}</span>
            <span className={`min-w-[22px] h-5 px-1.5 text-[11px] font-bold rounded-full flex items-center justify-center transition-all
        ${active
          ? "bg-card text-card-foreground"
          : count > 0
          ? "bg-red-500 text-white"
          : "bg-muted text-muted-foreground"
        }`}>{count}</span>
        </motion.div>
    )
}

export default TabButton
