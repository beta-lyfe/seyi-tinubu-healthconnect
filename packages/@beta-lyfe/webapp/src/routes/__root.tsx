import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@beta-lyfe/ui/components/shad/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { env } from "../env";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export const Route = createRootRoute({
	component: () => (
		<Provider>
			<Outlet />
			<Toaster />
			<Devtools />
		</Provider>
	),
});

const huddleClient = new HuddleClient({
	projectId: env.VITE_NODE_ENV,
	options: {
		activeSpeakers: {
			size: 3,
		},
	},
});

export default function Provider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<HuddleProvider client={huddleClient}>{children}</HuddleProvider>
		</QueryClientProvider>
	);
}

function Devtools() {
	if (env.VITE_NODE_ENV !== "development") return null;

	return (
		<>
			<TanStackRouterDevtools initialIsOpen={false} />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}
