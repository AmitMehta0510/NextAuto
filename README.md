# 🚗 NextAuto

> A full-stack automotive e-commerce platform for browsing, purchasing, and managing auto parts & accessories — with a powerful admin dashboard.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-React%2018%20+%20Vite-61DAFB?style=flat-square&logo=react)
![Backend](https://img.shields.io/badge/Backend-Node.js%20+%20Express-339933?style=flat-square&logo=node.js)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Admin Panel](#-admin-panel)
- [Security](#-security)
- [Contributing](#-contributing)

---

## 🔍 Overview

**NextAuto** is a production-ready MERN stack e-commerce application designed for the automotive industry. It provides customers with a seamless shopping experience — from browsing a product catalog and managing a cart, to placing orders and tracking their delivery status. Administrators get a dedicated dashboard to manage the entire platform.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| **Frontend** | [https://next-auto-one.vercel.app](https://next-auto-one.vercel.app) |
| **Backend API** | Deployed separately (see backend env config) |

---

## ✨ Features

### 👤 Customer-Facing
- **Product Catalog** — Browse products with images, categories, tags, ratings, and status badges (e.g. "New", "Premium")
- **Product Details** — View full descriptions, stock availability, and multiple product images
- **Cart** — Persistent, user-linked shopping cart with quantity management
- **Checkout** — Multi-step checkout with shipping address form and payment method selection
- **Payment Methods** — Cash on Delivery, UPI, Debit Card, Credit Card
- **Order Tracking** — View order history and live status (`Pending → Confirmed → Shipped → Delivered → Cancelled`)
- **User Profile** — View and edit personal information

### 🔐 Authentication
- Register / Login with email and password
- JWT-based stateless authentication (7-day token expiry)
- Passwords hashed with bcrypt (10 salt rounds)
- Role-based access control (User vs. Admin)

### 🛠️ Admin Dashboard
- **Dashboard** — Key metrics and analytics charts (via Recharts)
- **Manage Products** — Full CRUD with Cloudinary image uploads
- **Manage Orders** — View and update order statuses
- **Manage Users** — View, activate/deactivate user accounts
- **Manage Contacts** — View and respond to customer inquiries
- **Export Reports** — Download platform reports

### 📬 Notifications
- **Email** — Transactional emails via Resend (order confirmations, etc.)
- **SMS** — SMS alerts via Twilio

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| React Router v6 | Client-side routing |
| React Hook Form + Yup | Form handling & validation |
| Axios | HTTP client |
| Recharts | Data visualization (admin) |
| Lucide React & React Icons | Icon libraries |
| React Hot Toast | Toast notifications |
| Headless UI | Accessible UI primitives |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Token (JWT) | Stateless authentication |
| bcryptjs | Password hashing |
| Cloudinary + Multer | Image upload & storage |
| Resend | Transactional email |
| Twilio | SMS notifications |
| Helmet | HTTP security headers |
| express-rate-limit | API rate limiting |
| CORS | Cross-origin request control |
| Morgan | HTTP request logging |
| Nodemailer | Email sending |

---

## 📁 Project Structure

```
nextauto/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/               # Route handler logic
│   ├── middleware/
│   │   ├── authMiddleware.js      # protect + adminOnly guards
│   │   └── errorMiddleware.js     # Global error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── userRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── adminProductRoutes.js
│   │   ├── adminOrderRoutes.js
│   │   ├── adminUserRoutes.js
│   │   └── adminContactRoutes.js
│   ├── utils/                     # Helper utilities
│   ├── uploads/                   # Temp file storage (pre-Cloudinary)
│   ├── seeder.js                  # Database seeder script
│   └── server.js                  # App entry point
│
└── frontend/
    ├── public/
    └── src/
        ├── api/                   # Axios instance configuration
        ├── assets/                # Static assets
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── Sidebar.jsx
        │   ├── HomeComponents/
        │   └── common/
        ├── context/
        │   ├── AuthContext.jsx    # Global auth state
        │   └── CartContext.jsx    # Global cart state
        ├── hooks/                 # Custom React hooks
        ├── layouts/               # Page layout wrappers
        ├── pages/
        │   ├── Admin/
        │   │   ├── Dashboard.jsx
        │   │   ├── ManageProducts.jsx
        │   │   ├── ManageOrders.jsx
        │   │   ├── ManageUsers.jsx
        │   │   ├── ManageContacts.jsx
        │   │   └── ExportReports.jsx
        │   ├── Home.jsx
        │   ├── ProductDetails.jsx
        │   ├── Cart.jsx
        │   ├── Checkout.jsx
        │   ├── Orders.jsx
        │   ├── Profile.jsx
        │   ├── Login.jsx
        │   └── Register.jsx
        ├── routes/                # AppRoutes with protected route guards
        ├── services/              # API call functions
        └── utils/                 # Frontend helpers
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- A [Cloudinary](https://cloudinary.com/) account
- A [Resend](https://resend.com/) account (for email)
- A [Twilio](https://www.twilio.com/) account (for SMS) *(optional)*

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Fill in all required values (see Environment Variables section below)

# 4. (Optional) Seed the database with sample data
npm run seed

# 5. Start the development server
npm run dev
```

The backend server will start on **http://localhost:5000**

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create your environment file
# Create a .env file and set the backend URL:
echo "VITE_API_URL=http://localhost:5000/api" > .env

# 4. Start the development server
npm run dev
```

The frontend will be available at **http://localhost:5173**

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
# Environment
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=7d

# CORS — comma-separated list of allowed frontend origins
CLIENT_ORIGIN=http://localhost:5173,https://your-frontend.vercel.app

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=NextAuto <noreply@yourdomain.com>

# SMS (Twilio)
TWILIO_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+1234567890

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Never commit your `.env` files to version control.** Both are listed in `.gitignore`.

---

## 📡 API Reference

All API routes are prefixed with `/api`.

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get product by ID | Public |

### Cart
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/cart` | Get user's cart | 🔒 User |
| POST | `/api/cart` | Add item to cart | 🔒 User |
| DELETE | `/api/cart/:id` | Remove item from cart | 🔒 User |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/orders` | Get user's orders | 🔒 User |
| POST | `/api/orders` | Place a new order | 🔒 User |

### Admin
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/products` | List all products | 🔒 Admin |
| POST | `/api/admin/products` | Create product | 🔒 Admin |
| PUT | `/api/admin/products/:id` | Update product | 🔒 Admin |
| DELETE | `/api/admin/products/:id` | Delete product | 🔒 Admin |
| GET | `/api/admin/orders` | List all orders | 🔒 Admin |
| PUT | `/api/admin/orders/:id` | Update order status | 🔒 Admin |
| GET | `/api/admin/users` | List all users | 🔒 Admin |
| GET | `/api/admin/contacts` | List all contacts | 🔒 Admin |

---

## 🛡️ Admin Panel

To access the admin panel, a user must have `isAdmin: true` in the database. You can set this manually via MongoDB Atlas, or use the seeder script.

Once logged in as admin, navigate to `/admin/dashboard` to access the full admin interface.

---

## 🔒 Security

NextAuto implements several layers of security out of the box:

| Measure | Implementation |
|---|---|
| **Secure HTTP Headers** | `helmet()` middleware sets headers like `X-Content-Type-Options`, `X-Frame-Options`, etc. |
| **CORS Whitelisting** | Only explicitly listed origins (from `CLIENT_ORIGIN` env var) can access the API — no wildcards |
| **Rate Limiting** | Max 300 requests per IP per 15-minute window via `express-rate-limit` |
| **JWT Authentication** | All protected routes require a valid Bearer token |
| **Role-Based Access** | `adminOnly` middleware blocks non-admin users from admin routes with a 403 |
| **Password Hashing** | bcrypt with 10 salt rounds — passwords are never stored in plaintext |
| **Immutable Order Pricing** | `priceAtPurchase` is captured at checkout time so future price changes don't alter order records |
| **Dev-only Logging** | Morgan HTTP logging is only active in `development` mode |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code follows the existing project structure and includes appropriate error handling.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  Built with ❤️ by <strong>Amit Mehta</strong>
</div>
