import './app'
import { webapp } from './lib/store/webapp'

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('beforeinstallprompt', (event) => {
    webapp.setPromptInstallEvent(event as unknown as BeforeInstallPromptEvent)
  })
})
