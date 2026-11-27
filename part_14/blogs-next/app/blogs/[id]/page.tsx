import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { getCurrentUser } from "../../services/session";
import { isInReadingList } from "../../services/readingList";
import { likeBlogAction, addToReadingListAction } from "../../actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();
  const isOwner = !!user && blog.userId === user.id;
  const inList = user ? await isInReadingList(user.id, blog.id) : false;

  return (
    <div className="mx-auto max-w-2xl p-6" data-testid="blog-detail">
      <h2 className="mb-4 text-2xl font-bold" data-testid="blog-title">
        {blog.title}
      </h2>
      <div className="space-y-2 rounded border p-4">
        <p data-testid="blog-author">
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
        {user && !isOwner && (
          <div className="pt-2">
            {inList ? (
              <p className="text-gray-500">In your reading list</p>
            ) : (
              <form action={addToReadingListAction}>
                <input type="hidden" name="blogId" value={blog.id} />
                <button
                  type="submit"
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
                  data-testid="add-to-reading-list-button"
                >
                  add to reading list
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
