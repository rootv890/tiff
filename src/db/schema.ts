import { relations } from "drizzle-orm";
import {
    boolean,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";

/**
 * Better Auth
 */
export const userStatusEnum = pgEnum("status", [
    "online",
    "idle",
    "dnd",
    "offline",
]);

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    pronouns: text("pronouns").default(""),
    bio: text("bio").default(""),
    // banner can be color or url
    banner: jsonb("banner").default({
        type: "solid",
        color: "#5865f2",
        url: "",
        gradient: {
            from: "#5865f2",
            to: "#3d48b9",
            angle: 135,
        },
    }),
    status: userStatusEnum("status").default("online"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    acceptTos: boolean("accept_tos").notNull(),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});

// ------------------
// TIFF CORE TABLES
// ------------------

export const servers = pgTable("servers", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    ownerId: text("owner_id")
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
    isPublic: boolean("is_public").default(true),
    inviteCode: text("invite_code"),
    banner: jsonb("banner").default({
        type: "solid",
        color: "#5865f2",
        url: "",
        gradient: {
            from: "#5865f2",
            to: "#3d48b9",
            angle: 135,
        },
    }),
    boostCount: integer("boost_count").default(0),
    avatar: text("avatar"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const serverRelations = relations(servers, ({ many, one }) => ({
    system: one(systems, {
        fields: [servers.id],
        references: [systems.serverId],
    }),
    channels: many(channels),
    categories: many(categories),
    roles: many(serverRoles),
    members: many(serverMembers),
    owner: one(user, {
        fields: [servers.ownerId],
        references: [user.id],
    }),
}));

export const systems = pgTable("systems", {
    id: text("id").primaryKey(),
    serverId: text("server_id")
        .notNull()
        .references(() => servers.id, {
            onDelete: "cascade",
        }),
    systemChannelId: text("system_channel")
        .notNull()
        .references(() => channels.id, { onDelete: "cascade" }),
    systemCategoryId: text("system_category")
        .notNull()
        .references(() => categories.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ------------------
// ROLES + MEMBERS
// ------------------

export const serverRoles = pgTable("server_roles", {
    id: text("id").primaryKey(),
    serverId: text("server_id")
        .notNull()
        .references(() => servers.id, {
            onDelete: "cascade",
        }),
    name: text("name").notNull(),
    permissions: text("permissions").notNull(), // or use JSON if you prefer
    color: text("color"),
    position: integer("position"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const serverMembers = pgTable("server_members", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
    serverId: text("server_id")
        .notNull()
        .references(() => servers.id, {
            onDelete: "cascade",
        }),
    nickname: text("nickname"),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const serverMembersRelations = relations(
    serverMembers,
    ({ one }) => ({
        server: one(servers, {
            relationName: "joinedServer",
            fields: [serverMembers.serverId],
            references: [servers.id],
        }),
        user: one(user, {
            fields: [serverMembers.userId],
            references: [user.id],
        }),
    }),
);

export const memberRoles = pgTable("member_roles", {
    id: text("id").primaryKey(),
    memberId: text("member_id")
        .notNull()
        .references(() => serverMembers.id, {
            onDelete: "cascade",
        }),
    roleId: text("role_id")
        .notNull()
        .references(() => serverRoles.id, {
            onDelete: "cascade",
        }),
});

// ------------------
// CATEGORIES + CHANNELS
// ------------------

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    serverId: text("server_id")
        .notNull()
        .references(() => servers.id, {
            onDelete: "cascade",
        }),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const categoryChannels = pgTable("category_channels", {
    id: text("id").primaryKey(),
    categoryId: text("category_id")
        .notNull()
        .references(() => categories.id, {
            onDelete: "cascade",
        }),
    channelId: text("channel_id")
        .notNull()
        .references(() => channels.id, {
            onDelete: "cascade",
        }),
    position: integer("position").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoryRelations = relations(categories, ({ one, many }) => ({
    server: one(servers, {
        fields: [categories.serverId],
        references: [servers.id],
    }),
    channels: many(categoryChannels),
}));

export const channelEnums = pgEnum("channel_type", [
    "TEXT",
    "VOICE",
    "ANNOUNCEMENT",
]);

export const channels = pgTable("channels", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    serverId: text("server_id")
        .notNull()
        .references(() => servers.id, {
            onDelete: "cascade",
        }),
    type: channelEnums("type").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

// positions usees
/* 🛠 Why Use It?
Drag & drop support ✅
 UI order consistent? ✅
 queries ✅
 pagination? ✅
 */

// --------------
// SCHEMAS
// --------------
// servers
export const createServerSchema = createInsertSchema(servers);
export const updateServerSchema = createUpdateSchema(servers);
export const selectServerSchema = createSelectSchema(servers);

// categories
export const createCategorySchema = createInsertSchema(categories);
export const updateCategorySchema = createUpdateSchema(categories);
export const selectCategorySchema = createSelectSchema(categories);

// channels
export const createChannelSchema = createInsertSchema(channels);
export const updateChannelSchema = createUpdateSchema(channels);
export const selectChannelSchema = createSelectSchema(channels);

// category_channels
export const createCategoryChannelSchema = createInsertSchema(categoryChannels);
export const updateCategoryChannelSchema = createUpdateSchema(categoryChannels);
export const selectCategoryChannelSchema = createSelectSchema(categoryChannels);

// server_roles
export const createServerRoleSchema = createInsertSchema(serverRoles);
export const updateServerRoleSchema = createUpdateSchema(serverRoles);
export const selectServerRoleSchema = createSelectSchema(serverRoles);

// server_members
export const createServerMemberSchema = createInsertSchema(serverMembers);
export const updateServerMemberSchema = createUpdateSchema(serverMembers);
export const selectServerMemberSchema = createSelectSchema(serverMembers);

// member_roles
export const createMemberRoleSchema = createInsertSchema(memberRoles);
export const updateMemberRoleSchema = createUpdateSchema(memberRoles);
export const selectMemberRoleSchema = createSelectSchema(memberRoles);
