import { createInsertSchema } from "drizzle-zod";
import { user } from "./db/schema";
import { z } from "zod";
// sign in
export type SignInWithEmailType = {
  email: string;
  password: string;
};

// sign up

export const SignUpWithEmailSchema = createInsertSchema(user).extend({
  password: z.string().min(8),
  acceptTos: z.literal(false),
});
export type SignUpWithEmailSchemaType = z.infer<typeof SignUpWithEmailSchema>;
