# 🚗 VehicleBook – Smart Vehicle Booking Platform

VehicleBook is a full-stack web application that simplifies vehicle rental by connecting customers with verified vehicle owners through a secure and user-friendly platform. It provides an end-to-end booking experience, including authentication, partner onboarding, vehicle management, real-time communication, and online payments.

---

## ✨ Features

### 👤 User
- Secure authentication with Google Sign-In
- Browse available vehicles
- Search and filter vehicles
- Book vehicles online
- Secure Razorpay payment integration
- View booking history
- Real-time chat with partners
- Video calling support

### 🚘 Partner
- Multi-step onboarding process
- Upload and verify required documents
- Add, edit, and manage vehicles
- View active bookings
- Track earnings
- Manage booking requests

### 🛡️ Admin
- Dashboard with platform statistics
- Verify partner documents
- Approve or reject partner registrations
- Manage users and vehicles
- Monitor platform activity

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit

### Backend
- Next.js API Routes
- Node.js

### Database
- MongoDB
- Mongoose

### Authentication
- NextAuth.js
- Google OAuth

### Cloud & Services
- Cloudinary (Document Uploads)
- Razorpay (Payments)
- Socket.IO (Real-time Chat)
- ZEGO Cloud (Video Calling)
- Nodemailer (Email Notifications)

---

## 📂 Project Structure

```
VehicleBook
│
├── rydex/          # Main Next.js Application
└── socketServer/   # Socket.IO Server
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

```bash
cd rydex
npm install

cd ../socketServer
npm install
```

### Configure Environment Variables

Create the required environment files:

```
rydex/.env.local
socketServer/.env
```

Add your credentials for:

- MongoDB
- NextAuth
- Google OAuth
- Cloudinary
- Razorpay
- ZEGO Cloud
- Email Service

### Run the application

Start the Next.js application

```bash
cd rydex
npm run dev
```

Start the Socket Server

```bash
cd socketServer
node index.js
```

---

## 📸 Core Modules

- User Authentication
- Partner Verification
- Vehicle Management
- Online Booking
- Payment Gateway
- Real-time Messaging
- Video Calling
- Admin Dashboard
- Cloud Document Storage

---

## 📌 Future Improvements

- Live vehicle tracking
- Ratings & Reviews
- Booking cancellation and refunds
- Push notifications
- Mobile application
- AI-based vehicle recommendations

---

## 👨‍💻 Author

**Atharv Gupta**

If you found this project useful, consider giving it a ⭐ on GitHub.