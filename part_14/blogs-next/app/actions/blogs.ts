"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, getBlogById, likeBlog } from "../services/blogs";
import { addToReadingList, markAsRead } from "../services/readingList";
import { getCurrentUser } from "../services/session";
import type { BlogFormState } from "../blogs/new/state";

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

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

  await addBlog(title, author, url, user.id);

  revalidatePath("/blogs");
  revalidatePath("/me");
  return { errors: {}, success: true };
};

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};

export const addToReadingListAction = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const blogId = Number(formData.get("blogId"));
  const blog = await getBlogById(blogId);
  if (!blog || blog.userId === user.id) {
    return;
  }

  await addToReadingList(user.id, blogId);
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
};

export const markAsReadAction = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const entryId = Number(formData.get("entryId"));
  await markAsRead(user.id, entryId);
  revalidatePath("/me");
};
