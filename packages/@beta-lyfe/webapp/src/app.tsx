import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './styles/globals.css'
import { routeTree } from './routeTree.gen'
import NotFound from './routes/_app/_dashboard/dashboard/-components/notfound'
import LoadingScreen from './routes/_app/-components/loading-component'

const router = createRouter({ routeTree ,defaultNotFoundComponent:NotFound,defaultPendingComponent:LoadingScreen})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

