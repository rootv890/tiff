import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db/db";
import * as schema from "@/db/schema";
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
    },
  },
  plugins: [nextCookies()],
});
