'use client'
import { vehicleType } from '@/models/vehicle.model'
import React from 'react'
import { motion } from "motion/react"
import { ArrowRight, Bike, Car, Clock, Gauge, IndianRupee, Star, Truck } from 'lucide-react';

const TYPE_CONFIG = {
    bike: { label: "Bike", Icon: Bike },
    auto: { label: "Auto", Icon: Car },
    car: { label: "Car", Icon: Car },
    loading: { label: "Loading", Icon: Truck },
    truck: { label: "Truck", Icon: Truck },
};
 interface IVehicle{
    owner:string
    type:vehicleType,
    vehicleModel:string,
    number:string,
    imageUrl?:string,
    baseFare?:number,
    pricePerKM?:number,
    waitingCharge?:number,
    status:"approved" | "pending" | "rejected",
    rejectionReason?:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date

}
function VehicleCard({ vehicle, distance,onBook }: { vehicle: IVehicle, distance: number | undefined,onBook:()=>void }) {
    const { Icon, label } = TYPE_CONFIG[vehicle.type]
    let estimated:number=0
    if(vehicle.baseFare && vehicle.pricePerKM && distance){
estimated=Math.round(vehicle.baseFare +vehicle.pricePerKM*distance)
    }
   
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-card border border-border rounded-3xl overflow-hidden flex flex-col group cursor-default transition-shadow"
            style={{ boxShadow: "var(--shadow-soft)" }}
        >
            <div className='relative h-48 bg-muted flex items-center justify-center overflow-hidden'>
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <motion.img
                    src={vehicle.imageUrl}
                    alt={vehicle.vehicleModel}
                    className="relative z-10 h-32 w-full object-contain"
                    style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.14))" }}
                    whileHover={{ scale: 1.06, filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.22))" }}
                    transition={{ duration: 0.35 }}
                />
                <div className='absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full'>
                    <Icon size={10} />
                    {label}
                </div>
                <div className='absolute bottom-3 left-3 z-20 flex items-center gap-1 bg-card border border-border text-card-foreground text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-[var(--shadow-soft)]'>
                    <Star size={9} className="fill-foreground text-foreground" />
                    4.8
                </div>
            </div>

            <div className='h-px bg-border' />

            <div className='flex flex-col flex-1 p-5 gap-4'>
                <div className='flex items-start justify-between gap-3'>
                    <div className='min-w-0'>
                        <h3 className='text-foreground text-base font-black tracking-tight leading-tight truncate'>{vehicle.vehicleModel}</h3>
                        <div className='mt-1.5 inline-flex items-center bg-muted px-2.5 py-1 rounded-lg border border-border'>
                            <span className='text-muted-foreground text-xs font-black tracking-[0.2em] font-mono uppercase'>{vehicle.number}</span>
                        </div>
                    </div>
                    <div className='flex-shrink-0 w-10 h-10 rounded-2xl bg-muted border border-border flex items-center justify-center'>
                        <Icon size={17} className='text-foreground' />
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <div className='bg-muted border border-border rounded-2xl px-3.5 py-3'>
                     <div className='flex items-center gap-1.5 mb-1'>
                       <Gauge size={11} className="text-muted-foreground"/>
                       <p className='text-muted-foreground text-[9px] uppercase tracking-widest font-bold'>Per KM</p>
                     </div>
                     <p className='text-foreground text-sm flex items-center font-black'>
                     <IndianRupee size={11}/>{vehicle.pricePerKM}
                     </p>
                  </div>

                   <div className='bg-muted border border-border rounded-2xl px-3.5 py-3'>
                    <div className='flex items-center gap-1.5 mb-1'>
                      <Clock size={11} className="text-muted-foreground" />
                      <p className='text-muted-foreground text-[9px] uppercase tracking-widest font-bold'>Waiting</p>
                    </div>
                    <div className='text-foreground text-sm font-black flex items-center'>
                        <IndianRupee size={11}/>{vehicle.waitingCharge}
                        <span>/min</span>
                    </div>
                   </div>

                </div>
              
              <div className='flex items-end justify-between pt-3 border-t border-border'>
               <div>
                <p className='text-muted-foreground text-[9px] uppercase tracking-widest font-bold mb-0.5'>Est. Fare</p>
                <motion.div
                 key={estimated}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-0.5"
                >
                    <IndianRupee size={16} className="text-foreground mb-0.5" strokeWidth={2.5}/>
                    <span className='text-foreground text-3xl font-black tracking-tight leading-none'>{estimated}</span>

                </motion.div>
               </div>
                  <motion.button
               whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.04 }}
            onClick={onBook}
            className=" flex items-center gap-2 bg-accent hover:opacity-90 text-accent-foreground text-sm font-black px-6 py-3.5 rounded-2xl transition-all shadow-[var(--shadow-soft)]"
              >
                Book
                <motion.div
                 initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
                >
                    <ArrowRight size={14}/>
                </motion.div>
              </motion.button>
              </div>
           
            </div>

        </motion.div>
    )
}

export default VehicleCard
