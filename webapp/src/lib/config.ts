import { z } from "zod";

const EnvSchema = z.object({
	NODE_ENV: z.union([z.literal("production"), z.literal("development")]),
	HUDDLE01_PROJECT_ID: z.string().catch("PROJECT_ID_NOT_SET"),
});

const env = EnvSchema.parse({
	NODE_ENV: import.meta.env.MODE,
	HUDDLE01_PROJECT_ID: import.meta.env.VITE_HUDDLE01_PROJECT_ID,
});

export const config = {
	app: {
		environment: env.NODE_ENV,
	},
	huddle01: {
		projectId: env.HUDDLE01_PROJECT_ID,
	},
};
