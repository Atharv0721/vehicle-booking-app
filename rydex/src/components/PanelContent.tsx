'use client'
import { Bike, Car, Clock, IndianRupee, MessageCircle, Phone, Truck, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { button } from 'motion/react-client'
import RideChat from './RideChat'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Vehicle from '@/models/vehicle.model'

const getVehicleIcon = (vehicleType?: string) => {
    switch (vehicleType?.toLowerCase()) {
        case 'bike':
            return <Bike size={18} className=" text-accent-foreground" />;
        case 'auto':
            return <Car size={18} className=" text-accent-foreground" />; // You can add Auto icon if available
        case 'truck':
            return <Truck size={18} className=" text-accent-foreground" />;
        case 'loading':
        case 'car':
        default:
            return <Car size={18} className=" text-accent-foreground" />;
    }
};

function PanelContent({ isActive, displayDistance, displayEta, cfg, status, booking, paymentStatus, canChat, chatOpen, onChatToggle, currentRole }: any) {

    console.log(booking)


    return (
        <div className='flex flex-col pt-5 pb-4 gap-3'>
            {isActive && (
                <div className='mx-5 lg:mx-6 grid grid-cols-2 gap-2'>
                    <div className='bg-muted border border-border rounded-2xl p-4 flex items-center gap-3'>
                        <div className='w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center flex-shrink-0'>
                            <Clock size={16} className="text-muted-foreground" />
                        </div>
                        <div>
                            <p className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold'>ETA</p>
                            <p className='text-lg font-black text-foreground leading-none mt-0.5'>{Math.round(displayEta)} <span className='text-xs font-normal text-muted-foreground ml-0.5'>min</span></p>
                        </div>
                    </div>

                    <div className='bg-accent rounded-2xl p-4 flex items-center gap-3'>
                        <div className='w-9 h-9 rounded-xl bg-accent-foreground/10 flex items-center justify-center flex-shrink-0'>
                            <IndianRupee size={16} className="text-accent-foreground" />
                        </div>
                        <div >
                            <p className='text-[10px] text-accent-foreground/50 uppercase tracking-wider font-semibold'>Fare</p>
                            <p className='text-lg font-black text-accent-foreground leading-none mt-0.5'>{booking.fare || "-"}</p>
                        </div>
                    </div>

                </div>
            )}

            {booking?.user && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mx-5 lg:mx-6"
                >
                    <div className='bg-accent rounded-2xl p-4 flex items-center gap-4'>
                        <div className='relative flex-shrink-0'>
                            <div className='w-14 h-14 rounded-xl bg-accent-foreground/10 flex items-center justify-center'>
                                <User size={26} className="text-accent-foreground/70" />
                            </div>
                            <div className='absolute -bottom-1 -right-1 bg-emerald-400 w-4 h-4 rounded-full border-2 border-accent' />
                        </div>
                        <div className='flex-1 min-w-0'>
                            <div className='flex items-center justify-between gap-2'>
                                <p className='text-accent-foreground font-bold text-base truncate'>{booking?.user?.name || "customer"}</p>
                                <div className='flex items-center gap-1 bg-accent-foreground/10 px-2 py-1 rounded-full flex-shrink-0'>
                                    <IndianRupee size={10} className="text-amber-400" />
                                    <span className='text-accent-foreground text-xs font-semibold'>{booking.fare}</span>

                                </div>
                            </div>

                            {booking.paymentStatus && (
                                <div className='flex items-center gap-2 mt-1.5'>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${paymentStatus.cls ?? "bg-muted text-muted-foreground"}`}>{paymentStatus.label}</span>
                                </div>
                            )}

                        </div>
                    </div>

                    {isActive && (
                        <div className='flex gap-2 mt-2'>
                            {booking.userMobileNumber && (
                                <a
                                    href={`tel:${booking.userMobileNumber}`}
                                    className={`flex items-center justify-center gap-2 bg-muted hover:bg-border active:scale-[0.97] transition-all text-foreground py-3 rounded-xl text-sm font-semibold ${canChat ? "flex-1" : "w-full"}`}
                                >
                                    <Phone size={15} /> Call
                                </a>
                            )}
                            {canChat && (
                                <button
                                    onClick={onChatToggle}
                                    className={`flex-1 flex items-center justify-center gap-2 active:scale-[0.97] transition-all py-3 rounded-xl text-sm font-semibold ${chatOpen ? "bg-muted text-foreground" : "bg-accent hover:opacity-90 text-accent-foreground"}`}>
                                    <MessageCircle size={15} />
                                    {chatOpen ? "Close Chat" : "Message"}

                                </button>
                            )}
                        </div>
                    )}
                </motion.div>
            )}

            <AnimatePresence>
                {chatOpen && canChat && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-5 lg:mx-6 overflow-hidden"
                    >
                        <div className='rounded-2xl overflow-hidden border border-border h-[460px]'>
                            <RideChat currentRole={currentRole} bookingId={booking._id} userName={booking?.user?.name || "customer"} driverName={booking.driver.name || "driver"} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {booking?.vehicle && (
                <div className='mx-5 lg:mx-6'>
                    <div className='bg-muted border border-border rounded-2xl p-4 flex items-center gap-3'>
                        <div className='w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0'>
                            {getVehicleIcon(booking.vehicle.type)}
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-[10px] text-muted-foreground uppercase tracking-wider font-semibold'>Your Vehicle</p>
                            <p className='text-sm font-bold text-foreground truncate'>{booking.vehicle.vehicleModel ?? "vehicle"}</p>
                        </div>
                        <div className='flex-shrink-0 bg-accent px-3 py-1.5 rounded-lg'>
                            <p className='text-accent-foreground text-xs font-black tracking-widest font-mono'>{booking.vehicle.number ?? "number"}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className='mx-5 lg:mx-6'>
                <div className='bg-muted border border-border rounded-2xl overflow-hidden'>
                    <div className='flex gap-3 p-4 border-b border-border'>
                        <div className='flex flex-col items-center flex-shrink-0 pt-1'>
                            <div className='w-3 h-3 rounded-full bg-accent border-2 border-card shadow-[var(--shadow-soft)]' />
                            <div className='w-px bg-border mt-1' style={{ height: 20 }} />
                        </div>
                        <div className='flex-1 min-w-0'>
                           <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5'>PickUp</p>
                           <p className='text-sm text-card-foreground leading-snug'>{booking?.pickUpAddress}</p>
                        </div>
                    </div>
                     <div className='flex gap-3 p-4 border-b border-border'>
                        <div className='flex flex-col items-center flex-shrink-0 pt-1'>
                            <div className='w-3 h-3 rounded-full bg-accent border-2 border-card shadow-[var(--shadow-soft)]' />
                        </div>
                        <div className='flex-1 min-w-0'>
                           <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5'>Drop</p>
                           <p className='text-sm text-card-foreground leading-snug'>{booking?.dropAddress}</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PanelContent
