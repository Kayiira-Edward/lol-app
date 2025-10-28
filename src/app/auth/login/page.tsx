"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Password strength check
  const checkPasswordStrength = (password: string) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]).{6,}$/;
    if (!password) return "";
    if (strongRegex.test(password)) return "Strong ✅";
    if (password.length >= 6) return "Medium ⚡";
    return "Weak ❌";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (checkPasswordStrength(form.password) === "Weak ❌") {
      setError(
        "Password too weak. Use uppercase, number & special character"
      );
      return;
    }

    console.log("Logging in:", form);
    // Firebase login call here later
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
      <div className="bg-white/95 p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        <h1 className="mb-6 text-3xl font-bold text-center text-purple-600">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 pr-10 border rounded-md outline-none focus:ring-2 focus:ring-purple-400"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setPasswordStrength(checkPasswordStrength(e.target.value));
              }}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1l22 22" />
                  <path d="M17.94 17.94A10.97 10.97 0 0 1 12 19c-5 0-9.27-3-11-7 1.21-2.86 3.57-5.13 6.23-6.32" />
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Password strength feedback */}
          {passwordStrength && !error && (
            <p
              className={`text-sm mt-1 ${
                passwordStrength.includes("Strong")
                  ? "text-green-500"
                  : passwordStrength.includes("Medium")
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {passwordStrength}
            </p>
          )}

          {/* Error */}
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

          {/* Submit */}
          <button className="w-full py-3 font-semibold text-white transition-all bg-purple-600 shadow-md rounded-xl hover:bg-purple-700">
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <Link href="/auth/register" className="text-purple-600 hover:underline">
            Register
          </Link>
          <button
            type="button"
            className="text-purple-600 hover:underline"
            onClick={() => alert("Forgot password flow coming soon!")}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
