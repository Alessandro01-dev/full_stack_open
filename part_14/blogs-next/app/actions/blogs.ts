"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, likeBlog } from "../services/blogs";

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long" };
  }
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 characters long" };
  }
  if (!url || url.length < 5) {
    return { error: "Url must be at least 5 characters long" };
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
