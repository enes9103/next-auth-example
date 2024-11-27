"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-4">
        <p>Signed in as {session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link 
      href="/auth/signin"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Sign In
    </Link>
  );
}