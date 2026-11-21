import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

export const getBlogs = async () => {
  return db.query.blogs.findMany({
    orderBy: [desc(blogs.likes), asc(blogs.id)],
  });
};

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url });
};

export const getBlogById = async (id: number) => {
  if (!Number.isInteger(id)) {
    return undefined;
  }
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const likeBlog = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};
