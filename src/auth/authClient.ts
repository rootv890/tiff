import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
// import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: env.DATABASE_URL,
    // plugins: [emailOTPClient()],
});

export const { signIn, signUp, useSession, getSession, signOut } = authClient;
