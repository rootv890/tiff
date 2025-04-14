"use server";
import db from "@/db/db";
import {
  categories as CATEGORIES,
  channels as CHANNELS,
  serverMembers as SERVER_MEMBERS,
  servers as SERVERS,
  systems as SYSTEMS,
  user as USER,
} from "@/db/schema";
import { generateId } from "@/lib/utils";
import { and, eq } from "drizzle-orm";

// -------
// servers
// -------

export type CreateServerType = {
  name: string;
  ownerId: string;
  avatar?: string;
  description?: string;
};

export type CreateServerReturnType = {
  success: boolean;
  serverId?: string;
  error?: string;
};

export const createServerAction = async (
  data: CreateServerType,
): Promise<CreateServerReturnType> => {
  try {
    const serverId = generateId("server");

    // Single Owner cannot have same Servername at once

    const duplicateServerName = await db.query.servers.findFirst({
      where: and(
        eq(SERVERS.name, data.name),
        eq(SERVERS.ownerId, data.ownerId),
      ),
    });

    if (duplicateServerName) {
      return {
        success: false,
        error: "Server name already exists",
      };
    }

    const [server] = await db.insert(SERVERS).values({
      name: data.name,
      ownerId: data.ownerId,
      boostCount: 0,
      banner: "",
      avatar: data.avatar || "",
      isPublic: true,
      inviteCode: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      id: serverId,
    }).returning();

    const owner = await db.query.user.findFirst({
      where: eq(USER.id, data.ownerId),
    });

    if (!owner) {
      return {
        success: false,
        error: "Owner not found",
      };
    }

    // add owner to serverMembers
    await db.insert(SERVER_MEMBERS).values({
      id: generateId("member"),
      userId: data.ownerId,
      serverId: serverId,
      nickname: owner.name,
      joinedAt: new Date(),
    }).returning();

    // create system
    const [systemCategory] = await db.insert(CATEGORIES).values({
      id: generateId("category"),
      serverId: serverId,
      name: "System",
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    const [systemChannel] = await db.insert(CHANNELS).values({
      id: generateId("channel"),
      serverId: serverId,
      name: "general",
      type: "TEXT",
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    const [system] = await db.insert(SYSTEMS).values({
      id: generateId("system"),
      serverId: serverId,
      systemChannelId: systemChannel.id,
      systemCategoryId: systemCategory.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    // create system, category, channels

    return { success: true, serverId };
  } catch (error) {
    console.error("Failed to create server:", error);
    return { success: false, error: "Failed to create server" };
  }
};
