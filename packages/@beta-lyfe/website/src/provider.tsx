import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const queryClient = new QueryClient()

export const Provider: FunctionComponent<PropsWithChildren> = ({
  children
}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
