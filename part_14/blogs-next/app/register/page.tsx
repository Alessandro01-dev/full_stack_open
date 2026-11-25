"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";
import type { RegisterFormState } from "./state";

const initialState: RegisterFormState = { errors: {} };

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block">
            <span className="mb-1 block font-medium">Username</span>
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
              className="w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.username && (
            <p className="mt-1 text-sm text-red-500">{state.errors.username}</p>
          )}
        </div>
        <div>
          <label className="block">
            <span className="mb-1 block font-medium">Name</span>
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values?.name}
              className="w-full rounded border px-3 py-2"
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="mb-1 block font-medium">Password</span>
            <input
              type="password"
              name="password"
              className="w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.password && (
            <p className="mt-1 text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        <div>
          <label className="block">
            <span className="mb-1 block font-medium">Confirm password</span>
            <input
              type="password"
              name="passwordConfirm"
              className="w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.passwordConfirm && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}
