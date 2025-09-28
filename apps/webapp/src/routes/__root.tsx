import {
  Outlet,
  createRootRoute,
  useRouter,
  useRouterState
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@beta-lyfe/ui/components/shad/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { env } from '../env'
import type { ReactNode } from 'react'
import LoadingScreen from './_app/-components/loading-component'
import NotFound from './_app/_dashboard/dashboard/-components/notfound'
import { App } from '@capacitor/app'
import { Device } from '@capacitor/device'
import useBackButtonHandler from '../hooks/useBackButtonHandler'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => {
    useBackButtonHandler()
    return (
      <Provider>
        <Outlet />
        <Toaster />
        <Devtools />
      </Provider>
    )
  }
})


export default function Provider({ children }: { children: ReactNode }) {
  console.log('setting up query client')
  console.log(queryClient)
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

function Devtools() {
  if (env.VITE_NODE_ENV !== 'development') return null

  return (
    <>
      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
