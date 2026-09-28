'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { CircleDashed, CircleDivide, Lock, Mail, User, X } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'

import { signIn, useSession } from 'next-auth/react'
type propType = {
    open: boolean,
    onClose: () => void
}
type stepType = "login" | "signup" | "otp"
function AuthModal({ open, onClose }: propType) {
    const [step, setStep] = useState<stepType>("login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const [otp, setOtp] = useState(["", "", "", "", "", ""])

    const session = useSession()
    console.log(session)
    const handleSignUp = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/auth/register", {
                name, email, password
            })
            setErr("")
            setStep("otp")
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            setErr(error.response.data.message ?? "something went wrong")
        }
    }
    const handleVerifyEmail = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/auth/verify-email", {
                email, otp: otp.join("")
            })
            console.log(data)
            setOtp(["", "", "", "", "", ""])
            setErr("")
            setStep("login")
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            setErr(error.response.data.message ?? "something went wrong")
        }
    }

    const handleLogin = async () => {
        setErr("");
        setLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        console.log(res);

        if (res?.error) {
            setErr(res.error);
            return;
        }

        if (res?.ok) {
            setErr("");
            onClose();
            window.location.reload();
        }
    };

    const handleGoogleLogin = async () => {
        await signIn("google", {
            callbackUrl: "/"
        })
    }

    const handleChangeOtp = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return
        const updated = [...otp]
        updated[index] = value
        setOtp(updated)

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`)?.focus()
        }
        if (!value && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus()
        }
    }


    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-90 bg-[var(--overlay)] backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            exit={{ opacity: 0, scale: 0.95, y: 40 }}
                            className="fixed inset-0 z-100 flex items-center justify-center px-4"
                        >
                            <div className='relative w-full max-w-md rounded-3xl bg-card text-card-foreground border border-border shadow-[var(--shadow-elevated)] p-6 sm:p-8'>
                                <div className='absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer' onClick={onClose}>
                                    <X size={20} />
                                </div>
                                <div className='mb-6 text-center'>
                                    <h1 className='text-3xl font-extrabold tracking-[0.2em] text-foreground'>RYDEX</h1>
                                    <p className='mt-1 text-xs text-muted-foreground tracking-wide'>Premium Vehicle Booking</p>
                                </div>

                                <button className='w-full h-11 rounded-xl
                  border border-border-strong
                  flex items-center justify-center gap-3
                  text-sm font-semibold text-foreground
                  hover:bg-accent hover:text-accent-foreground hover:border-accent
                  transition-all duration-300' onClick={handleGoogleLogin}>
                                    <Image src="/google.png" alt='Google' width={20} height={20} />
                                    Continue with Google
                                </button>

                                <div className='flex items-center gap-4 my-6'>
                                    <div className='flex-1 h-px bg-border' />
                                    <div className='text-xs text-muted-foreground tracking-widest'>OR</div>
                                    <div className='flex-1 h-px bg-border' />
                                </div>
                                <div>
                                    {step == "login" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}

                                        >
                                            <h1 className='text-xl font-semibold tracking-tight text-foreground' >Welcome back</h1>
                                            <div className='mt-5 space-y-4'>
                                                <div className='flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-muted/40 transition-colors duration-200 focus-within:border-border-strong'>
                                                    <Mail size={18} className='text-muted-foreground' />
                                                    <input type="email" placeholder='Email' className='w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground' onChange={(e) => setEmail(e.target.value)} value={email} />
                                                </div>
                                                <div className='flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-muted/40 transition-colors duration-200 focus-within:border-border-strong'>
                                                    <Lock size={18} className='text-muted-foreground' />
                                                    <input type="password" placeholder='Password' className='w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground' onChange={(e) => setPassword(e.target.value)} value={password} />
                                                </div>
                                                {err && (
                                                    <p className="text-red-500 text-sm">
                                                        *{err}
                                                    </p>
                                                )}

                                                <button className='w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-all duration-300 flex justify-center items-center shadow-[var(--shadow-soft)]' onClick={handleLogin}>{!loading ? "Login" : <CircleDashed size={18} className='animate-spin text-accent-foreground' />}</button>

                                            </div>
                                            <p className="mt-6 text-center text-sm text-muted-foreground">
                                                Don’t have an account?{" "}
                                                <span
                                                    onClick={() => {
                                                        setErr("");
                                                        setStep("signup");
                                                    }}
                                                    className="text-foreground font-medium hover:underline cursor-pointer"
                                                >
                                                    Sign Up
                                                </span>
                                            </p>

                                        </motion.div>
                                    )}
                                    {step == "signup" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}

                                        >
                                            <h1 className='text-xl font-semibold tracking-tight text-foreground' >Create Account</h1>
                                            <div className='mt-5 space-y-4'>
                                                <div className='flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-muted/40 transition-colors duration-200 focus-within:border-border-strong'>
                                                    <User size={18} className='text-muted-foreground' />
                                                    <input type="text" placeholder='Full Name' className='w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground' onChange={(e) => setName(e.target.value)} value={name} />
                                                </div>
                                                <div className='flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-muted/40 transition-colors duration-200 focus-within:border-border-strong'>
                                                    <Mail size={18} className='text-muted-foreground' />
                                                    <input type="email" placeholder='Email' className='w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground' onChange={(e) => setEmail(e.target.value)} value={email} />
                                                </div>
                                                <div className='flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-muted/40 transition-colors duration-200 focus-within:border-border-strong'>
                                                    <Lock size={18} className='text-muted-foreground' />
                                                    <input type="password" placeholder='Password' className='w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground' onChange={(e) => setPassword(e.target.value)} value={password} />
                                                </div>

                                                {err && <p className='text-red-500 '>*{err}</p>}

                                                <button className='w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-all duration-300 flex justify-center items-center shadow-[var(--shadow-soft)]' disabled={loading} onClick={handleSignUp}>{!loading ? "Send Otp" : <CircleDashed size={18} className='animate-spin text-accent-foreground' />}</button>

                                            </div>
                                            <p className='mt-6 text-center text-sm text-muted-foreground'> Already have an account?{" "} <span onClick={() => {
                                                setErr("");
                                                setStep("login");
                                            }} className='text-foreground font-medium hover:underline cursor-pointer'>Login</span></p>

                                        </motion.div>
                                    )}

                                    {step == "otp" && (
                                        <motion.div
                                            key="otp"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h2 className='text-xl font-semibold tracking-tight text-foreground'>Verify Email</h2>

                                            <div className='mt-6 flex justify-between gap-2'>
                                                {otp.map((digit, i) => (
                                                    <input
                                                        key={i}
                                                        id={`otp-${i}`}
                                                        value={digit}
                                                        maxLength={1}
                                                        className='w-10 h-12 sm:w-12
                            text-center text-lg font-semibold
                            rounded-xl bg-muted
                            border border-border text-foreground
                            outline-none
                            focus:border-border-strong
                            transition-colors duration-200'
                                                        onChange={(e) => handleChangeOtp(i, e.target.value)}

                                                    />

                                                ))}
                                            </div>

                                            {err && <p className='text-red-500 '>*{err}</p>}
                                            <button className='mt-6 w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 flex justify-center items-center transition-all duration-300 shadow-[var(--shadow-soft)]' onClick={handleVerifyEmail}>{!loading ? "Verify OTP and Create Account" : <CircleDashed size={18} className='animate-spin text-accent-foreground' />}</button>

                                        </motion.div>
                                    )}
                                </div>



                            </div>

                        </motion.div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>

    )
}

export default AuthModal
