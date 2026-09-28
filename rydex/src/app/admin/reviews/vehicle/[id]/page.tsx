'use client'
import { IUser } from '@/models/user.model'
import { vehicleType } from '@/models/vehicle.model'
import axios from 'axios'
import { ArrowLeft, CheckCircle, CircleDashed, Clock, ImageIcon, IndianRupee, ShieldCheck, Truck, XCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { img } from 'motion/react-client'
import AnimatedCard from '@/components/AnimatedCard'
import ThemeToggle from '@/components/ThemeToggle'
interface IVehicle {
    owner: IUser
    type: vehicleType,
    vehicleModel: string,
    number: string,
    imageUrl?: string,
    baseFare?: number,
    pricePerKM?: number,
    waitingCharge?: number,
    status: "approved" | "pending" | "rejected",
    rejectionReason?: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date

}
function page() {
    const { id } = useParams()
    const [data, setData] = useState<IVehicle>()
    const router = useRouter()
    const [showApprove, setShowApprove] = useState(false)
    const [showReject, setShowReject] = useState(false)
    const [rejectionReason, setRejectionReason] = useState("")
    const [approveLoading, setApproveLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)
    const [loading,setLoading]=useState()
    useEffect(() => {
        const load = async () => {
            try {
                const result = await axios.get(`/api/admin/reviews/vehicle/${id}`)
                setData(result.data)
            } catch (error: any) {
                console.log(error.response.data.message ?? error)
            }
        }
        load()
    }, [id])

    
    if (loading) {
        return (
            <div className="min-h-screen grid place-items-center text-muted-foreground bg-background">
                Loading Partner...
            </div>
        )
    }

    const handleApprove=async ()=>{
        setApproveLoading(true)
try {
    const {data}=await axios.get(`/api/admin/reviews/vehicle/${id}/approve`)
    console.log(data)
    setApproveLoading(false)
    router.push("/")
} catch (error) {
    console.log(error)
     setApproveLoading(false)
}
    }
     const handleReject=async ()=>{
      setRejectLoading(true)
try {
    const {data}=await axios.post(`/api/admin/reviews/vehicle/${id}/reject`,{
       reason:rejectionReason
    })
    console.log(data)
    setRejectLoading(false)
     router.push("/")
} catch (error) {
    console.log(error)
    setRejectLoading(false)
}
    }

    return (
        <div className='min-h-screen bg-background text-foreground'>
            <div className='sticky top-0 z-40 backdrop-blur-xl bg-card/70 border-b border-border'>
                <div className='max-w-7xl mx-auto px-4 h-16 flex items-center gap-4'>
                    <button className='w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground' onClick={() => router.back()}>
                        <ArrowLeft size={18} />
                    </button>
                    <div className='flex-1'>
                        <div className='font-semibold text-lg tracking-tight text-foreground'>{data?.owner.name}</div>
                        <div className='text-xs text-muted-foreground'>{data?.owner.email}</div>
                    </div>
                    {
                        data?.status === "approved" ? (
                            <div className='px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'>
                                <CheckCircle size={14} />
                                Approved
                            </div>
                        ) : data?.status === "rejected" ? (
                            <div className='px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'>
                                <XCircle size={14} />
                                Rejected
                            </div>
                        ) : (
                            <div className='px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400'>
                                <Clock size={14} />
                                Pending
                            </div>
                        )
                    }
                    <ThemeToggle variant="onLight" />
                </div>
            </div>

            <main className='max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)] bg-card border border-border"
                >
                    {data?.imageUrl ? (
                        <img src={data.imageUrl} alt="vehicle" className='w-full h-[450px] object-cover' />
                    ) : (
                        <div className='h-[450px] grid place-items-center text-muted-foreground'>
                            <ImageIcon size={25} />
                        </div>
                    )

                    }
                </motion.div>
                <div className='space-y-8'>
                    <AnimatedCard title={"Vehicle Details"} icon={<Truck size={18} />}>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Vehicle Type</span>
                            <span className='font-semibold text-foreground'>{data?.type || "-"}</span>
                        </div>

                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Registration Number</span>
                            <span className='font-semibold text-foreground'>{data?.number || "-"}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Model</span>
                            <span className='font-semibold text-foreground'>{data?.vehicleModel || "-"}</span>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard title={"Pricing Configuration"} icon={<IndianRupee size={18} />}>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Base Fare</span>
                            <span className='font-semibold flex items-center text-foreground'><IndianRupee size={13} />{data?.baseFare || 0}</span>
                        </div>

                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Price Per KM</span>
                            <span className=' font-semibold flex items-center text-foreground'><IndianRupee size={13} />{data?.pricePerKM || 0}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Waiting Charge</span>
                            <span className='font-semibold flex items-center text-foreground'><IndianRupee size={13} />{data?.waitingCharge || "-"}</span>
                        </div>
                    </AnimatedCard>

                    {data?.status == "pending" && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card rounded-[32px] p-8 shadow-[var(--shadow-elevated)] border border-border space-y-6"
                        >
                            <div className='flex items-center gap-2 font-semibold tracking-tight text-foreground'>
                                <ShieldCheck size={18} />
                                Admin Check
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                Verify documents carefully before approving.
                            </p>

                            <div className='flex flex-col gap-4'>

                                <button
                                    className='py-3 rounded-2xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity'
                                    onClick={() => setShowApprove(true)}
                                >Approve
                                </button>

                                <button
                                    className='py-3 rounded-2xl border border-border font-semibold hover:bg-muted transition-colors text-foreground'
                                    onClick={() => setShowReject(true)}
                                >Reject
                                </button>
                            </div>

                        </motion.div>
                    )}
                </div>
            </main>

            <AnimatePresence>
                {showApprove && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-[var(--overlay)] backdrop-blur-sm flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-card text-card-foreground rounded-3xl p-6 w-full max-w-sm border border-border shadow-[var(--shadow-elevated)]"
                        >
                            <h2 className='text-lg font-bold tracking-tight text-foreground'>Approve Vehicle?</h2>
                            <p className='text-sm text-muted-foreground mt-2'>Confirm all information has been verified.</p>
                            <div className='flex gap-3 mt-6'>
                                <button className='flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted transition-colors' onClick={() => setShowApprove(false)}>Cancel</button>
                                <button className='flex-1 flex items-center justify-center py-2 rounded-xl bg-accent text-accent-foreground'
                                    onClick={handleApprove}
                                    disabled={approveLoading}
                                >{approveLoading ? <CircleDashed className='text-accent-foreground animate-spin' /> : "Yes, Approve"}</button>
                            </div>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showReject && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-[var(--overlay)] backdrop-blur-sm flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-card text-card-foreground rounded-3xl p-6 w-full max-w-sm border border-border shadow-[var(--shadow-elevated)]"
                        >
                            <h2 className='text-lg font-bold tracking-tight text-foreground'>Reject Vehicle?</h2>
                            <p className='text-sm text-muted-foreground mt-2'>

                                <textarea
                                    placeholder="Enter rejection reason (required)"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="w-full mt-3 border border-border rounded-xl p-3 text-sm bg-background text-foreground placeholder:text-muted-foreground"
                                />
                            </p>
                            <div className='flex gap-3 mt-6'>
                                <button className='flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted transition-colors' onClick={() => setShowReject(false)}>Cancel</button>
                                <button className='flex-1 py-2 flex items-center justify-center rounded-xl bg-accent text-accent-foreground' onClick={handleReject} disabled={rejectLoading}>{rejectLoading ? <CircleDashed className='text-accent-foreground animate-spin' /> : "Reject"}</button>
                            </div>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default page
