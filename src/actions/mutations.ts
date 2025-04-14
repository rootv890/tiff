"use server";
import db from "@/db/db";
import { servers as SERVERS } from "@/db/schema";
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
    await db.insert(SERVERS).values({
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
    });

    return { success: true, serverId };
  } catch (error) {
    console.error("Failed to create server:", error);
    return { success: false, error: "Failed to create server" };
  }
};
