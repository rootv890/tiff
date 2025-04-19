import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { selectServerSchema, user } from "./db/schema";

export enum ModalOpenType {
    CREATE_SERVER = "CREATE_SERVER",
    EDIT_SERVER = "EDIT_SERVER",
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
};
