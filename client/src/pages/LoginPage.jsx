import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

export default function LoginPage() {

  const [ showPswd, setShowPswd ] = useState(false);
  const [ formData, setFormData ] = useState({ name: "", password: "",});

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };


  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white text-black p-10 rounded-[40px] w-[500px] flex items-center flex-col shadow-2xl">
        <img src="/ayna.svg" alt="Logo" className="w-45 h-14 mb-4" />
        <h1 className="text-4xl font-bold mt-2 text-center">
          Feedback Collection Platform
        </h1>

        <h2 className="mt-7 text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="h-[220px] w-[300px]">
          <div className="mb-4">

            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Enter your username"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mb-6">

            <label className="block mb-2">Password</label>
            <div className="relative w-full">
              <input
                type={showPswd ? "text" : "password"}

                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center"
                onClick={() => setShowPswd(!showPswd)}
              >
                {showPswd ? (
                  <EyeOff className="size-5 text-gray-500" />
                ) : (
                  <Eye className="size-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center" 
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                &nbsp;Loading...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );

}
