"use client"
import { BookingStatus, PaymentStatus } from '@/models/booking.model'
import { IUser } from '@/models/user.model'
import { IVehicle } from '@/models/vehicle.model'
import axios from 'axios'
import { Bike, Calendar, Car, ChevronRightIcon, IndianRupee, Loader2, MapPin, Phone, Truck, User } from 'lucide-react'
import { div } from 'motion/react-client'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { useRouter } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
interface IBooking {
_id:string
    user: IUser
    driver: IUser
    vehicle: IVehicle

    pickUpAddress: string
    dropAddress: string

    pickUpLocation: {
        type: "Point",
        coordinates: [number, number]
    }
    dropLocation: {
        type: "Point",
        coordinates: [number, number]
    }

    fare: number

    userMobileNumber: string
    driverMobileNumber: string

    bookingStatus: BookingStatus
    paymentStatus: PaymentStatus
    paymentDeadline: Date
    adminCommission: number
    partnerAmount: number

    pickUpOtp: string,
    pickUpOtpExpires: Date
    dropOtp: string,
    dropOtpExpires: Date,
    createdAt?: Date
    updatedAt?: Date
}
function page() {
    const [bookings, setBookings] = useState<IBooking[] | []>([])
    const [selectStatus, setSelectStatus] = useState("All")
    const [loading, setLoading] = useState(false)
  const router=useRouter()
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get("/api/user/bookings")
                console.log(data)
                setBookings(data)
                setLoading(false)
            } catch (error: any) {
                console.log(error.response.data.message)
                setLoading(false)
            }
        }
        fetch()
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
            completed: "bg-teal-50 text-teal-700 border-teal-200",
            requested: "bg-amber-50 text-amber-700 border-amber-200",
            awaiting_payment: "bg-blue-50 text-blue-700 border-blue-200",
            cancelled: "bg-rose-50 text-rose-700 border-rose-200",
            rejected: "bg-red-50 text-red-700 border-red-200",
            expired: "bg-muted text-muted-foreground border-border",
        };
        return colors[status] || "bg-muted text-muted-foreground border-border";
    };


    const getVehicleIcon = (vehicleType?: string) => {
        switch (vehicleType?.toLowerCase()) {
            case 'bike':
                return <Bike className="w-4 h-4 text-muted-foreground" />;
            case 'auto':
                return <Car className="w-4 h-4 text-muted-foreground" />; // You can add Auto icon if available
            case 'truck':
                return <Truck className="w-4 h-4 text-muted-foreground" />;
            case 'loading':
            case 'car':
            default:
                return <Car className="w-4 h-4 text-muted-foreground" />;
        }
    };


    const filterBookings = selectStatus === "All"
        ? bookings
        : bookings.filter(b => b.bookingStatus === selectStatus.toLowerCase());

    return (
        <div className='min-h-screen bg-background text-foreground'>
            <ThemeToggle variant="onLight" className="fixed top-5 right-5 z-50" />

            <div className='bg-card border-b border-border'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-3xl mx-auto py-6'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-muted p-2 rounded-2xl border border-border'>
                                <Car className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <h1 className='text-2xl font-semibold text-foreground tracking-tight'>My Bookings</h1>
                                <p className='text-muted-foreground text-sm mt-1'> {bookings.length} {bookings.length === 1 ? 'ride' : 'rides'} assigned to you</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                <div className='max-w-3xl mx-auto'>

                    <div className='flex justify-between items-center mb-6'>
                        <div className='text-sm text-muted-foreground'>
                            Showing {filterBookings.length} bookings
                        </div>
                        <select
                            value={selectStatus}
                            onChange={(e) => setSelectStatus(e.target.value)}
                            className='bg-card border border-border rounded-xl px-3 py-1.5 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors'
                        >
                            <option>All</option>
                            <option>requested</option>
                            <option>awaiting_payment</option>
                            <option>confirmed</option>
                            <option>started</option>
                            <option>completed</option>
                            <option>cancelled</option>
                            <option>rejected</option>
                            <option>expired"</option>

                        </select>
                    </div>

                    {loading && (
                        <div className='flex justify-center py-16'>
                            <Loader2 className='animate-spin w-8 h-8 text-foreground' />
                        </div>
                    )}

                    {!loading && filterBookings.length === 0 && (
                        <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-soft)] p-12 text-center">
                            <Car className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                            <h1 className='text-lg font-medium text-foreground'>No bookings yet</h1>
                            <p className='text-muted-foreground text-sm mt-1'>When customers book rides, they'll appear here</p>
                        </div>
                    )}

                    {!loading && filterBookings.length > 0 && (
                        <div className='space-y-4'>
                            {filterBookings.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <div className='bg-card rounded-2xl border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-all overflow-hidden'>
                                        <div className='flex items-center gap-3 p-4 bg-muted border-b border-border'>
                                            <div className='w-12 h-12 rounded-full overflow-hidden bg-border flex-shrink-0 border-2 border-card shadow-[var(--shadow-soft)] flex items-center justify-center'>
                                                <User className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                            <div className='flex-1'>
                                                <div className='flex items-center justify-between'>
                                                    <h3 className='font-semibold text-foreground'>{b.driver.name.toUpperCase() || "Driver"}</h3>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(b.bookingStatus)}`}
                                                    >
                                                        {b.bookingStatus || "-"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                                    <Phone className="w-3 h-3" />
                                                    <span>{b.driverMobileNumber}</span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='px-4 pt-3'>
                                            <div className='bg-muted rounded-xl p-2 flex items-center gap-2 border border-border'>
                                                {getVehicleIcon(b.vehicle.type)}
                                                <div className='text-xs text-muted-foreground'>
                                                    {b.vehicle.vehicleModel} • {b.vehicle.number || "Not assigned"}
                                                </div>

                                            </div>
                                        </div>

                                        <div className='p-4 space-y-3'>
                                            <div className='flex items-start gap-3'>
                                                <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center'>
                                                    <MapPin className="w-3 h-3 text-green-600" />
                                                </div>
                                                <div className='flex-1'>
                                                    <span className="text-xs font-medium text-green-600 uppercase tracking-wider">PICK UP</span>
                                                    <p className='text-sm text-card-foreground mt-0.5 leading-relaxed'>
                                                        {b.pickUpAddress}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex items-start gap-3'>
                                                <div className='flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center'>
                                                    <MapPin className="w-3 h-3 text-red-600" />
                                                </div>
                                                <div className='flex-1'>
                                                    <span className="text-xs font-medium text-red-600 uppercase tracking-wider">DROP</span>
                                                    <p className='text-sm text-card-foreground mt-0.5 leading-relaxed'>
                                                        {b.dropAddress}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between px-4 py-3 bg-muted border-t border-border'>
                                            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                <span>{formatDate(b.createdAt?.toString()!)}</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-semibold text-foreground">
                                                <IndianRupee className="w-4 h-4" />
                                                <span>{b.fare}</span>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between px-4 py-3 border-t border-border'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-xs text-muted-foreground'>Payment:</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${b.paymentStatus === 'paid'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}>{b.paymentStatus}</span>

                                            </div>
                                        {(b.bookingStatus == "confirmed" || b.bookingStatus=="started" || b.bookingStatus=="completed")  && (
                                            <div className='flex items-center gap-2'>
                                                <button
                                            onClick={()=>router.push(`/user/ride/${b._id}`)}
                                                    className="flex items-center gap-1 text-sm font-medium text-accent-foreground bg-accent hover:opacity-90 px-4 py-1.5 rounded-xl transition-all"
                                                >
                                                    <span>Details</span>
                                                    <ChevronRightIcon className="w-4 h-4"/>
                                                </button>
                                            </div>

                                        )}
                                        </div>


                                    </div>

                                </motion.div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default page
