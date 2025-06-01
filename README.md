# 🛒 eSalesOne - eCommerce Checkout Flow Simulation


A fully functional 3-page eCommerce checkout simulation app built using **Next.js (App Router)**, **Node.js (Express)**, **PostgreSQL**, and **Mailtrap.io** for email confirmation.

---

## 📸 Screenshots

> https://drive.google.com/drive/folders/103myQCGg5ixWAXnKD4cxOPuZXsG9NWq4?usp=sharing

---

## ✨ Features

- 🖼️ Stunning UI with Tailwind CSS + Glassmorphism
- 🛍️ Product landing page with multiple variants
- 💳 Checkout page with client-side form validation
- 📬 Thank You page with order summary from database
- 📧 Transactional emails via Mailtrap (Success / Failure)
- 🌐 REST API (Node.js + Express)
- 🗃️ PostgreSQL for data persistence
- ✅ Full simulation: Approved, Declined, Gateway Error

---

## 📂 Folder Structure

```
ecommerce_checkout/
├── backend/         # Express server
│   ├── index.js     # API routes
│   ├── db.js        # PostgreSQL connection
│   └── .env         # Backend environment variables
├── db/              # SQL schema and seed
│   ├── schema.sql
│   └── seed.sql
├── src/             # Next.js (App Router)
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js          # Landing
│   │   ├── checkout/
│   │   │   └── page.js      # Checkout
│   │   └── thankyou/
│   │       └── page.js      # Thank You
├── components/      # Reusable UI components
├── styles/          # Tailwind + custom CSS
│   ├── globals.css
│   └── main.css
└── README.md        # This file
```

---

## 🚀 How to Run Locally

### 🔧 1. Set up PostgreSQL
- Create a database: `ecommerce_db`
- Run schema:
  ```bash
  psql -d ecommerce_db -f db/schema.sql
  ```
- Insert products:
  ```bash
  psql -d ecommerce_db -f db/seed.sql
  ```

### ⚙️ 2. Run the Backend
```bash
cd backend
npm install

# Create .env file:
# DATABASE_URL=postgres://user:pass@localhost:5432/ecommerce_db
# MAILTRAP_USER=your_user
# MAILTRAP_PASS=your_pass

node index.js
```
> Server running at: `http://localhost:4000`

### 🌐 3. Run the Frontend
```bash
cd ../
npm install
npm run dev
```
> App runs at: `http://localhost:3000`

---

## 🛠 Simulation Codes
Use these CVV Simulation Codes on checkout:

| Code | Result            |
|------|-------------------|
| 1    | ✅ Approved       |
| 2    | ❌ Declined       |
| 3    | ⚠️ Gateway Error |

---

## 🌐 Deployment (Free)

| Layer     | Platform     |
|-----------|--------------|
| Frontend  | Vercel       |
| Backend   | Render       |
| Database  | Railway      |
| Emails    | Mailtrap     |

### 🌍 Live URLs
```txt
Frontend: https://your-vercel-url.vercel.app
Backend:  https://your-render-url.onrender.com
```

Update frontend API calls like:
```js
fetch('https://your-backend.onrender.com/api/products')
```

---

## 💡 Tech Stack
- Frontend: Next.js, Tailwind CSS
- Backend: Node.js, Express
- DB: PostgreSQL
- Email: Mailtrap

---


## 🙌 Author
**SAHIL KUMAR**  
[LinkedIn](https://linkedin.com/in/sahilkumar111/) | [GitHub](https://github.com/sahilk45)

---

## 📃 License
This project is licensed under MIT. Feel free to use, modify, and share.
