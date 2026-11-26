import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { getReadingList } from "../services/readingList";
import { generateToken } from "../actions/users";

const MePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(user.id);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">My page</h2>
      <div className="space-y-2 rounded border p-4">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Username:</span> {user.username}
        </p>
      </div>

      <h3 className="mb-2 mt-6 text-lg font-semibold">API token</h3>
      {user.token ? (
        <p className="mb-4 break-all rounded border p-3 font-mono text-sm">
          {user.token}
        </p>
      ) : (
        <p className="mb-4 text-gray-500">No token generated yet.</p>
      )}
      <form action={generateToken}>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          {user.token ? "Generate new token" : "Generate token"}
        </button>
      </form>

      <h3 className="mb-2 mt-6 text-lg font-semibold">Reading list</h3>
      {readingList.length === 0 ? (
        <p className="text-gray-500">Your reading list is empty.</p>
      ) : (
        <ul className="space-y-2">
          {readingList.map((entry) => (
            <li
              key={entry.id}
              className="rounded border p-3 hover:bg-gray-500/10"
            >
              <Link
                href={`/blogs/${entry.blog.id}`}
                className="text-blue-500 hover:underline"
              >
                {entry.blog.title}
              </Link>
              <span className="ml-2 text-sm text-gray-500">
                by {entry.blog.author} · {entry.read ? "read" : "not read yet"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MePage;
