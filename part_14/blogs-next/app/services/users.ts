import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const getUsers = async () => {
  return db.query.users.findMany({
    orderBy: asc(users.id),
  });
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
};

export const setUserToken = async (id: number, token: string) => {
  await db.update(users).set({ token }).where(eq(users.id, id));
};

export const getUserByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    with: {
      blogs: {
        columns: { author: true, title: true, url: true },
      },
    },
  });
};
