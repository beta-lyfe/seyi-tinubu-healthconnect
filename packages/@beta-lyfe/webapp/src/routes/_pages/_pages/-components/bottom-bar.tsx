import { Button } from '@beta-lyfe/ui/components/button'
import { Typography } from '@beta-lyfe/ui/components/typography'
import { webapp } from '@beta-lyfe/webapp/lib/store/webapp'
import { Loader2Icon } from 'lucide-react'
import { type FunctionComponent, useState } from 'react'

const InstallWebappButton: FunctionComponent<{
  install: () => Promise<void>
}> = ({ install }) => {
  const [isInstalling, setIsInstalling] = useState(false)

  const installWebapp = async () => {
    setIsInstalling(true)
    await install()
    setIsInstalling(false)
  }

  return (
    <Button variant="secondary" onClick={installWebapp}>
      {isInstalling ? (
        <Loader2Icon className="size-6 animate-spin" />
      ) : (
        'Install'
      )}
    </Button>
  )
}

export const BottomBar = () => {
  const wa = webapp.hooks.useWebapp()

  if (!wa.canInstall || wa.isInstalled) return null

  const installWebapp = async () => {
    await wa.triggerInstallPrompt()
  }

  return (
    <div className="fixed md:hidden bottom-0 w-full p-4 bg-primary flex items-center justify-between shadow-[0px_-1px_8px_3px_rgba(0,0,0,0.2)]">
      <Typography.Paragraph className="text-white font-semibold">
        Its better in the mobile app
      </Typography.Paragraph>
      <InstallWebappButton install={installWebapp} />
    </div>
  )
}
