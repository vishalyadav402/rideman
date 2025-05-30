"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  // Hardcoded user credentials (replace with API calls in production)
  const validUser = { userId: "admin", password: "password123" };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const onSubmit = (data) => {
    if (data.userId === validUser.userId && data.password === validUser.password) {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/admin/dashboard");
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900" >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-96 border border-gray-600">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Login</h2>
        {errorMessage && <p className="text-red-400 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-white">User ID</label>
            <input
              type="text"
              {...register("userId", { required: "User ID is required" })}
              className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.userId && <p className="text-red-400">{errors.userId.message}</p>}
          </div>
          <div>
            <label className="block font-medium text-white">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
