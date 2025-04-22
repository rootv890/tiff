"use server";
import db from "@/db/db";
import {
  categories,
  channels,
  serverMembers,
  servers,
  systems,
} from "@/db/schema";
import { ServerData, ServerType } from "@/types";
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

export const fetchServerById = async (
  serverId: string,
): Promise<ServerData> => {
  const server = await db.query.servers.findFirst({
    where: eq(servers.id, serverId),
    with: {
      members: true,
      owner: true,
      system: true,
      categories: {
        with: {
          channels: true,
        },
      },
    },
  });
  return {
    success: true,
    server: server as unknown as ServerType,
  };
};
