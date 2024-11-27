"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:opacity-50"
            disabled={loading}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}