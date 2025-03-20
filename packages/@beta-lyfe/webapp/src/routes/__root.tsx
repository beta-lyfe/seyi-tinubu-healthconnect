import { Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@beta-lyfe/ui/components/shad/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { env } from "../env";
import type { ReactNode } from "react";
import LoadingScreen from "./_app/-components/loading-component";

const queryClient = new QueryClient();

export const Route = createRootRoute({
	component: () => {
		const routerState=useRouterState()
	return (	
	<Provider>
			{
				routerState.status==='pending' && <LoadingScreen />
			}
			<Outlet />
			<Toaster />
			<Devtools />
		</Provider>
	)},

});

const huddleClient = new HuddleClient({
	projectId: env.VITE_HUDDLE01_PROJECT_ID,
	options: {
		activeSpeakers: {
			size: 3,
		},
	},
});

export default function Provider({ children }: { children: ReactNode }) {
	console.log("setting up query client")
	console.log(queryClient)
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}

function Devtools() {
	if (env.VITE_NODE_ENV !== "development") return null;
	return null

	return (
		<>
			<TanStackRouterDevtools initialIsOpen={false} />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}
