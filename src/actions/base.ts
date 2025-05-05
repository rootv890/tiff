import { and, eq } from "drizzle-orm";
import db from "@/db/db";
import { memberRoles, serverMembers, servers } from "@/db/schema";

/**
 * Fetches a server member based on the given user ID and server ID.
 *
 * @param userId - The ID of the user.
 * @param serverId - The ID of the server.
 * @returns A promise that resolves to a server member if found, otherwise null.
 */
const getServerMember = async (userId: string, serverId: string) => {
  return db.query.serverMembers.findFirst({
    where: and(
      eq(serverMembers.userId, userId),
      eq(serverMembers.serverId, serverId),
    ),
  });
};

/**
 * Fetches all roleIds for a given memberId.
 *
 * @param memberId - The ID of the member.
 * @returns A promise that resolves to an array of roleIds.
 */
const getRoleIdsForMember = async (memberId: string) => {
  const roles = await db.query.memberRoles.findMany({
    where: eq(memberRoles.memberId, memberId),
    with: { role: true },
  });

  return roles.map((r) => r.roleId);
};

/**
 * Checks if a user is the owner of the server.
 *
 * @param userId - The ID of the user.
 * @param serverId - The ID of the server.
 * @returns A promise that resolves to a boolean indicating whether the user is the owner.
 */
export const isOwner = async (userId: string, serverId: string) => {
  const server = await db.query.servers.findFirst({
    where: and(
      eq(servers.id, serverId),
      eq(servers.ownerId, userId),
    ),
  });
  return !!server;
};

/**
 * Checks if a user has a specific role in the server.
 *
 * @param userId - The ID of the user.
 * @param serverId - The ID of the server.
 * @param targetRole - The role to check for.
 * @returns A promise that resolves to a boolean indicating whether the user has the role.
 */
const hasRole = async (
  userId: string,
  serverId: string,
  targetRole: string,
) => {
  // Owner has all the powers
  const isOwnerUser = await isOwner(userId, serverId);
  if (
    isOwnerUser &&
    (targetRole === "ADMIN" || targetRole === "MODERATOR" ||
      targetRole === "MEMBER")
  ) {
    return true;
  }
  const member = await getServerMember(userId, serverId);
  if (!member) return false;

  const roleIds = await getRoleIdsForMember(member.id);
  return roleIds.includes(targetRole);
};

/**
 * Checks if user is admin of the server.
 *
 * @param userId - The ID of the user.
 * @param serverId - The ID of the server.
 * @returns A promise that resolves to a boolean indicating whether the user is an admin.
 */
export const isAdmin = (userId: string, serverId: string) =>
  hasRole(userId, serverId, "ADMIN");

/**
 * Checks if user is moderator of the server.
 *
 * @param userId - The ID of the user.
 * @param serverId - The ID of the server.
 * @returns A promise that resolves to a boolean indicating whether the user is a moderator.
 */
export const isModerator = (userId: string, serverId: string) =>
  hasRole(userId, serverId, "MODERATOR");

/**
 * Checks if user is a member of the server.
 *
 * @param userId - The ID of the user.
 * @param serverId - The ID of the server.
 * @returns A promise that resolves to a boolean indicating whether the user is a member.
 */
export const isMember = async (userId: string, serverId: string) => {
  const member = await getServerMember(userId, serverId);
  return !!member;
};
