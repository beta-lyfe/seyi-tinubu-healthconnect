import { proxy, ref, useSnapshot } from 'valtio'

type Store = {
  installEvent: BeforeInstallPromptEvent | null
  isInstalled: boolean
}

const store = proxy<Store>({
  installEvent: null,
  isInstalled: false
})

const checkAndUpdateInstalledStatus = async () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    if (document.referrer.startsWith('android-app://')) {
      store.isInstalled = true
    }
  }
}

const useWebapp = () => {
  const { installEvent, isInstalled } = useSnapshot(store)
  checkAndUpdateInstalledStatus()

  return {
    canInstall: installEvent !== null,
    isInstalled,
    triggerInstallPrompt: async () => {
      if (installEvent) {
        installEvent.prompt()
        if (installEvent.userChoice.outcome === 'accepted') {
          store.isInstalled = true
        }

        return true
      }
      return false
    }
  }
}

export const webapp = {
  hooks: {
    useWebapp
  },
  setPromptInstallEvent: (event: BeforeInstallPromptEvent) => {
    store.installEvent = ref(event)
  }
}
