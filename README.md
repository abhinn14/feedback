# Feedback Collection Platform

A full-stack MERN application designed for users to register, log in, submit feedback, and view all submitted entries.

---

## Features

-   🔐 **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
-   📝 **Feedback Submission**: Authenticated users can submit feedback through a simple, intuitive form.
-   📜 **Feedback Display**: View a chronological list of all feedback submitted by all users.
-   🚀 **Full-Stack Application**: Built with a React frontend and a Node.js/Express backend.

---

## Tech Stack

-   **Frontend**: React, Vite, React Router
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs
-   **Development**: Concurrently, Nodemon

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   **Node.js** (v18 or later recommended)
-   **npm** (comes with Node.js)
-   **MongoDB**: You must have a MongoDB database instance running. You can use a local installation or a cloud service like MongoDB Atlas.

### How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/abhinn14/feedback.git](https://github.com/abhinn14/feedback.git)
    cd feedback
    ```

2.  **Set up environment variables:**
    Create a `.env` file inside the `api/` directory. This file will store your database connection string and secret key.

    ```bash
    # /api/.env

    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_super_secret_key_for_jwt"
    ```
    -   Replace `your_mongodb_connection_string` with your actual MongoDB connection URI.
    -   Replace `your_super_secret_key_for_jwt` with a long, random, and private string.

3.  **Install dependencies:**
    From the **root** directory, run the following command. It will install dependencies for both the root, client, and api projects.
    ```bash
    npm install
    ```

4.  **Run the application:**
    This command will start both the backend server and the frontend client concurrently.
    ```bash
    npm run dev
    ```
    -   The React client will be available at `http://localhost:5173`.
    -   The Node.js API server will be running at `http://localhost:5000`.

---

## Approach and Design Decisions

This project was built with a focus on creating a standard, maintainable, and scalable MERN stack application.

### 1. Project Structure (Monorepo-like)

The project is organized into two main folders, `client/` and `api/`, within a single GitHub repository.

-   **Decision**: This structure keeps the frontend and backend codebases separate for clarity and independent development while allowing them to be managed and versioned together. It simplifies the initial setup without the complexity of a full monorepo tooling like Lerna or Turborepo.
-   **Benefit**: A developer can work on the entire feature-stack (UI to database) from a single repository. The root `package.json` uses `npm` workspaces and `concurrently` to manage and run both services with single commands (`npm install`, `npm run dev`), which greatly enhances the developer experience.

### 2. Backend (API)

-   **Node.js & Express.js**: Chosen for its vast ecosystem, performance, and ubiquity in modern web development. Express.js provides a minimalist and flexible framework for building a robust REST API.
-   **MongoDB & Mongoose**: MongoDB's flexible, document-based (NoSQL) structure is ideal for rapid development and evolving application requirements. Mongoose was added on top to provide schema validation, data modeling, and business logic hooks, bringing a layer of structure to the flexible nature of MongoDB.
-   **JWT for Authentication**: Instead of session-based authentication, JWTs were chosen. This makes the API **stateless**, meaning each request from the client contains all the information needed to authenticate it. This is more scalable and simplifies the server logic, as the server does not need to store session state. Password hashing with `bcryptjs` is a standard, secure practice to prevent plain-text password storage.

### 3. Frontend (Client)

-   **React & Vite**: React was chosen for its component-based architecture, which makes building complex UIs manageable and reusable. **Vite** was selected as the build tool over the older Create React App (CRA) due to its significantly faster development server startup and Hot Module Replacement (HMR), leading to a much better developer experience.
-   **React Router**: The `react-router-dom` library was used to create a **Single Page Application (SPA)**. This allows for seamless navigation between pages (like Home, Login, Register) without a full page reload, providing a faster, more native-app-like user experience.
-   **State Management**: For this project's scope, React's built-in hooks (`useState`, `useContext`) are sufficient for managing state. This avoids the boilerplate and complexity of external libraries like Redux or MobX, keeping the frontend lightweight and easier to understand.
