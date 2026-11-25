import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs();
  const blogs = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : allBlogs;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Blogs</h2>
      <form action="/blogs" className="mb-4 flex items-center gap-2">
        <input
          type="text"
          name="filter"
          placeholder="search by title"
          defaultValue={filter ?? ""}
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          search
        </button>
      </form>
      {filter && (
        <div className="mb-4">
          <Link href="/blogs" className="text-blue-500 hover:underline">
            clear filter
          </Link>
        </div>
      )}
      <ul className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="rounded border p-3 hover:bg-gray-500/10">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-500 hover:underline"
            >
              {blog.title}
            </Link>
            <span className="ml-2 text-sm text-gray-500">
              by {blog.author}, {blog.likes} likes
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
