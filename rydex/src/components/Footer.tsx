'use client'
import React from 'react'
import { motion } from "motion/react"
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
function Footer() {
  return (
    <div className='w-full bg-nav text-nav-foreground border-t border-border-strong/30'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
          <div>
            <h2 className='text-2xl font-bold tracking-[0.18em]'>RYDEX</h2>
            <p className='mt-4 text-nav-foreground/55 text-sm leading-relaxed tracking-wide'>Book any vehicle — from bikes to trucks. Trusted owners. Transparent pricing.</p>

            <div className='flex gap-4 mt-6'>
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3 }}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-nav-foreground/20 text-nav-foreground/80 hover:bg-nav-foreground hover:text-nav hover:border-nav-foreground transition-all duration-300"
                >
                  <Icon size={18}/>
                </motion.a>
              ))}
            </div>
          </div>


        </div>
        <div className='border-t border-nav-foreground/10 mt-12'>
        <div className='max-w-7xl mx-auto px-0 py-6 flex flex-col sm:flex-row justify-between items-center text-xs text-nav-foreground/45 tracking-wide gap-4'>
<p>© {new Date().getFullYear()} RYDEX. All rights reserved.</p>
        </div>
   
        </div>
      </motion.div>
      
    </div>
  )
}

export default Footer
