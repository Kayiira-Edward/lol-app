"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-6xl">
        Be Anonymous. Be Bold. Be <span className="text-blue-600">LOLer.</span>
      </h1>
      <p className="max-w-2xl mb-8 text-lg text-gray-600 md:text-xl">
        Chat freely with anyone — your identity stays secret.  
        <br />Built for Uganda’s Gen Z culture. 🔥
      </p>
      <div className="flex space-x-4">
        <Link
          href="/send"
          className="px-6 py-3 font-semibold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          Start Chatting
        </Link>
        <Link
          href="/auth/login"
          className="px-6 py-3 font-semibold text-gray-700 transition-all border border-gray-300 rounded-xl hover:bg-gray-100"
        >
          Login
        </Link>
      </div>
    </section>
  );
}
