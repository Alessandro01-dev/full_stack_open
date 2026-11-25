import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="rounded border p-3 hover:bg-gray-500/10">
            <Link
              href={`/users/${user.username}`}
              className="text-blue-500 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
