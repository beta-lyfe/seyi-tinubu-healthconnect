import { Typography } from '@beta-lyfe/ui/components/typography'
import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
import { Wallet } from 'lucide-react'
import { LogoIcon } from '@beta-lyfe/ui/components/icons/index'
import { Link } from '@tanstack/react-router'

export const TopBar = () => (
  <div className="flex justify-between flex-row items-center  bg-primary p-5">
    <LogoIcon className="size-12" />

    <Link to="/dashboard/wallet">
      <Button className="flex  justify-around bg-[#ffffff30] hover:bg-[#ffffff30] gap-4 items-center">
        <Wallet color="white" />
        <Typography.Info className="text-white">₦ 3000.00</Typography.Info>
      </Button>
    </Link>
  </div>
)
