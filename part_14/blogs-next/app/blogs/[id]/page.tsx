import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { likeBlogAction } from "../../actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">{blog.title}</h2>
      <div className="space-y-2 rounded border p-4">
        <p>
          <span className="font-semibold">Author:</span> {blog.author}
        </p>
        <p>
          <span className="font-semibold">Url:</span>{" "}
          <a href={blog.url} className="text-blue-500 hover:underline">
            {blog.url}
          </a>
        </p>
        <p>
          <span className="font-semibold">Likes:</span> {blog.likes}
        </p>
        <form action={likeBlogAction} className="pt-2">
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            like
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPage;
