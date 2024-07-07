import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Toaster } from "@beta-lyfe/webapp/shad/ui/sonner"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { env } from '@beta-lyfe/webapp/env'
import { BottomNav } from './-components/bottom-nav'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
      <Devtools />
    </QueryClientProvider>
  ),
})

function Devtools() {
  return null

  if (env.VITE_NODE_ENV !== "development")
    return null

  return (
    <>
      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
