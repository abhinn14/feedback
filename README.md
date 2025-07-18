# 📊 Feedback Collection Platform

A full-stack **MERN** application where admins can log in, create and share feedback forms, and view submitted responses — enhanced with **AI-generated summaries**.

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
| AI Summaries | OpenAI API                                   |

---

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/abhinn14/feedback.git](https://github.com/abhinn14/feedback.git)
    cd feedback
    ```

2.  **Set up environment variables:**
    Create a `.env` file inside the `api/` directory. This file will store your database connection string and secret key.

    ```bash
    # /api/.env

    PORT = 5001
    JWT_KEY = "your_super_secret_key_for_jwt"
    MONGOdb = "your_mongodb_connection_string"
    OPENAI_API_KEY="your_openai_api_key"
    NODE_ENV = development
    ```

3.  **Install dependencies:**
    ```bash
    cd api
    npm install
    cd ..
    cd client
    npm install
    ```

4.  **Run the application:**
    ```bash
    cd api
    npm run dev
    (in another terminal)
    cd client
    npm run dev
    ```
    -   The React client will be available at `http://localhost:5173`.
    -   The Node.js API server will be running at `http://localhost:5001`.

---

## 🧠 Approach and Design Decisions

State management: Used Zustand for simple, lightweight state instead of heavier libraries.

Auth: Chose JWT for stateless authentication with secure HTTP-only cookies.

AI summaries: Integrated OpenAI to give admins quick overviews of responses.

Public forms: Used generated URLs (publicUrl) for customer submissions without exposing admin data.
