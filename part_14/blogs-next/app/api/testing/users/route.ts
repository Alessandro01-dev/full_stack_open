import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getUserByUsername } from "@/app/services/users";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const body = await req.json().catch(() => null);
  const { username, name, password } = body ?? {};

  if (
    typeof username !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string" ||
    !username ||
    !name ||
    !password
  ) {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 },
    );
  }

  if (await getUserByUsername(username)) {
    return NextResponse.json(
      { error: "Username is already taken" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning({ id: users.id, username: users.username, name: users.name });

  return NextResponse.json(user, { status: 201 });
};
