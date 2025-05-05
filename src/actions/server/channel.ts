"use server";
import db from "@/db/db";
import { channels } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getChannelById(channelId: string) {
  if (!channelId) {
    return {
      success: false,
      error: "Channel ID is required.",
    };
  }

  const channel = await db.query.channels.findFirst({
    where: eq(channels.id, channelId),
    with: {
      server: true,
      // messages: true,
    },
  });

  return {
    success: true,
    data: channel,
  };
}

export async function deleteChannelById(channelId: string) {
  if (!channelId) {
    return {
      success: false,
      error: "Channel ID is required.",
    };
  }

  const deleted = await db.delete(channels).where(
    eq(channels.id, channelId),
  ).returning();

  return {
    success: true,
    data: deleted,
  };
}
