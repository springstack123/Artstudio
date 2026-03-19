# Art Studio Marketplace

> A professional full-stack art marketplace platform connecting artists and collectors — built with Spring Boot, React, and MySQL.

---

## Overview

Art Studio is a scalable, secure marketplace where artists can showcase and sell their work, accept custom commissions, and manage exclusive sketch club memberships. Buyers can browse curated artwork, place orders, and track their collection — all through a clean, responsive interface.

---

## Features

| Feature | Description |
|---|---|
| 🔐 Authentication | JWT-based auth with role separation (User / Admin) |
| 🛒 Art Shop | Full product catalog with browsing and ordering |
| 🎨 Commissions | Custom artwork request and fulfillment workflow |
| 👥 Sketch Club | Subscription-based membership tiers |
| 📦 Order Management | End-to-end order lifecycle and payment tracking |
| 👤 User Profiles | Order history, preferences, and account settings |
| 🖥️ Admin Dashboard | Stats, user management, and platform oversight |
| 📧 Support | Contact forms and customer support integration |
| 📱 Responsive | Mobile-first design built with Bootstrap |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 3.3.5 (Java 21) |
| Frontend | React 19 + Vite |
| Database | MySQL 8.0 |
| Auth | JWT (Access + Refresh tokens) |
| Build | Maven 3.9+ / npm |

---

## Prerequisites

Before getting started, ensure the following are installed:

- **Java 21 JDK**
- **Node.js 20+**
- **Maven 3.9+**
- **MySQL 8.0+**

---

## Getting Started

### 1. Database Setup

```sql
CREATE DATABASE art_backend_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Then update `art-backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your_64_character_secret_key_here
```

---

### 2. Run the Backend

```bash
cd art-backend
mvn clean spring-boot:run
```

API available at: `http://localhost:8080`

---

### 3. Run the Frontend

```bash
cd art-frontend
npm ci
npm run dev
```

App available at: `http://localhost:5173`

---

## Project Structure

```
art-studio/
├── art-backend/                  # Spring Boot REST API
│   └── src/main/java/
│       ├── controllers/          # REST endpoints (@RestController)
│       ├── entities/             # JPA models (User, Order, Product…)
│       ├── services/             # Business logic layer
│       └── config/               # Security, CORS, JWT configuration
│
├── art-frontend/                 # React + Vite SPA
│   └── src/
│       ├── pages/                # Route-level components (Home, Shop…)
│       └── components/           # Reusable UI components
│
├── docker-compose.yml            # Container orchestration
└── README.md
```

---

## API Reference

**Base URL:** `http://localhost:8080/api`

### Authentication

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/auth/register` | `{ email, password, name }` | Register a new user |
| `POST` | `/auth/login` | `{ email, password }` | Login and receive JWT tokens |
| `POST` | `/auth/refresh` | `{ refreshToken }` | Obtain a new access token |

### Other Endpoints

- `GET/POST /products` — Product catalog
- `GET/POST /orders` — Order management
- `GET/POST /commissions` — Commission requests
- `GET /user` — Authenticated user profile
- `GET /admin/stats` — Admin dashboard statistics

**Example request:**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "yourpassword"}'
```

---

## Deployment

### Backend — Railway / Heroku

```bash
railway login
railway init
railway up
```

Add environment variables for `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, and `JWT_SECRET` in your dashboard.

### Frontend — Vercel / Netlify

```bash
npm run build
# Deploy the generated dist/ folder
```

Set `VITE_API_BASE_URL` to point to your deployed backend URL.

---

## Contributing

Contributions are welcome. Please follow the steps below:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Open a pull request against `main`

This project follows [Conventional Commits](https://www.conventionalcommits.org).

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
