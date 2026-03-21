# 🚛 SS Logistics — Truck Booking & Real-time Tracking Platform

**SS Logistics** is a complete, production-ready full-stack web application for professional truck booking and live shipment tracking.

---

## ⚡ Run Right Now — 3 Commands

> **Requires:** [Node.js 18+](https://nodejs.org) and [MongoDB](https://www.mongodb.com/try/download/community) (or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud account)

```bash
# 1. Clone the repo
git clone https://github.com/swapnilgunjal2004/ss-logistics.git
cd ss-logistics

# 2. Setup everything (copies .env files, installs all dependencies)
npm run setup

# 3. Start both backend + frontend together
npm run dev
```

That's it! Open **http://localhost:3000** in your browser. 🎉

> **Note:** If MongoDB isn't running locally, see [MongoDB Atlas free setup](#-mongodb-setup) below — it takes 2 minutes.

---

## 🐳 Alternative: Docker (Zero Install)

If you have Docker installed, one command starts everything (MongoDB included):

```bash
git clone https://github.com/swapnilgunjal2004/ss-logistics.git
cd ss-logistics
docker-compose up --build
```

| Service | URL |
|---------|-----|
| 🌐 Frontend | http://localhost:3000 |
| ⚙️ Backend API | http://localhost:5000/api/health |
| 🗄️ MongoDB | localhost:27017 |

---

## 🗄️ MongoDB Setup

### Option A — Local MongoDB
1. [Download & Install MongoDB Community](https://www.mongodb.com/try/download/community)
2. Start it: `mongod --dbpath /data/db` (it runs on `mongodb://localhost:27017` by default)
3. The backend `.env` already points there — nothing else to configure.

### Option B — MongoDB Atlas (Free Cloud, 2 min)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) → **Start Free**
2. Create a cluster (free M0 tier)
3. Click **Connect → Drivers** and copy your connection string
4. Edit `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sslogistics
   ```
5. Re-run `npm run dev`

---

## 📋 Manual Setup (step by step)

If you prefer to run backend and frontend in separate terminals:

**Terminal 1 — Backend**
```bash
cd backend
cp .env.example .env       # then edit .env if needed
npm install
npm run dev                # http://localhost:5000
```

**Terminal 2 — Frontend**
```bash
cd frontend
cp .env.example .env       # optional
npm install
npm start                  # http://localhost:3000
```

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
| Backend | Node.js, Express, Socket.io, JWT, bcryptjs, express-validator, express-rate-limit |
| Database | MongoDB + Mongoose |
| Deployment | Docker + docker-compose |

---

## 📁 Project Structure

```
ss-logistics/
├── package.json             ← Root scripts (npm run dev / setup)
├── scripts/setup.js         ← One-command setup helper
├── docker-compose.yml
├── backend/
│   ├── models/              # Mongoose schemas (User, Truck, Booking, Driver)
│   ├── routes/              # Express API routes (auth, trucks, bookings, tracking)
│   ├── middleware/          # JWT auth middleware
│   ├── server.js            # Main Express + Socket.io server
│   └── .env.example
└── frontend/
    ├── public/
    └── src/
        ├── pages/           # LandingPage, BookingPage, TrackingPage, LoginPage, etc.
        ├── components/      # Navbar, Footer, MapComponent, WhatsAppWidget
        └── services/        # Axios API client
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/trucks/available` | List available trucks |
| POST | `/api/bookings/create` | Create booking (auth required) |
| GET | `/api/bookings/my` | My bookings (auth required) |
| PUT | `/api/bookings/:id/cancel` | Cancel booking (auth required) |
| GET | `/api/tracking/:bookingId` | Live tracking data (auth required) |

---

## 📞 Contact

- **Company:** SS Logistics
- **Phone:** +91 8483889717
- **Email:** swapnilgunjal2004@gmail.com
- **WhatsApp:** [Chat Now](https://wa.me/918483889717)

---

## 📄 License

MIT License © 2026 SS Logistics

