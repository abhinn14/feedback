# 📊 Feedback Collection Platform

A full-stack **MERN** application where admins can log in, create and share feedback forms, and view submitted responses — enhanced with **AI-generated summaries**.

Live: https://feedback-6ppf.onrender.com)   |    Admin credentials -> {name:"abhinn",password:"abhinn"}

<a href="https://ibb.co/BVbd9hbK"><img src="https://i.ibb.co/6RzVkKzJ/Screenshot-2025-07-18-114614.png" alt="Screenshot-2025-07-18-114614" border="0"></a>

<a href="https://ibb.co/1ftDgNK3"><img src="https://i.ibb.co/Gv4K6DkX/Screenshot-2025-07-18-115306.png" alt="Screenshot-2025-07-18-115306" border="0"></a>

<a href="https://ibb.co/fVW79M7Q"><img src="https://i.ibb.co/dsvytBy7/Screenshot-2025-07-18-115826.png" alt="Screenshot-2025-07-18-115826" border="0"></a>

<a href="https://ibb.co/Xryv1WF1"><img src="https://i.ibb.co/cSb70y20/Screenshot-2025-07-18-221526.png" alt="Screenshot-2025-07-18-221526" border="0"></a>

<a href="https://ibb.co/bj2ysCbm"><img src="https://i.ibb.co/ZRYwBF2X/Screenshot-2025-07-18-221627.png" alt="Screenshot-2025-07-18-221627" border="0"></a>

<a href="https://ibb.co/mrgwpMfF"><img src="https://i.ibb.co/cKVHq74X/Screenshot-2025-07-18-115737.png" alt="Screenshot-2025-07-18-115737" border="0"></a>

---

## ✨ Features

- 🔐 **User Authentication**: Secure login system for admins using **JWT** and **bcryptjs**. Only existing admins can create new admin accounts.
- 📝 **Custom Feedback Form Creation**: Easily create forms with customizable text or multiple-choice questions. Each form gets a **public URL** that can be shared with customers.
- 🚀 **Public Feedback Submission**: Customers can fill and submit feedback through the public link — **no login required**.
- 📜 **Response Dashboard**: Admins can view and download customer responses, with automatic **AI-generated summaries** for quick insights.
- 📥 **Export Responses**: Download raw data as `.csv` for analysis or record-keeping.

---

## 🛠 Tech Stack

| Layer        | Tech                                         |
| ------------ | -------------------------------------------- |
| Frontend     | React, Zustand                               |
| Backend      | Node.js, Express.js                          |
| Database     | MongoDB                                      |
| Auth         | JSON Web Tokens (JWT), bcryptjs              |
| AI           | OpenAI API                                   |

---

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abhinn14/feedback.git
    cd feedback
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root directory.

    ```bash

    PORT = 5001
    JWT_KEY = "your_super_secret_key_for_jwt"
    MONGOdb = "your_mongodb_connection_string"
    OPENAI_API_KEY="your_openai_api_key"
    NODE_ENV = development
    ```

3.  **Install dependencies:**
    ```bash
    npm run build
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    -   Website at `http://localhost:5001`.
  
5. **Credentials:**
   
    Only exisiting admins can create new admin accounts. So add the first the admin manually by sending {"name":"","password":""} to `http://localhost:5001/api/signup` using POSTMAN API.

---

## 🧠 Approach and Design Decisions

Public vs Protected Routes:
Public routes -> Customers access form via unique publicUrl without login.
Protected routes -> Admin-only dashboard, create form, view responses (protected with middleware).

JWT Authentication with HTTP-only Cookies:
Used JWT tokens stored in secure HTTP-only cookies to protect tokens from XSS and keep sessions stateless.

Lightweight State Management with Zustand:
Chose Zustand over Redux for simplicity — perfect for storing auth user, current form, responses, and loading states without complex setup.

Unique public URLs:
Generated random publicUrl on form creation, allowing admins to share forms publicly without exposing sensitive data.

AI-Powered Summaries:
Integrated OpenAI to auto-generate feedback summaries, giving admins quick insights at a glance.

Flexible Form Model:
Stored forms with a dynamic list of questions (text or multiple-choice), making it easy to support new types in future (e.g., ratings, checkboxes).

Clear Separation of Concerns:
Controllers handle business logic
Routes handle HTTP layer
Models define data schema
Frontend handles UI and calls store actions

Good UX:
Added loading indicators, toast notifications (success/error), and clear empty states to keep experience smooth even on slow networks.

CSV Export:
Built a route to let admins export raw responses as CSV for analysis.

Mobile-Responsive UI:
Built with responsive layout and CSS so the app looks clean and is usable on phones, tablets, and desktops.
