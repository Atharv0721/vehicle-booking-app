'use client'
import axios from 'axios'
import { Send, Sparkles, X } from 'lucide-react'
import { div } from 'motion/react-client'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getSocket } from '@/lib/socket'
type message = {
    bookingId: string,
    sender: "user" | "driver",
    text: string,
    createdAt: Date
}
function RideChat({ currentRole, bookingId, userName, driverName }: any) {

    const otherName = currentRole == "user" ? driverName : userName
    const myName = currentRole == "user" ? userName : driverName
    const [messages, setMessages] = useState<message[]>([])
    const [lastMessage, setLastMessage] = useState("")
    const [text, setText] = useState("")
    const { userData } = useSelector((state: RootState) => state.user)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showAI, setShowAI] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const messagesEndRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])
    const sendMsg = async () => {
        const socket=getSocket()
        try {
            const { data } = await axios.post("/api/chat/send", {
                sender: currentRole,
                text,
                bookingId
            })
            console.log(data)
            socket.emit("chat-message",data)
          
        } catch (error) {
            console.log(error)
        }
    }
    const getAllMsgs = async () => {
        try {
            const { data } = await axios.post("/api/chat/get-all", {
                bookingId
            })
            console.log(data)
            setMessages(data)
            setLastMessage(data[0])
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const formatTime = (dateInput: Date | string) => {
        const date = new Date(dateInput)
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    useEffect(() => {
        getAllMsgs()
    }, [])

    useEffect(()=>{
       const socket=getSocket()
       socket.on("chat-message",(data)=>{
        setMessages(prev=>[...prev,data])
       })

       return ()=>{socket.off("chat-message")}
    },[])
    const getAISuggestions = async () => {
        setAiLoading(true)
        setShowAI(true)
        try {
            const { data } = await axios.post("/api/chat/ai-suggestions", {
                role: currentRole, lastMessage
            })
          
            const jsonData=JSON.parse(data)
         setSuggestions(jsonData.suggestions)
            setAiLoading(false)
        } catch (error) {
            console.log(error)
            setAiLoading(false)
        }
    }
    return (
        <div className='flex flex-col h-full min-h-0 bg-card rounded-2xl overflow-hidden border border-border'>

            <div className='flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-card border-b border-border'>
                <div className='relative flex-shrink-0'>
                    <div className='w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold'>
                        {otherName.charAt(0).toUpperCase()}
                    </div>
                    <span className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-card' />
                </div>

                <div className='flex-1 min-w-0'>
                    <p className='text-sm font-bold text-foreground leading-none'>{otherName}</p>
                    <p className='text-[11px] text-emerald-500 font-semibold mt-0.5'>Active Now</p>
                </div>
            </div>

            <div
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-muted"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                {messages.length === 0 && (
                    <div className='flex flex-col items-center justify-center h-full gap-3 py-16'>
                        <div className='w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center'>
                            <Send size={18} className="text-muted-foreground" />
                        </div>
                        <p className='text-sm text-muted-foreground font-medium'>No messages yet</p>
                        <p className='text-xs text-muted-foreground/70'>Start the conversation below</p>
                    </div>
                )}


                {messages.length > 0 && (
                    messages.map((m, i) => {
                        const isMine = m.sender === currentRole
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[72%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl shadow-[var(--shadow-soft)] ${isMine
                                    ? "bg-accent text-accent-foreground rounded-br-sm"
                                    : "bg-card border border-border text-foreground rounded-bl-sm"
                                    }`}>
                                    <p className='break-words'>{m.text}</p>
                                    <span className={`text-[8px] ${isMine ? "text-accent-foreground/50" : "text-muted-foreground"}`}>{formatTime(m.createdAt)}</span>

                                </div>

                            </motion.div>
                        )
                    })
                )}
            <div ref={messagesEndRef}/>
            </div>


            <AnimatePresence>
                {showAI && messages.length>0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex-shrink-0 overflow-hidden border-t border-border bg-card"
                    >
                        <div className='px-4 pt-3 pb-2'>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-1.5'>
                                    <Sparkles size={12} className="text-foreground" />
                                    <span className='text-[11px] font-semibold text-muted-foreground uppercase tracking-wider'>AI Suggestions</span>
                                </div>
                                <button onClick={() => setShowAI(false)}>
                                    <X size={14} className="text-muted-foreground hover:text-foreground transition-colors" />
                                </button>
                            </div>


                            {aiLoading ? (
                                <div className='flex flex-col gap-1.5'>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-9 bg-muted rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : (
                                <div className='flex flex-col gap-1.5'>
                                    {suggestions.map((s, i) => (
                                        <motion.div
                                            key={i}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { setText(s); setShowAI(false); }}
                                            className="text-left text-sm text-card-foreground bg-muted hover:bg-border
                                 border border-border hover:border-border-strong
                                 px-3 py-2 rounded-xl transition-all"
                                        >
                                            {s}
                                        </motion.div>
                                    ))}

                                    <button 
                                    onClick={getAISuggestions}
                                    className='text-[11px] text-muted-foreground hover:text-foreground font-semibold
                               text-center mt-1 transition-colors'>
                               Refresh Suggestions
                                    </button>
                                </div>
                            )}


                        </div>

                    </motion.div>

                )}
            </AnimatePresence>


            <div className='flex-shrink-0 px-4 pb-4 pt-2 bg-card'>
                <div className='flex items-center gap-2 bg-muted rounded-2xl pl-3 pr-1.5 py-1.5'>
                   {messages.length>0 && (
                    <motion.button
                     whileTap={{ scale: 0.9 }}
            onClick={()=>getAISuggestions()}
            className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              showAI
                ? "bg-accent text-accent-foreground"
                : "bg-card text-muted-foreground hover:bg-border border border-border"
            }`}
                    >
                        <Sparkles size={14}/>

                    </motion.button>
                   )}

                   <input 
                   type="text" 
                   value={text}
                   placeholder='Message...'
                   onChange={(e)=>setText(e.target.value)}
                   className='flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-1.5 min-w-0'/>

                   <motion.button
                    whileTap={{ scale: 0.88 }}
            onClick={() => sendMsg()}
            disabled={!text.trim()}
            className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              text.trim()
                ? "bg-accent text-accent-foreground hover:opacity-90"
                : "bg-transparent text-muted-foreground cursor-not-allowed"
            }`}
                   >
<Send size={14}/>
                   </motion.button>
                </div>
            </div>


        </div>
    )
}

export default RideChat
