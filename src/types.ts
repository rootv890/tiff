import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { user } from './db/schema'

export enum ModalOpenType {
    CREATE_SERVER = 'CREATE_SERVER',
    EDIT_SERVER = 'EDIT_SERVER',
}

// sign in
export type SignInWithEmailType = {
    email: string
    password: string
}

// sign up

export const SignUpWithEmailSchema = createInsertSchema(user).extend({
    password: z.string().min(8),
    acceptTos: z.literal(false),
})
export type SignUpWithEmailSchemaType = z.infer<typeof SignUpWithEmailSchema>
