"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block font-medium">Username</span>
          <input
            type="text"
            name="username"
            required
            className="w-full rounded border px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="mb-1 block font-medium">Password</span>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded border px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
