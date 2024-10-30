import createClient from "openapi-fetch";
import { default as createReactQueryClient } from "openapi-react-query";
import type { paths } from "./schema";

export const client = createClient<paths>({ baseUrl: "/" });
export const reactQueryClient = createReactQueryClient(client);
