'use client'
import React from 'react'
import {motion} from "motion/react"

const KPI_CONFIG: Record<string, {
  iconBg: string; iconColor: string; cardHover: string;
}> = {
  totalPartners: {
    iconBg: "bg-purple-50 dark:bg-purple-950/40", 
    iconColor: "text-purple-700 dark:text-purple-400",
    cardHover: "hover:shadow-[var(--shadow-soft)]",
  },
  approved: {
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
     iconColor: "text-emerald-800 dark:text-emerald-400",
     cardHover: "hover:shadow-[var(--shadow-soft)]",
  },
  pending: {
    iconBg: "bg-amber-50 dark:bg-amber-950/40", 
    iconColor: "text-amber-800 dark:text-amber-400",
    cardHover: "hover:shadow-[var(--shadow-soft)]",
  },
  rejected: {
    iconBg: "bg-red-50 dark:bg-red-950/40", 
    iconColor: "text-red-800 dark:text-red-400",
    cardHover: "hover:shadow-[var(--shadow-soft)]",
  },
};


function Kpi({label,value,icon,variant}:any) {

    const cfg=KPI_CONFIG[variant]
    console.log(cfg)
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-card rounded-2xl p-5 border border-border shadow-[var(--shadow-soft)]
        cursor-default relative overflow-hidden group ${cfg.cardHover} transition-shadow`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        rounded-2xl ${cfg.iconBg}`} style={{ zIndex: 0 }}/>
      <div className='relative z-10'>
        <motion.div
        whileHover={{ rotate: -6, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${cfg.iconBg} ${cfg.iconColor}`}
        
        >
{icon}
        </motion.div>

        <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1 mt-3'>{label}</p>

        <motion.div
          className="text-3xl font-extrabold text-foreground leading-tight tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {value}
        </motion.div>
        
        </div> 
      
    </motion.div>
  )
}

export default Kpi
