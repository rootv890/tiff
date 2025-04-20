"use server";
import { auth } from "@/auth/auth"; // path to your Better Auth server instance
import { SignInWithEmailType, SignUpWithEmailSchemaType } from "@/types";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

// get session
export const session = async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
};

// sign in
export const signInWithEmail = async ({
    email,
    password,
}: SignInWithEmailType) => {
    try {
        return await auth.api.signInEmail({
            body: {
                email,
                password,
            },

            headers: await headers(),
            // asResponse: true,
        });
    } catch (error) {
        if (error instanceof APIError) {
            console.log(error.message, error.status);
        }
        throw error;
    }
};

// sign up
export const signUpWithEmail = async (data: SignUpWithEmailSchemaType) => {
    console.log("signing up with email", data);
    try {
        // Extract only the fields we need and ensure they match the expected types
        const requiredData = {
            // Required fields from the first intersection type
            name: data.name,
            email: data.email,
            password: data.password,

            // Required fields from the second intersection type
            username: data.username,
            pronouns: data.pronouns ?? "", // Ensure it's a string
            bio: data.bio ?? "", // Ensure it's a string
            banner: typeof data.banner === "string"
                ? data.banner
                : JSON.stringify(
                    data.banner ?? { type: "solid", color: "#5865f2" },
                ),
            status: data.status ?? "online",
            acceptTos: data.acceptTos === true,
        };

        return await auth.api.signUpEmail({
            body: requiredData,
            headers: await headers(),
        });
    } catch (error) {
        if (error instanceof APIError) {
            console.log(error.message, error.status);
        }
        throw error;
    }
};

// sign out
export const signOut = async () => {
    try {
        return await auth.api.signOut({
            headers: await headers(),
        });
    } catch (error) {
        if (error instanceof APIError) {
            console.log(error.message, error.status);
        }
        throw error;
    }
};

//  get Session

export const getSession = async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
};
