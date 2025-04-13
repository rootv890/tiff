"use client";
import { authClient } from "@/app/api/auth/authClient";
import { SignInWithEmailType, SignUpWithEmailType } from "@/types";
import { APIError } from "better-auth";

export const signOut = async () => {
  await authClient.signOut({ query: { redirect: "/login" } });
  return;
};

// TODO: Make a custom useSign with react-query using with below function
export const signInWithEmail = async ({
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
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
    }
    throw error;
  }
};

export const signUpWithEmail = async ({
  name,
  email,
  password,
}: SignUpWithEmailType) => {
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
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status);
    }
    throw error;
  }
};
