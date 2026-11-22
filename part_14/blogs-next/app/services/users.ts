import { asc } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const getUsers = async () => {
  return db.query.users.findMany({
    orderBy: asc(users.id),
  });
};
