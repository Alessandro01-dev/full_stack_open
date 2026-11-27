import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import { getReadingList } from "../services/readingList";
import { generateToken } from "../actions/users";
import { markAsReadAction } from "../actions/blogs";

const MePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const readingList = await getReadingList(user.id);
  const unread = readingList.filter((entry) => !entry.read);
  const read = readingList.filter((entry) => entry.read);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">My page</h2>
      <div data-testid="user-profile" className="space-y-2 rounded border p-4">
        <p data-testid="user-name">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p data-testid="user-username">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
      </div>

      <section data-testid="api-token-section">
        <h3 className="mb-2 mt-6 text-lg font-semibold">API token</h3>
        {user.token ? (
          <div data-testid="token-display" className="mb-4 rounded border p-3">
            <code
              data-testid="api-token"
              className="break-all font-mono text-sm"
            >
              {user.token}
            </code>
          </div>
        ) : (
          <p data-testid="no-token-message" className="mb-4 text-gray-500">
            No token generated yet.
          </p>
        )}
        <form action={generateToken}>
          <button
            type="submit"
            data-testid="generate-token-button"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            {user.token ? "Generate new token" : "Generate token"}
          </button>
        </form>
      </section>

      <section data-testid="reading-list-section">
        <h3 className="mb-2 mt-6 text-lg font-semibold">Reading list</h3>
        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-gray-500">
            Your reading list is empty.
          </p>
        ) : (
          <>
            <div data-testid="unread-section">
              <h4 className="mb-2 mt-4 font-semibold">
                Unread ({unread.length})
              </h4>
              {unread.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-gray-500">
                  No unread blogs.
                </p>
              ) : (
                <ul className="space-y-2">
                  {unread.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between gap-4 rounded border p-3 hover:bg-gray-500/10"
                    >
                      <div>
                        <Link
                          href={`/blogs/${entry.blog.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {entry.blog.title}
                        </Link>
                        <span className="ml-2 text-sm text-gray-500">
                          by {entry.blog.author}
                        </span>
                      </div>
                      <form action={markAsReadAction}>
                        <input type="hidden" name="entryId" value={entry.id} />
                        <button
                          type="submit"
                          data-testid={`mark-read-${entry.id}`}
                          className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-500"
                        >
                          mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div data-testid="read-section">
              <h4 className="mb-2 mt-6 font-semibold">Read ({read.length})</h4>
              {read.length === 0 ? (
                <p className="text-gray-500">No read blogs yet.</p>
              ) : (
                <ul className="space-y-2">
                  {read.map((entry) => (
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
                        by {entry.blog.author}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default MePage;
