"use server";
// TODOS:
/**
 * 1. Create Category under Server
 * 2. Create Channel with TYPES under Server of a Category
 * 3. Delete Channel
 * 4. Edit Channel
 * 5. Edit Category
 * 6. Delete Category
 */

import { generateId } from "@/lib/utils";
import db from "@/db/db";
import {
  categories as CATEGORIES,
  channels as CHANNELS,
  serverMembers as MEMBERS,
  servers as SERVER,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { isAdmin, isModerator } from "../base";
import { ChannelEnum, ChannelType } from "@/types";
import { User } from "better-auth";

// Server Mutations
/**
 * Creates a new category under a server.
 *
 * @param serverId The ID of the server to create the category under.
 * @param name The name of the category.
 * @returns An object with a `success` property and a `categoryId` property if successful. If the operation fails, the `success` property is `false` and an `error` property is provided.
 */
export async function createCategoryAction(
  userId: string,
  serverId: string,
  name: string,
) {
  try {
    if (!serverId) {
      return { success: false, error: "Server ID is required" };
    }
    // He has to be admin or moderator
    if (!isModerator(userId, serverId) || !isAdmin(userId, serverId)) {
      return { success: false, error: "User is not an admin or moderator" };
    }

    const categoryId = generateId("category");
    await db.insert(CATEGORIES).values({
      id: categoryId,
      name,
      serverId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { success: true, categoryId };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function editCategoryAction(
  userId: string,
  serverId: string,
  categoryId: string,
  name: string,
) {
  try {
    if (!serverId) {
      return { success: false, error: "Server ID is required" };
    }

    if (!categoryId) {
      return { success: false, error: "Category ID is required" };
    }

    // He has to be admin or moderator
    if (!isModerator(userId, serverId) || !isAdmin(userId, serverId)) {
      return { success: false, error: "User is not an admin or moderator" };
    }
    // Main Logic 🧠
    await db.update(CATEGORIES).set({
      name,
      updatedAt: new Date(),
    }).where(eq(CATEGORIES.id, categoryId));
    return { success: true, categoryId };
  } catch (error) {
    console.error("Failed to edit category:", error);
    return { success: false, error: "Failed to edit category" };
  }
}

// Channel
export const createChannelAction = async (
  userId: string,
  serverId: string,
  categoryId: string,
  name: string,
  type: ChannelEnum,
) => {
  if (!serverId) {
    return { success: false, error: "Server ID is required" };
  }

  if (!categoryId) {
    return { success: false, error: "Category ID is required" };
  }

  if (!name) {
    return { success: false, error: "Channel name is required" };
  }

  if (!type) {
    return { success: false, error: "Channel type is required" };
  }

  // He has to be admin or moderator
  if (!isModerator(userId, serverId) || !isAdmin(userId, serverId)) {
    return { success: false, error: "User is not an admin or moderator" };
  }

  const channelId = generateId("channel");
  await db.insert(CHANNELS).values({
    id: channelId,
    name,
    description: null,
    serverId,
    categoryId,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { success: true, channelId };
};

export const mutateChannelAction = async (
  userId: string,
  data: ChannelType,
) => {
  try {
    if (!data.id) {
      return { success: false, error: "Channel ID is required" };
    }

    if (!data.name) {
      return { success: false, error: "Channel name is required" };
    }

    if (!data.type) {
      return { success: false, error: "Channel type is required" };
    }

    if (!data.categoryId) {
      return { success: false, error: "Category ID is required" };
    }

    // He has to be admin or moderator
    if (
      !isModerator(userId, data.serverId) || !isAdmin(userId, data.serverId)
    ) {
      return { success: false, error: "User is not an admin or moderator" };
    }

    // Main Logic 🧠
    await db.update(CHANNELS).set({
      name: data.name,
      description: data.description,
      type: data.type,
      updatedAt: new Date(),
      categoryId: data.categoryId,
    }).where(eq(CHANNELS.id, data.id));
    return { success: true, channelId: data.id };
  } catch (error) {
    console.error("Failed to mutate channel:", error);
    return { success: false, error: "Failed to mutate channel" };
  }
};

export const generateNewServerInviteCode = async (
  serverId: string,
  userId: string,
) => {
  // isModerator or isAdmin
  if (!isModerator(userId, serverId) && !isAdmin(userId, serverId)) {
    return { success: false, error: "User is not an admin or moderator" };
  }

  const inviteCode = generateId("invite", 6);
  // update DB
  await db.update(SERVER).set({
    inviteCode,
    updatedAt: new Date(),
  }).where(eq(SERVER.id, serverId));
  return { success: true, inviteCode };
};

export const deleteServerAction = async () => {};

export const acceptUserByInviteCodeAction = async (
  user: User,
  inviteCode: string,
  serverId: string,
) => {
  // Main Logic 🧠

  const alreadyJoined = await db.select().from(MEMBERS).where(
    and(
      eq(MEMBERS.userId, user.id),
      eq(MEMBERS.serverId, serverId),
    ),
  );

  if (alreadyJoined.length > 0) {
    return { success: false, error: "User is already a member of this server" };
  }

  const member = await db.insert(MEMBERS).values({
    id: generateId("member"),
    userId: user.id,
    serverId,
    role: "member",
    nickname: user.name,
    joinedAt: new Date(),
  }).returning();

  return { success: true, member };
};
