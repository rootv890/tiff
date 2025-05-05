import db from "@/db/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    // extra fields
    user: {
        modelName: "user",
        additionalFields: {
            username: {
                type: "string",
                required: true,
            },
            acceptTos: {
                type: "boolean",
                required: true,
            },
            status: {
                type: "string",
                required: true,
            },
            pronouns: {
                type: "string",
                required: true,
            },
            bio: {
                type: "string",
                required: true,
            },
            banner: {
                type: "string",
                required: true,
            },
        },
    },
    plugins: [nextCookies()],
});

export type User = typeof auth.$Infer.Session.user;
