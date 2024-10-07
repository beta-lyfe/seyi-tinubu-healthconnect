import createClient from "openapi-fetch";
import type { App } from "@beta-lyfe/backend";
import api from "./api";
import type { paths } from "./api/schema";

const client = createClient<paths>({ baseUrl: "/" });

export const backend = {
	client,
	api,
};
