'use client'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { ArrowLeft, CircleDashed, FileCheck, UploadCloud } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ThemeToggle from '@/components/ThemeToggle'

type docsType="aadhar"|"license"|"rc"
function page() {
  const router = useRouter()
  const [docs,setDocs]=useState<Record<docsType,File | null>>({
    aadhar:null,
    license:null,
    rc:null
  })

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")

  const handleDocs=async ()=>{
    setLoading(true)
    setError("")
    try {
      const formdata=new FormData()
      if(!docs.aadhar || !docs.license || !docs.rc){
       
          setError("all documents are required")
          setLoading(false)
           return null
      }
      formdata.append("aadhar",docs.aadhar)
       formdata.append("license",docs.license)
        formdata.append("rc",docs.rc)

      const {data}=await axios.post("/api/partner/onboarding/documents",formdata)
      setLoading(false)
      router.push("/partner/onboarding/bank")
    } catch (error:any) {
      setError(error?.response?.data?.message ?? "something went wrong")
      console.log(error)
      setLoading(false)
    }
  }

  const handleImage=(doc:docsType,file:File | null)=>{
if(!file){
  return
}
setDocs((prev)=>({...prev,[doc]:file}))
  }

  const isCompleted=docs.aadhar && docs.license && docs.rc
  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='fixed top-4 right-4 z-50'>
        <ThemeToggle variant="onLight" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-card text-card-foreground rounded-3xl border border-border shadow-[var(--shadow-elevated)] p-6 sm:p-8"
      >
        <div className='relative text-center'>
          <button className='absolute left-0 top-0 w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground'
            onClick={() => router.back()}
          ><ArrowLeft size={18} /></button>

          <p className='text-xs text-muted-foreground font-medium tracking-wide'>
            step 2 of 3
          </p>

          <h1 className='text-2xl font-bold mt-1 tracking-tight text-foreground'>
            Upload Documents
          </h1>
          <p className='text-sm text-muted-foreground mt-2'>
            Required for verification
          </p>

        </div>

        <div className='mt-8 space-y-5'>
          <motion.label
          whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 rounded-2xl border border-border cursor-pointer hover:border-border-strong transition-colors"
          >
            <div>
<p className='text-sm font-semibold text-foreground'>Aadhaar / ID Proof</p>
<p className='text-xs text-muted-foreground'>Government issued ID</p>
            </div>
           
    {docs.aadhar ? 
    <span className='text-xs text-green-600 font-medium'>Uploaded</span>
    :
    <div>
      <span className='text-xs text-muted-foreground'>Upload</span>
      <div className='w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center'><UploadCloud size={18}/></div>
            </div>}          


            <input type='file' hidden accept='image/*,.pdf' onChange={(e)=>handleImage("aadhar",e.target?.files?.[0] || null)}/>

          </motion.label>

           <motion.label
          whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 rounded-2xl border border-border cursor-pointer hover:border-border-strong transition-colors"
          >
            <div>
<p className='text-sm font-semibold text-foreground'>Driving License</p>
<p className='text-xs text-muted-foreground'>Valid driving license</p>
            </div>
            {docs.license ? 
    <span className='text-xs text-green-600 font-medium'>Uploaded</span>
    :
    <div>
      <span className='text-xs text-muted-foreground'>Upload</span>
      <div className='w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center'><UploadCloud size={18}/></div>
            </div>}     
 <input type='file' hidden accept='image/*,.pdf' onChange={(e)=>handleImage("license",e.target?.files?.[0] || null)}/>
          </motion.label>
           <motion.label
          whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-4 rounded-2xl border border-border cursor-pointer hover:border-border-strong transition-colors"
          >
            <div>
<p className='text-sm font-semibold text-foreground'>Vehicle RC</p>
<p className='text-xs text-muted-foreground'>Registration Certificate</p>
            </div>
            {docs.rc ? 
    <span className='text-xs text-green-600 font-medium'>Uploaded</span>
    :
    <div>
      <span className='text-xs text-muted-foreground'>Upload</span>
      <div className='w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center'><UploadCloud size={18}/></div>
            </div>}     
 <input type='file' hidden accept='image/*,.pdf' onChange={(e)=>handleImage("rc",e.target?.files?.[0] || null)}/>
          </motion.label>

          

        </div>

        <div className='mt-6 flex items-start gap-3 text-xs text-muted-foreground'>
          <FileCheck size={16} className="mt-0.5"/>
          <p> Documents are securely stored and manually verified
            by our team.</p>
        </div>
          {error && <p className='text-red-500 mt-4'>*{error}</p>}

         <motion.button
         whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDocs}
          disabled={!isCompleted || loading}
          className="mt-8 w-full h-14 rounded-2xl bg-accent text-accent-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
         >
         {loading?<CircleDashed className='text-accent-foreground animate-spin'/>: "Continue"}
     
         </motion.button>




      </motion.div>
    </div>
  )
}

export default page
