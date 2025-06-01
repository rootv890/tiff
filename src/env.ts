import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		CLOUDINARY_CLOUD_NAME: z.string(),
		CLOUDINARY_API_KEY: z.string(),
		CLOUDINARY_API_SECRET: z.string(),
		CLOUDINARY_FOLDER_NAME: z.string(),
		RESEND_API_KEY: z.string(),
	},

	/**
	 * The prefix that client-side variables must have. This is enforced both at
	 * a type-level and at runtime.
	 */
	clientPrefix: "NEXT_PUBLIC_",

	client: {
		NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
		NEXT_PUBLIC_BASE_URL: z.string(),
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: process.env,

	/**
	 * By default, this library will feed the environment variables directly to
	 * the Zod validator.
	 *
	 * This means that if you have an empty string for a value that is supposed
	 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
	 * it as a type mismatch violation. Additionally, if you have an empty string
	 * for a value that is supposed to be a string with a default value (e.g.
	 * `DOMAIN=` in an ".env" file), the default value will never be applied.
	 *
	 * In order to solve these issues, we recommend that all new projects
	 * explicitly specify this option as true.
	 */
	emptyStringAsUndefined: true,
})
