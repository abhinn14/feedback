import { create } from 'zustand';
import toast from "react-hot-toast";
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

    } catch (err) {
      console.log("Error in checkAuth: ", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true } );
    try {
      const res = await axiosInstance.post("/auth/login",formData);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

    } catch(error) {
      console.error('Login error:', error);
      toast.error(error.response.data.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      toast.success("Account created successfully");

    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
    } finally {
      set({isSigningUp:false});
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");

    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
    }
  }
}));
