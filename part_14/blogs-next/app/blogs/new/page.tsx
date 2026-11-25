"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "../../actions/blogs";
import { useNotification } from "../../components/NotificationContext";
import type { BlogFormState } from "./state";

const initialState: BlogFormState = { errors: {} };

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block">
            <span className="mb-1 block font-medium">Title</span>
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              className="w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.title && (
            <p className="mt-1 text-sm text-red-500">{state.errors.title}</p>
          )}
        </div>
        <div>
          <label className="block">
            <span className="mb-1 block font-medium">Author</span>
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              className="w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.author && (
            <p className="mt-1 text-sm text-red-500">{state.errors.author}</p>
          )}
        </div>
        <div>
          <label className="block">
            <span className="mb-1 block font-medium">Url</span>
            <input
              type="url"
              name="url"
              defaultValue={state.values?.url}
              className="w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.url && (
            <p className="mt-1 text-sm text-red-500">{state.errors.url}</p>
          )}
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
