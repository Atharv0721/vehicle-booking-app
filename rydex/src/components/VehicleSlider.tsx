import { Bike, Bus, Car, CarTaxiFront, ChevronLeft, ChevronRight, Sparkles, Truck } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { motion } from "motion/react"

const VEHICLE_CATEGORIES = [
  { title: "All Vehicles", desc: "Browse the full fleet", Icon: CarTaxiFront, tag: "Popular" },
  { title: "Bikes", desc: "Fast & affordable rides", Icon: Bike, tag: "Quick" },
  { title: "Cars", desc: "Comfortable city travel", Icon: Car, tag: "Comfort" },
  { title: "SUVs", desc: "Premium & spacious", Icon: Car, tag: "Premium" },
  { title: "Vans", desc: "Family & group transport", Icon: Bus, tag: "Family" },
  { title: "Trucks", desc: "Heavy & commercial transport", Icon: Truck, tag: "Cargo" },
];

function VehicleSlider() {
  const [hovered, setHovered] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: dir == "left" ? -300 : 300, behavior: "smooth" })
  }
  return (
    <div className='w-full bg-background text-foreground py-20 px-4 overflow-hidden'>
      <div className='max-w-7xl mx-auto'>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <div className='h-px w-8 bg-foreground' />
              <span className='text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground'>Fleet</span>
            </div>
            <h2 className='text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-none'>Vehicles <br />

              <span className='relative inline-block'>Categories
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground origin-left"
                />


              </span>


            </h2>

            <p className='text-muted-foreground text-sm mt-3 font-medium tracking-wide'>Choose the ride that fits your journey</p>
          </div>

          <div className='hidden sm:flex items-center gap-2'>
            <motion.div
              whileTap={{ scale: 0.88 }}
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-2xl border border-border bg-card text-foreground flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground disabled:opacity-25 disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border transition-all duration-300 shadow-[var(--shadow-soft)]"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.88 }}
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-2xl border border-border bg-card text-foreground flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground disabled:opacity-25 disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border transition-all duration-300 shadow-[var(--shadow-soft)]"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        <div className='relative'>
          <div
            ref={sliderRef}
            className="flex gap-5 pt-20 overflow-x-auto scroll-smooth pb-4 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {
              VEHICLE_CATEGORIES.map((c, i) => {
                const isHovered = hovered == i
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={{ y: -8 }}
                    className="group relative min-w-[220px] sm:min-w-[260px] flex-shrink-0 cursor-pointer"
                  >

                    <motion.div
                      animate={{
                        backgroundColor: isHovered ? "var(--accent)" : "var(--card)",
                        borderColor: isHovered ? "var(--accent)" : "var(--border)",
                        boxShadow: isHovered
                          ? "var(--shadow-elevated)"
                          : "var(--shadow-soft)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="relative rounded-3xl border p-6 sm:p-7 overflow-hidden h-full"
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isHovered
                            ? "color-mix(in srgb, var(--accent-foreground) 12%, transparent)"
                            : "var(--muted)",
                          color: isHovered ? "var(--accent-foreground)" : "var(--muted-foreground)",
                          borderColor: isHovered
                            ? "color-mix(in srgb, var(--accent-foreground) 15%, transparent)"
                            : "var(--border)",
                        }}
                        className="inline-flex items-center gap-1.5 border text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full mb-5 transition-colors"
                      >

                        <Sparkles size={8} />
                        {c.tag}
                      </motion.div>

                      <motion.div
                        animate={{
                          backgroundColor: isHovered
                            ? "color-mix(in srgb, var(--accent-foreground) 10%, transparent)"
                            : "var(--muted)",
                          borderColor: isHovered
                            ? "color-mix(in srgb, var(--accent-foreground) 15%, transparent)"
                            : "var(--border)",
                        }}
                        className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 transition-colors"
                      >
                        <motion.div
                          animate={{ color: isHovered ? "var(--accent-foreground)" : "var(--foreground)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <c.Icon size={24} strokeWidth={1.4} />
                        </motion.div>


                      </motion.div>

                      <motion.h3
                        animate={{ color: isHovered ? "var(--accent-foreground)" : "var(--foreground)" }}
                        transition={{ duration: 0.2 }}
                        className="text-lg font-black tracking-tight leading-none mb-2"
                      >
                        {c.title}
                      </motion.h3>

                      <motion.p
                        animate={{
                          color: isHovered
                            ? "color-mix(in srgb, var(--accent-foreground) 55%, transparent)"
                            : "var(--muted-foreground)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-medium leading-relaxed"
                      >
                        {c.desc}
                      </motion.p>

                    </motion.div>

                  </motion.div>
                )
              })
            }

          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-6 mt-8 pt-6 border-t border-border"
        >
          {
            [
              { num: "6+", label: "Categories" },
              { num: "10+", label: "Vehicle types" },
              { num: "24/7", label: "Availability" },
            ].map((d,i)=>(
<div key={i} className="flex items-center gap-3">
  <p className='text-foreground text-lg font-black tracking-tight'>{d.num}</p>
  <p className='text-muted-foreground text-xs font-medium tracking-wide'>{d.label}</p>
</div>

            ))
          }

        </motion.div>


      </div>
    </div>
  )
}

export default VehicleSlider
