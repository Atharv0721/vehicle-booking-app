'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { ArrowLeft, BadgeCheck, CheckCircle, CircleDashed, CreditCard, Landmark, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { p } from 'motion/react-client'
import ThemeToggle from '@/components/ThemeToggle'
const IFSC_REGEX=/^[A-Z]{4}0[A-Z0-9]{6}$/
function page() {
    const router = useRouter()
    const [accountHolder,setAccountHolder]=useState("")
    const [accountNumber,setAccountNumber]=useState("")
    const [ifsc,setIfsc]=useState("")
    const [upi,setupi]=useState("")
    const [mobileNumber,setMobileNumber]=useState("")
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")

const sanitizedIfsc=ifsc.trim().toUpperCase()

const isNameValid=accountHolder.trim().length>=3
const isAccountValid=accountNumber.trim().length>=9
const isIfscValid=IFSC_REGEX.test(sanitizedIfsc)
const isMobileValid=mobileNumber.trim().length==10

const canSubmit=isNameValid && isAccountValid && isIfscValid && isMobileValid
  
    const handleBank=async ()=>{
        setLoading(true)
        setError("")
        try {
            const {data}=await axios.post("/api/partner/onboarding/bank",{
                accountHolder,accountNumber,ifsc:sanitizedIfsc,upi,mobileNumber
            })
            console.log(data)
            setLoading(false)
           window.location.href="/"
        } catch (error:any) {
            setError(error?.response?.data?.message || "something went wrong")
            console.log(error)
            setLoading(false)
        }
    }

useEffect(()=>{
     const handleGetBank=async ()=>{
        try {
            const {data}=await axios.get("/api/partner/onboarding/bank")
            console.log(data)
           setAccountHolder(data.partnerBank.accountHolder)
           setAccountNumber(data.partnerBank.accountNumber)
           setIfsc(data.partnerBank.ifsc)
           setMobileNumber(data.mobileNumber)
           setupi(data.partnerBank.upi)
           
        } catch (error:any) {
            console.log(error)
        }
    }
    handleGetBank()

},[])

    return (
        <div className='min-h-screen bg-background flex items-center justify-center px-4'>
            <div className='fixed top-4 right-4 z-50'>
                <ThemeToggle variant="onLight" />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-card text-card-foreground rounded-3xl border border-border shadow-[var(--shadow-elevated)] p-6 sm:p-8"
            >
                <div className='relative text-center'>
                    <button className='absolute left-0 top-0 w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground'
                        onClick={() => router.back()}
                    ><ArrowLeft size={18} /></button>

                    <p className='text-xs text-muted-foreground font-medium tracking-wide'>
                        step 3 of 3
                    </p>

                    <h1 className='text-2xl font-bold mt-1 tracking-tight text-foreground'>
                        Bank & Payout Setup
                    </h1>
                    <p className='text-sm text-muted-foreground mt-2'>
                        Used for partner payouts
                    </p>

                </div>

                <div className='mt-8 space-y-6'>
                    <div >
                        <label htmlFor="ahn" className='text-xs font-semibold text-muted-foreground'>Account holder name</label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='text-muted-foreground'><BadgeCheck /></div>
                            <input 
                            type="text" 
                            id='ahn' 
                            placeholder='As per bank records' 
                            className={`flex-1 border-b pb-2 text-sm focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground transition-colors
                                ${!isNameValid && accountHolder.length>0?"border-red-400 focus:border-red-500":"border-border focus:border-foreground"}`} 
                            value={accountHolder} 
                            onChange={(e)=>setAccountHolder(e.target.value)}/>
                        </div>
                        {!isNameValid && accountHolder.length>0 && <p className='mt-1 text-xs text-red-500'>Minimum 3 characters required</p>}
                    </div>


                    <div >
                        <label htmlFor="ahn" className='text-xs font-semibold text-muted-foreground'>Bank account number</label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='text-muted-foreground'><CreditCard /></div>
                            <input type="text" id='ahn' placeholder='Enter account number'  className={`flex-1 border-b pb-2 text-sm focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground transition-colors
                                ${!isAccountValid && accountNumber.length>0?"border-red-400 focus:border-red-500":"border-border focus:border-foreground"}`}  value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)}/>
                        </div>
                         {!isAccountValid && accountNumber.length>0 && <p className='mt-1 text-xs text-red-500'>Account number must be at least 9 digits</p>}
                    </div>

                    <div >
                        <label htmlFor="ahn" className='text-xs font-semibold text-muted-foreground'>IFSC code</label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='text-muted-foreground'><Landmark /></div>
                            <input type="text" id='ahn' placeholder='HDFC0001234'  className={`flex-1 border-b pb-2 text-sm focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground transition-colors
                                ${!isIfscValid && ifsc.length>0?"border-red-400 focus:border-red-500":"border-border focus:border-foreground"}`}  value={ifsc.toUpperCase()} onChange={(e)=>setIfsc(e.target.value)}/>
                        </div>
                         {!isIfscValid && ifsc.length>0 && <p className='mt-1 text-xs text-red-500'>Invalid IFSC code</p>}
                    </div>

                    <div >
                        <label htmlFor="ahn" className='text-xs font-semibold text-muted-foreground'>Mobile number</label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='text-muted-foreground'><Phone /></div>
                            <input type="text" id='ahn' placeholder='10 digit mobile number'  className={`flex-1 border-b pb-2 text-sm focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground transition-colors
                                ${!isMobileValid && mobileNumber.length>0?"border-red-400 focus:border-red-500":"border-border focus:border-foreground"}`}  value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}/>
                        </div>
                         {!isMobileValid && mobileNumber.length>0 && <p className='mt-1 text-xs text-red-500'>Enter a valid 10-digit mobile number</p>}
                    </div>

                    <div >
                        <label htmlFor="ahn" className='text-xs font-semibold text-muted-foreground'>UPI ID (optional)</label>
                        <div className='flex items-center gap-2 mt-2'>
                            <input type="text" id='ahn' placeholder='name@upi' className='flex-1 border-b pb-2 text-sm focus:outline-none border-border focus:border-foreground bg-transparent text-foreground placeholder:text-muted-foreground transition-colors' value={upi} onChange={(e)=>setupi(e.target.value)}/>
                        </div>
                    </div>
                </div>

 {error && <p className='text-red-500 mt-4'>*{error}</p>}
                <div className='mt-6 flex items-start gap-3 text-xs text-muted-foreground'>
                    <CheckCircle size={16} className="mt-0.5" />
                    <p> Bank details are verified before first payout.
                        This usually takes 24–48 hours.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBank}
                    disabled={!canSubmit || loading}
                    className="mt-8 w-full h-14 rounded-2xl bg-accent text-accent-foreground font-semibold disabled:opacity-40 transition-opacity flex items-center justify-center"
                >
 {loading?<CircleDashed className='text-accent-foreground animate-spin'/>: "Continue"}
                </motion.button>


            </motion.div>
        </div>
    )
}

export default page
