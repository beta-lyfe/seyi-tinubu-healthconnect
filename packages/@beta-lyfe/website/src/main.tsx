import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import '@beta-lyfe/ui/styles.css'
import './styles.css'
import { Provider } from './provider'
import { Toaster } from 'sonner'

const rootElement = document.querySelector('#app')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider>
        <App />
        <Toaster />
      </Provider>
    </StrictMode>
  )
}
