"use client";
import { authClient } from "@/auth/authClient";
import { SignInWithEmailType, SignUpWithEmailSchemaType } from "@/types";
import { APIError } from "better-auth/api";
import { calculateActiveTickIndex } from "recharts/types/util/ChartUtils";
import { toast } from "sonner";

export const signOut = async () => {
    await authClient.signOut({ query: { redirect: "/login" } });
    return;
};

// TODO: Make a custom useSign with react-query using with below function
export const useSignInWithEmail = async ({
    email,
    password,
}: SignInWithEmailType) => {
    try {
        return await authClient.signIn.email({
            email,
            password,
            fetchOptions: {
                onError: (error) => {
                    console.log(error);
                    throw error;
                },
            },
        }, {
            onError: (ctx) => {
                if (ctx.error.status === 403) {
                    toast.error("Please check your credentials");
                }
                toast.error("Failed to sign in");
                throw ctx.error;
            },
        });
    } catch (error) {
        if (error instanceof APIError) {
            console.log(error.message, error.status);
        }
        throw error;
    }
};

export const useSignUpWithEmail = async ({
    name,
    email,
    password,
}: SignUpWithEmailSchemaType) => {
    try {
        return await authClient.signUp.email({
            name,
            email,
            password,

            fetchOptions: {
                onError: (error) => {
                    console.log(error);
                    throw error;
                },
            },
        }, {
            onError: (ctx) => {
                if (ctx.error.status === 403) {
                    toast.error("Please check your credentials");
                }
                toast.error("Failed to sign up");
                throw ctx.error;
            },
        });
    } catch (error) {
        if (error instanceof APIError) {
            console.log(error.message, error.status);
        }
        throw error;
    }
};

// Verification
export const useVerifyEmail = async ({ email }: { email: string }) => {
    try {
        console.log("OTP sent");
        const { data, error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "email-verification", // or "email-verification", "forget-password"
            fetchOptions: {
                onError: (error) => {
                    console.log(error);
                    throw error;
                },
            },
        });
        return { data, error };
    } catch (error) {
        if (error instanceof APIError) {
            console.log(error.message, error.status);
        }
        throw error;
    }
};
