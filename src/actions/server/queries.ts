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

export async function getCategoryById(categoryId: string, userId: string) {
  try {
    const category = await db.query.categories.findFirst({
      where: eq(CATEGORIES.id, categoryId),
      with: {
        channels: true,
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }
    if (!isMember(category.serverId, userId)) {
      return {
        success: false,
        error: "User is not a member of the server",
      };
    }

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error("Failed to get category:", error);
    return {
      success: false,
      error: "Failed to get category",
    };
  }
}
