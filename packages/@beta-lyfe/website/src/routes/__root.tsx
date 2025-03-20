import { Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";
import { Toaster } from "@beta-lyfe/ui/components/shad/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import LoadingScreen from "./_app/-components/loading-component";
import TopNavBar from "./_app/-components/header";

const queryClient = new QueryClient();

export const Route = createRootRoute({
	component: () => {
		const routerState=useRouterState()
	return (	
	<Provider>
		<TopNavBar />
			{
				routerState.status==='pending' && <LoadingScreen />
			}
			<Outlet />
			<Toaster />
		</Provider>
	)},

});



export default function Provider({ children }: { children: ReactNode }) {
	console.log("setting up query client")
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}