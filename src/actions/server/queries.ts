"use server";

import { eq } from "drizzle-orm";
import { categories as CATEGORIES } from "@/db/schema";
import db from "@/db/db";
import { isMember } from "../base";

export async function getServerCategories(serverId: string, userId: string) {
  try {
    if (!isMember(serverId, userId)) {
      return {
        success: false,
        error: "User is not a member of the server",
      };
    }

    const data = await db.query.categories.findMany({
      where: eq(CATEGORIES.serverId, serverId),
      with: {
        channels: true,
      },
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Failed to get categories:", error);
    return {
      success: false,
      error: "Failed to get categories",
    };
  }
}
