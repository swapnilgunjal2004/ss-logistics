# 🚛 SS Logistics — Truck Booking & Real-time Tracking Platform

**SS Logistics** is a complete, production-ready full-stack web application for professional truck booking and live shipment tracking.

---

## ✨ Features

- 📦 **Truck Booking** — Book Mini, Small, Medium, Large, or XL trucks with instant price calculation
- 🗺️ **Live GPS Tracking** — Real-time shipment tracking with interactive Leaflet maps
- 💬 **WhatsApp Support Widget** — Direct chat widget (Phone: 8483889717)
- 🔐 **User Authentication** — Secure JWT-based registration and login
- 📱 **Responsive Design** — Mobile-first UI that works on all devices
- ⚡ **Real-time Updates** — Socket.io for live location and status updates
- 📋 **Booking History** — View, track, and cancel your bookings

---

## 🏗️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, React Router v6, Axios, Socket.io-client, Leaflet Maps |
| Backend | Node.js, Express, Socket.io, JWT, bcryptjs, express-validator |
| Database | MongoDB + Mongoose |
| Deployment | Docker + docker-compose |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository
```bash
git clone https://github.com/swapnilgunjal2004/ss-logistics.git
cd ss-logistics
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env   # Edit with your MongoDB URI & JWT secret
npm install
npm run dev            # Starts on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd frontend
cp .env.example .env   # Optional: change API URL
npm install
npm start              # Opens http://localhost:3000
```

---

## 🐳 Docker (One-command Start)

```bash
# Copy env files first
cp backend/.env.example backend/.env
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

---

## 📁 Project Structure

```
ss-logistics/
├── backend/
│   ├── models/          # Mongoose schemas (User, Truck, Booking, Driver)
│   ├── routes/          # Express API routes (auth, trucks, bookings, tracking)
│   ├── middleware/       # JWT auth middleware
│   ├── server.js        # Main Express + Socket.io server
│   └── .env.example
├── frontend/
│   ├── public/
│   └── src/
│       ├── pages/       # LandingPage, BookingPage, TrackingPage, LoginPage, etc.
│       ├── components/  # Navbar, Footer, MapComponent, WhatsAppWidget
│       └── services/    # Axios API client
└── docs/
    ├── API_DOCUMENTATION.md
    └── PROJECT_OVERVIEW.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/trucks/available` | List available trucks |
| POST | `/api/bookings/create` | Create booking (auth) |
| GET | `/api/bookings/my` | My bookings (auth) |
| PUT | `/api/bookings/:id/cancel` | Cancel booking (auth) |
| GET | `/api/tracking/:bookingId` | Live tracking data (auth) |

---

## 📞 Contact

- **Company:** SS Logistics
- **Phone:** +91 8483889717
- **Email:** swapnilgunjal2004@gmail.com
- **WhatsApp:** [Chat Now](https://wa.me/918483889717)

---

## 📄 License

MIT License © 2026 SS Logistics

