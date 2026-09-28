'use client'
import AnimatedCard from '@/components/AnimatedCard'
import DocPreview from '@/components/DocPreview'
import { IPartnerBank } from '@/models/partnerBank.model'
import { IPartnerDocs } from '@/models/partnerDocs.model'
import { IUser } from '@/models/user.model'
import { IVehicle } from '@/models/vehicle.model'
import axios from 'axios'
import { url } from 'inspector'
import { ArrowLeft, Car, CheckCircle, CircleDashed, Clock, FileText, Landmark, ShieldCheck, XCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import ThemeToggle from '@/components/ThemeToggle'
function page() {
    const { id } = useParams()
    const [data, setData] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [vehicleDetails, setVehicleDetails] = useState<IVehicle | null>(null)
    const [partnerDocs, setPartnerDocs] = useState<IPartnerDocs | null>(null)
    const [partnerBank, setPartnerBank] = useState<IPartnerBank | null>(null)
    const [showApprove, setShowApprove] = useState(false)
    const [showReject, setShowReject] = useState(false)
    const [rejectionReason,setRejectionReason]=useState("")
    const [approveLoading,setApproveLoading]=useState(false)
      const [rejectLoading,setRejectLoading]=useState(false)
    const router = useRouter()
    const handleGetPartner = async () => {
        try {
            const { data } = await axios.get(`/api/admin/reviews/partner/${id}`)
            setData(data.partner)
            setVehicleDetails(data.vehicle)
            setPartnerDocs(data.documents)
            setPartnerBank(data.bank)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetPartner()
    }, [])


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
    const {data}=await axios.get(`/api/admin/reviews/partner/${id}/approve`)
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
    const {data}=await axios.post(`/api/admin/reviews/partner/${id}/reject`,{
        rejectionReason
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
                        <div className='font-semibold text-lg tracking-tight text-foreground'>{data?.name}</div>
                        <div className='text-xs text-muted-foreground'>{data?.email}</div>
                    </div>
                    {
                        data?.partnerStatus === "approved" ? (
                            <div className='px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'>
                                <CheckCircle size={14} />
                                Approved
                            </div>
                        ) : data?.partnerStatus === "rejected" ? (
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

            <main className='max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10'>
                <div className='lg:col-span-2 space-y-8'>
                    <AnimatedCard title="Vehicle Details" icon={<Car size={18} />}>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Vehicle Type</span>
                            <span className='font-semibold text-foreground'>{vehicleDetails?.type || "-"}</span>
                        </div>

                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Registration Number</span>
                            <span className='font-semibold text-foreground'>{vehicleDetails?.number || "-"}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Model</span>
                            <span className='font-semibold text-foreground'>{vehicleDetails?.vehicleModel || "-"}</span>
                        </div>
                    </AnimatedCard>

                    <AnimatedCard title="Documents" icon={<FileText size={18} />}>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                            <DocPreview label={"Aadhaar"} url={partnerDocs?.aadharUrl} />
                            <DocPreview label={"Registration Certificate"} url={partnerDocs?.rcUrl} />
                            <DocPreview label={"Driving License"} url={partnerDocs?.licenseUrl} />
                        </div>
                    </AnimatedCard>
                </div>

                <div className='space-y-8'>
                    <AnimatedCard title={"Bank Details"} icon={<Landmark size={18} />}>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Account Holder</span>
                            <span className='font-semibold text-foreground'>{partnerBank?.accountHolder || "-"}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Account Number</span>
                            <span className='font-semibold text-foreground'>{partnerBank?.accountNumber || "-"}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>IFSC Code</span>
                            <span className='font-semibold text-foreground'>{partnerBank?.ifsc || "-"}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Upi</span>
                            <span className='font-semibold text-foreground'>{partnerBank?.upi || "-"}</span>
                        </div>

                    </AnimatedCard>

                    {data?.partnerStatus == "pending" && (
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
                                    onClick={()=>setShowApprove(true)}
                                >Approve
                                </button>

                                <button
                                    className='py-3 rounded-2xl border border-border font-semibold hover:bg-muted transition-colors text-foreground'
                                    onClick={()=>setShowReject(true)}
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
                            <h2 className='text-lg font-bold tracking-tight text-foreground'>Approve Partner?</h2>
                            <p className='text-sm text-muted-foreground mt-2'>Confirm all information has been verified.</p>
                            <div className='flex gap-3 mt-6'>
                                <button className='flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted transition-colors' onClick={() => setShowApprove(false)}>Cancel</button>
                                <button className='flex-1 flex items-center justify-center py-2 rounded-xl bg-accent text-accent-foreground'
                                onClick={handleApprove}
                                disabled={approveLoading}
                                >{approveLoading?<CircleDashed className='text-accent-foreground animate-spin'/>:"Yes, Approve"}</button>
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
                            <h2 className='text-lg font-bold tracking-tight text-foreground'>Reject Partner?</h2>
                            <p className='text-sm text-muted-foreground mt-2'>

                                <textarea
                                    placeholder="Enter rejection reason (required)"
                                    value={rejectionReason}
                                    onChange={(e)=>setRejectionReason(e.target.value)}
                                    className="w-full mt-3 border border-border rounded-xl p-3 text-sm bg-background text-foreground placeholder:text-muted-foreground"
                                />
                            </p>
                            <div className='flex gap-3 mt-6'>
                                <button className='flex-1 py-2 rounded-xl border border-border text-foreground hover:bg-muted transition-colors' onClick={() => setShowReject(false)}>Cancel</button>
                                <button className='flex-1 py-2 flex items-center justify-center rounded-xl bg-accent text-accent-foreground' onClick={handleReject} disabled={rejectLoading}>{rejectLoading?<CircleDashed className='text-accent-foreground animate-spin'/>:"Reject"}</button>
                            </div>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>



        </div>
    )
}

export default page
