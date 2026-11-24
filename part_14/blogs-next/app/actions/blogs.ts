"use server";

import { revalidatePath } from "next/cache";
import { addBlog, likeBlog } from "../services/blogs";
import type { BlogFormState } from "../blogs/new/state";

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: BlogFormState["errors"] = {};

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long";
  }
  if (!url || url.length < 5) {
    errors.url = "Url must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } };
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  return { errors: {}, success: true };
};

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
