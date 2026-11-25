import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">{user.name}</h2>
      <h3 className="mb-2 text-lg font-semibold">Blogs</h3>
      <ul className="space-y-2">
        {user.blogs.map((blog) => (
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

export default UserPage;
