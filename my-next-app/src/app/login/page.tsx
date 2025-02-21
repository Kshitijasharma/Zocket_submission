"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-extrabold text-center">Welcome Back</h2>
        <p className="text-sm text-center text-gray-300 mt-2">
          Login to access your dashboard
        </p>

        {message && (
          <p className="mt-3 text-center text-red-400 font-semibold">
            {message}
          </p>
        )}

        <div className="mt-6">
          <label className="block text-gray-200 text-sm mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            className="w-full p-3 border border-gray-500 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-200 text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            className="w-full p-3 border border-gray-500 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-500" />
            Remember me
          </label>
          <a href="#" className="hover:underline hover:text-blue-400">
            Forgot password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:scale-105 transition-transform"
        >
          Login
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}