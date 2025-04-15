"use server";
import db from "@/db/db";
import { serverMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

// fetch all servers
export const fetchAllServers = async (userId: string) => {
  const servers = await db.query.serverMembers.findMany({
    where: eq(serverMembers.userId, userId),
    with: {
      server: true, // this now works because of the one() fix
    },
    orderBy: (serverMembers, { desc }) => [desc(serverMembers.joinedAt)],
  });
  return {
    success: true,
    servers: servers.map((server) => ({
      ...server.server,
      joinedAt: server.joinedAt,
    })),
  };
};
