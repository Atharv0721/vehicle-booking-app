import CheckOutContent from '@/components/CheckOutContent'
import React, { Suspense } from 'react'

function page() {
  return (
   <Suspense fallback={<div className="min-h-screen bg-background text-muted-foreground flex items-center justify-center text-sm tracking-wide">Loading...</div>}>
     <CheckOutContent/>
   </Suspense>
    
  )
}

export default page
