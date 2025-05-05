"use server";
import { auth } from "@/auth/auth";
import db from "@/db/db";
import {
  categories,
  channels,
  serverMembers,
  servers,
  systems,
} from "@/db/schema";
import { ServerData, ServerType } from "@/types";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

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
  // check if the user is a member of the server
  const session = await auth.api.getSession(
    {
      headers: await headers(),
    },
  );
  if (!session) {
    return {
      success: false,
      server: null,
      error: "User is not authenticated",
    };
  }
  const isMember = await db.query.serverMembers.findFirst({
    where: and(
      eq(serverMembers.serverId, serverId),
      eq(serverMembers.userId, session.user.id),
    ),
  });

  if (!isMember) {
    return {
      success: false,
      server: null,
      error: "User is not a member of the server",
    };
  }

  const server = await db.query.servers.findFirst({
    where: eq(servers.id, serverId),
    with: {
      members: {
        with: {
          user: true,
        },
      },
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
