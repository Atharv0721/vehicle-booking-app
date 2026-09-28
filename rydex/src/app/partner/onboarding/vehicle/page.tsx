'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { ArrowLeft, Bike, Car, CircleDashed, Package, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ThemeToggle from '@/components/ThemeToggle'
const VEHICLES = [
    { id: "bike", label: "Bike", icon: Bike, desc: "2 wheeler" },
    { id: "auto", label: "Auto", icon: Car, desc: "3 wheeler ride" },
    { id: "car", label: "Car", icon: Car, desc: "4 wheeler ride" },
    { id: "loading", label: "Loading", icon: Package, desc: "Small goods" },
    { id: "truck", label: "Truck", icon: Truck, desc: "Heavy transport" },
];
function page() {
    const router = useRouter()
    const [vehicleType, setVehicleType] = useState("")
    const [vehicleNumber, setVehicleNumber] = useState("")
      const [vehicleModel, setVehicleModel] = useState("")
      const [loading,setLoading]=useState(false)
     const [error,setError]=useState("")
      const handleVehicle=async ()=>{
        setError("")
        try {
            setLoading(true)
            const {data}=await axios.post("/api/partner/onboarding/vehicle",{
                type:vehicleType, number:vehicleNumber, vehicleModel
            })
            setLoading(false)
            
           router.push("/partner/onboarding/documents")
        } catch (error:any) {
            setError(error?.response?.data?.message ?? "something went wrong")
            setLoading(false)
        }
      }

      useEffect(()=>{
        const handleGetVehicle=async ()=>{
        try {
            const {data}=await axios.get("/api/partner/onboarding/vehicle")
            setVehicleType(data.type)
            setVehicleNumber(data.number)
            setVehicleModel(data.vehicleModel)
           
        } catch (error:any) {
        console.log(error)
        }
      }
      handleGetVehicle()
      },[])
    return (
        <div className='min-h-screen bg-background flex items-center justify-center px-4'>
            <div className='fixed top-4 right-4 z-50'>
                <ThemeToggle variant="onLight" />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-xl bg-card text-card-foreground rounded-3xl border border-border shadow-[var(--shadow-elevated)] p-6 sm:p-8"
            >
                <div className='relative text-center'>
                    <button className='absolute left-0 top-0 w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground'
                        onClick={() => router.back()}
                    ><ArrowLeft size={18} /></button>

                    <p className='text-xs text-muted-foreground font-medium tracking-wide'>
                        step 1 of 3
                    </p>

                    <h1 className='text-2xl font-bold mt-1 tracking-tight text-foreground'>
                        Vehicle Details
                    </h1>
                    <p className='text-sm text-muted-foreground mt-2'>
                        Add your vehicle information
                    </p>

                </div>

                <div className='mt-8 space-y-6'>
                    <div>
                        <p className='text-xs font-semibold text-muted-foreground mb-3 tracking-wide'>Vehicle Type</p>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                            {VEHICLES.map((v, i) => {
                                const Icon = v.icon
                                const active = vehicleType == v.id
                                return (
                                    <motion.div
                                        key={v.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => setVehicleType(v.id)}
                                        className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition-all
                      ${active
                                                ? "bg-accent text-accent-foreground border-accent"
                                                : "border-border hover:border-border-strong text-foreground"
                                            }`}
                                    >

                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center
                        ${active
                                                ? "bg-card text-card-foreground"
                                                : "bg-accent text-accent-foreground"
                                            }`}>
                                            <Icon />
                                        </div>
                                        <div className='text-sm font-semibold'>
                                            {v.label}
                                        </div>
                                        <p className={`text-xs ${active
                                                ? "text-accent-foreground/70"
                                                : "text-muted-foreground"
                                            }`}>
                                            {v.desc}
                                        </p>

                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="vn" className='text-xs font-semibold text-muted-foreground'>Vehicle Number</label>
                        <input 
                        type="text"
                        onChange={(e)=>setVehicleNumber(e.target.value.toUpperCase())}
                        value={vehicleNumber}
                         placeholder='MH12AB1234' 
                         id='vn' 
                         className='mt-2 w-full border-b border-border pb-2 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent text-foreground placeholder:text-muted-foreground'/>
                    </div>
                    <div>
                        <label htmlFor="vm" className='text-xs font-semibold text-muted-foreground'>Vehicle Model</label>
                        <input 
                        type="text"
                        onChange={(e)=>setVehicleModel(e.target.value)}
                        value={vehicleModel}
                         placeholder='Tata Ace' 
                         id='vm' 
                         className='mt-2 w-full border-b border-border pb-2 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent text-foreground placeholder:text-muted-foreground'/>
                    </div>
                </div>
                {error && <p className='text-red-500 mt-4'>*{error}</p>}

                <motion.button
                 whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="mt-8 w-full h-14 rounded-2xl bg-accent text-accent-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
          onClick={handleVehicle}
                >{loading?<CircleDashed className='text-accent-foreground animate-spin'/>: "Continue"}</motion.button>

            </motion.div>
        </div>
    )
}

export default page
