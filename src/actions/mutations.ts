"use server";
import db from "@/db/db";
import {
  categories as CATEGORIES,
  channels as CHANNELS,
  servers as SERVERS,
  systems as SYSTEMS,
} from "@/db/schema";
import { generateId } from "@/lib/utils";

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
