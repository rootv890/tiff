import { relations } from "drizzle-orm";
import {
    AnyPgColumn,
    boolean,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    primaryKey,
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

// ROLE ENUM
export const roleEnum = pgEnum("role", ["owner", "admin", "member"]);

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
    role: roleEnum("role").notNull(),
    nickname: text("nickname"),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
    // updatedAt: timestamp("updated_at").notNull().defaultNow(),
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

export const categoryRelations = relations(categories, ({ one, many }) => ({
    server: one(servers, {
        fields: [categories.serverId],
        references: [servers.id],
    }),
    channels: many(channels),
}));

export const channelEnums = pgEnum("channel_type", [
    "TEXT",
    "VOICE",
    "ANNOUNCEMENT",
    "VIDEO",
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
    categoryId: text("category_id")
        .notNull()
        .references(() => categories.id, {
            onDelete: "cascade",
        }),
    type: channelEnums("type").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const channelRelations = relations(channels, ({ one }) => ({
    server: one(servers, {
        fields: [channels.serverId],
        references: [servers.id],
    }),
    category: one(categories, {
        fields: [channels.categoryId],
        references: [categories.id],
    }),
}));

export const notificationLevel = pgEnum("notification_level", [
    "ALL",
    "MENTION",
    "NONE",
]);

export const userConfiguration = pgTable("user_configuration", {
    id: text("id").primaryKey(),
    configVersion: integer("config_version").notNull().default(1),
    userId: text("user_id").notNull().references(() => user.id, {
        onDelete: "cascade",
    }),
    serverId: text("server_id").notNull().references(() => servers.id, {
        onDelete: "cascade",
    }),
    mute: boolean("mute").default(false),
    hide: boolean("hide").default(false),
    fontSize: integer("font_size").default(14),
    theme: text("theme").default("light"),
    pinnedChannels: jsonb("pinned_channels").default([]),
    // TODO  "starredMessages"
    // starredMessages: jsonb("starred_messages").default([]),
    notificationLevel: notificationLevel("notification_level").default("ALL"),
    lastSeen: timestamp("last_seen").notNull().defaultNow(),
    betaFeatures: boolean("beta_features").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userConfigurationRelations = relations(
    userConfiguration,
    ({ one }) => ({
        user: one(user, {
            fields: [userConfiguration.userId],
            references: [user.id],
        }),
        server: one(servers, {
            fields: [userConfiguration.serverId],
            references: [servers.id],
        }),
    }),
);

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

// --------------
// Message , Attachment, Reactions, Pins and Starred Messages
// --------------
export const messages = pgTable("messages", {
    id: text("id").primaryKey().notNull(),
    channelId: text("channel_id")
        .notNull()
        .references(() => channels.id, {
            onDelete: "cascade",
        }),
    authorId: text("author_id")
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
    content: text("content"),
    replyToId: text("reply_to_id").references((): AnyPgColumn => messages.id),
    isEdited: boolean("is_edited").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
});
export const attachmentsType = pgEnum("type", [
    "image",
    "video",
    "audio",
    "file",
]);
export const attachments = pgTable("attachments", {
    id: text("id").primaryKey().notNull(),
    messageId: text("message_id")
        .notNull()
        .references(() => messages.id, {
            onDelete: "cascade",
        }),
    url: text("url").notNull(),
    publicId: text("public_id").notNull(),
    type: attachmentsType("type").notNull(),
    width: integer("width"),
    height: integer("height"),
    format: text("format"),
    size: integer("size"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
});
export const messageReactions = pgTable("message_reactions", {
    messageId: text("message_id").notNull().references(() => messages.id, {
        onDelete: "cascade",
    }),
    userId: text("user_id").notNull().references(() => user.id, {
        onDelete: "cascade",
    }),
    emoji: text("emoji").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
}, (table) => [
    {
        pk: primaryKey({
            columns: [table.messageId, table.userId, table.emoji],
        }),
    },
]);
export const messageMentions = pgTable("message_mentions", {
    messageId: text("message_id")
        .notNull()
        .references(() => messages.id, {
            onDelete: "cascade",
        }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
}, (table) => [
    {
        pk: primaryKey({ columns: [table.messageId, table.userId] }),
    },
]);
export const messageEdits = pgTable("message_edits", {
    messageId: text("message_id")
        .notNull()
        .references(() => messages.id, {
            onDelete: "cascade",
        }),
    editorId: text("editor_id")
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
    oldContent: text("old_content").notNull(),
    newContent: text("new_content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
}, (table) => [
    {
        pk: primaryKey({ columns: [table.messageId, table.editorId] }),
    },
]);
export const messagePins = pgTable("message_pins", {
    messageId: text("message_id")
        .notNull()
        .references(() => messages.id, {
            onDelete: "cascade",
        }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
}, (table) => [
    {
        pk: primaryKey({ columns: [table.messageId] }),
    },
]);
export const messageStarred = pgTable("message_starred", {
    messageId: text("message_id")
        .notNull()
        .references(() => messages.id, {
            onDelete: "cascade",
        }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
        }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
}, (table) => [
    {
        pk: primaryKey({ columns: [table.messageId, table.userId] }),
    },
]);

// Relations

export const messageRelations = relations(messages, ({ one, many }) => ({
    author: one(user, {
        fields: [messages.authorId],
        references: [user.id],
    }),
    channel: one(channels, {
        fields: [messages.channelId],
        references: [channels.id],
    }),
    attachments: many(attachments),
    reactions: many(messageReactions),
    mentions: many(messageMentions),
    edits: many(messageEdits),
    pins: many(messagePins),
    starred: many(messageStarred),
}));

export const attachmentsRelations = relations(attachments, ({ one }) => ({
    message: one(messages, {
        fields: [attachments.messageId],
        references: [messages.id],
    }),
}));

export const messageReactionRelations = relations(
    messageReactions,
    ({ one }) => ({
        message: one(messages, {
            fields: [messageReactions.messageId],
            references: [messages.id],
        }),
        user: one(user, {
            fields: [messageReactions.userId],
            references: [user.id],
        }),
    }),
);

export const messageMentionRelations = relations(
    messageMentions,
    ({ one }) => ({
        message: one(messages, {
            fields: [messageMentions.messageId],
            references: [messages.id],
        }),
        user: one(user, {
            fields: [messageMentions.userId],
            references: [user.id],
        }),
    }),
);

export const messageEditRelations = relations(messageEdits, ({ one }) => ({
    message: one(messages, {
        fields: [messageEdits.messageId],
        references: [messages.id],
    }),
    editor: one(user, {
        fields: [messageEdits.editorId],
        references: [user.id],
    }),
}));

export const messagePinRelations = relations(messagePins, ({ one }) => ({
    message: one(messages, {
        fields: [messagePins.messageId],
        references: [messages.id],
    }),
}));

export const messageStarRelations = relations(messageStarred, ({ one }) => ({
    message: one(messages, {
        fields: [messageStarred.messageId],
        references: [messages.id],
    }),
    user: one(user, {
        fields: [messageStarred.userId],
        references: [user.id],
    }),
}));

export const createMessageSchema = createInsertSchema(messages);
export const updateMessageSchema = createUpdateSchema(messages);
export const selectMessageSchema = createSelectSchema(messages);

export const createAttachmentsSchema = createInsertSchema(attachments);
export const updateAttachmentsSchema = createUpdateSchema(attachments);
export const selectAttachmentsSchema = createSelectSchema(attachments);

export const createMessageEditSchema = createInsertSchema(messageEdits);
export const updateMessageEditSchema = createUpdateSchema(messageEdits);
export const selectMessageEditSchema = createSelectSchema(messageEdits);

export const createMessageMentionSchema = createInsertSchema(messageMentions);
export const updateMessageMentionSchema = createUpdateSchema(messageMentions);
export const selectMessageMentionSchema = createSelectSchema(messageMentions);

export const createMessageReactionSchema = createInsertSchema(messageReactions);
export const updateMessageReactionSchema = createUpdateSchema(messageReactions);
export const selectMessageReactionSchema = createSelectSchema(messageReactions);

export const createMessagePinSchema = createInsertSchema(messagePins);
export const updateMessagePinSchema = createUpdateSchema(messagePins);
export const selectMessagePinSchema = createSelectSchema(messagePins);

export const createMessageStarSchema = createInsertSchema(messageStarred);
export const updateMessageStarSchema = createUpdateSchema(messageStarred);
export const selectMessageStarSchema = createSelectSchema(messageStarred);
