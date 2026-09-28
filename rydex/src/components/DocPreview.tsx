import { a } from 'motion/react-client'
import React from 'react'

function DocPreview({label,url}:any) {
    const isImage=url?.match(/\.(jpg|jpeg|png|webp)$/i)
    const isPdf=url?.endsWith(".pdf")
  return (
    <div className='bg-muted rounded-2xl border border-border overflow-hidden shadow-[var(--shadow-soft)]'>
      <div className='px-4 py-2 border-b border-border text-sm font-semibold text-foreground tracking-tight'>
        {label}
      </div>
      <div className='h-52 flex items-center justify-center bg-card'>
{!url && <span className='text-xs text-muted-foreground'>Image Not Uploaded</span>}

{isImage && <img src={url} className='w-full h-full object-cover'/>}

{isPdf && <iframe src={url} className='w-full h-full'/>}

      </div>
      {url && (
    <a
    href={url}
    target="_blank"
    className="block text-center text-xs py-2 font-medium text-foreground hover:bg-muted transition-colors"
    >Open Full Document</a>
)}
      
    </div>
  )
}

export default DocPreview
