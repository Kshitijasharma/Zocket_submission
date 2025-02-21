"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-6 px-10 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="text-2xl font-bold text-gray-800">Zocket.ai</div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/contact-sales")}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Contact Sales
          </button>
          <button
            onClick={() => router.push("/login")}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="text-center mt-32 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          The Everything App for Work
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Bring everyone together in a single platform designed to manage any type of work effortlessly.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:scale-105 transition-all"
        >
          Get Started. It’s FREE →
        </button>
        <p className="text-gray-500 mt-2 text-sm">
          Free Forever. No Credit Card Required.
        </p>
      </main>
    </div>
  );
}