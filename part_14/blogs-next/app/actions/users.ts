"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserByUsername } from "@/app/services/users";
import type { RegisterFormState } from "@/app/register/state";

export const registerUser = async (
  prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> => {
  const username = ((formData.get("username") as string) ?? "").trim();
  const name = ((formData.get("name") as string) ?? "").trim();
  const password = (formData.get("password") as string) ?? "";
  const passwordConfirm = (formData.get("passwordConfirm") as string) ?? "";

  const errors: RegisterFormState["errors"] = {};

  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  } else if (await getUserByUsername(username)) {
    errors.username = "Username is already taken";
  }

  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }

  if (passwordConfirm !== password) {
    errors.passwordConfirm = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  revalidatePath("/users");
  redirect("/login");
};
