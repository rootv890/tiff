import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import {
    createChannelSchema,
    selectCategorySchema,
    selectChannelSchema,
    selectServerSchema,
    user,
} from "./db/schema";
import { User } from "./auth/auth";

export enum ModalOpenType {
    CREATE_SERVER = "CREATE_SERVER",
    EDIT_SERVER = "EDIT_SERVER",
    CREATE_CATEGORY = "CREATE_CATEGORY",
    EDIT_CATEGORY = "EDIT_CATEGORY",
    // Channel
    CREATE_CHANNEL = "CREATE_CHANNEL",
    EDIT_CHANNEL = "EDIT_CHANNEL",
    DELETE_CHANNEL = "DELETE_CHANNEL",
    // Invite
    INVITE_TO_SERVER = "INVITE_TO_SERVER",
}

// sign in
export type SignInWithEmailType = {
    email: string;
    password: string;
};

// sign up

export const SignUpWithEmailSchema = createInsertSchema(user).extend({
    password: z.string().min(8),
    acceptTos: z.literal(true, {
        errorMap: () => ({
            message: "You must accept the Terms of Service",
        }),
    }),
});
export type SignUpWithEmailSchemaType = z.infer<typeof SignUpWithEmailSchema>;

// Banners
export type BannerTypeEnum = "solid" | "gradient" | "image";

export interface BannerType {
    type: BannerTypeEnum;
    color?: string;
    url?: string;
    gradient?: {
        from: string;
        to: string;
        angle: number;
    };
}

export type ServerType = Omit<z.infer<typeof selectServerSchema>, "banner"> & {
    joinedAt: Date | string;
    banner: BannerType;
    categories: CategoryType[];
    members: MemberType[];
};
export type ServerData = {
    success: boolean;
    server: ServerType;
};

export type CategoryType = z.infer<typeof selectCategorySchema> & {
    channels: CategoryChannelType[];
};

// This extends the category channel with information from the related channel
export type CategoryChannelType = z.infer<typeof selectCategorySchema>;

export type RoleType = "owner" | "admin" | "member";

export const createCategorySchema = z.object({
    name: z.string().min(3).max(20),
});
export type CREATE_CATEGORY_SCHEMA = z.infer<typeof createCategorySchema>;
export type CREATE_CHANNEL_SCHEMA = z.infer<typeof createChannelSchema>;
// Channels
export type ChannelType = z.infer<typeof selectChannelSchema>;

export enum ChannelEnum {
    TEXT = "TEXT",
    VOICE = "VOICE",
    VIDEO = "VIDEO",
    ANNOUNCEMENT = "ANNOUNCEMENT",
}

export type MemberType = {
    userId: string;
    role: RoleType;
    user: User;
    id: string;
};
