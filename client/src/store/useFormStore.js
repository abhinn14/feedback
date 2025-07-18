import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

export const useFormStore = create((set) => ({
  forms: [],
  currentForm: null,
  responses: [],
  isLoading: false,
  summary: '',
  isSummarizing: false,

  setForms: (forms) => set({ forms }),
  addForm: (form) => set((state) => ({ forms: [...state.forms, form] })),
  setCurrentForm: (form) => set({ currentForm: form }),
  setResponses: (responses) => set({ responses }),
  clearForm: () => set({ currentForm: null, responses: [] }),

  fetchForms: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/form/show");
      set({ forms: res.data });
    } catch (error) {
      console.error('fetchForms error:', error);
      toast.error(error?.response?.data?.message || "Failed to load forms");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchResponses: async (formId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/response/read/${formId}`);
      set({ responses: res.data.responses });
    } catch (error) {
      console.error('fetchResponses error:', error);
      toast.error(error?.response?.data?.message || "Failed to load responses");
    } finally {
      set({ isLoading: false });
    }
  },

  createForm: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/form/create", formData);
      set((state) => ({ forms: [...state.forms, res.data] }));
      toast.success("Form created successfully");
    } catch (error) {
      console.error('createForm error:', error);
      toast.error(error?.response?.data?.message || "Failed to create form");
    } finally {
      set({ isLoading: false });
    }
  },

  submitResponse: async (publicUrl, answers) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/response/write/${publicUrl}`, { answers });
      toast.success("Feedback submitted! Thank you.");
    } catch (error) {
      console.error("submitResponse error:", error);
      toast.error(error?.response?.data?.message || "Submission failed");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getForm: async (publicUrl) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/form/get/${publicUrl}`);
      set({ currentForm: res.data });
    } catch (error) {
      console.error('getForm error:', error);
      toast.error(error?.response?.data?.message || "Failed to load form");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getFormById: async (formId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/form/get-by-id/${formId}`);
      set({ currentForm: res.data });
    } catch (error) {
      console.error('getFormById error:', error);
      toast.error(error?.response?.data?.message || "Failed to load form info");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSummary: async (formId) => {
    set({ isSummarizing: true });
    try {
      const res = await axiosInstance.get(`/response/summarize/${formId}`);
      set({ summary: res.data.summary });
    } catch (error) {
      console.error('fetchSummary error:', error);
      toast.error(error?.response?.data?.message || "Failed to fetch summary");
    } finally {
      set({ isSummarizing: false });
    }
  },

  deleteForm: async (formId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/form/delete/${formId}`);
      // Removing it from state
      set((state) => ({
        forms: state.forms.filter((f) => f._id !== formId)
      }));
      toast.success("Form deleted");
    } catch (error) {
      console.error("deleteForm error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete form");
    } finally {
      set({ isLoading: false });
    }
  }

}));
