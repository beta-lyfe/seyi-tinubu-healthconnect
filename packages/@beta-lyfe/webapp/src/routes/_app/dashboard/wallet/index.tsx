import { Typography } from '@beta-lyfe/ui/components/typography'
import { BottomNav } from '../../-components/bottom-nav'
import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowDownLeft, ArrowUpRight, Wallet2 } from 'lucide-react'

export const Route = createFileRoute('/_app/dashboard/wallet/')({
  component: WalletPage
})

function WalletPage() {
  return (
    <>
      <div className="p-5 bg-primary gap-5">
        <div>
          <Typography.PageHeading className="text-white">
            Wallet
          </Typography.PageHeading>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <Typography.PageHeading className="pb-5">
          My Wallet
        </Typography.PageHeading>
        <WalletCard />
        <Transaction />
      </div>
      <BottomNav />
    </>
  )
}

function WalletCard() {
  return (
    <div className="bg-primary p-8 rounded-md flex flex-col gap-4">
      <div className="flex gap-3">
        <Wallet2 color="white" />
        <Typography.Info className="text-white">
          Avaliable Balance
        </Typography.Info>
      </div>
      <Typography.PageHeading className="text-white">
        NGN 3000
      </Typography.PageHeading>
      <div>
        <Button className="bg-white text-primary hover:bg-white hover:text-primary">
          Fund my wallet
        </Button>
      </div>
    </div>
  )
}

function Transaction() {
  return (
    <div className="py-6">
      <Typography.PageHeading>Transactions</Typography.PageHeading>
      <TransactionSection />
    </div>
  )
}

function TransactionSection() {
  const TransactionCard = ({ credit }: { credit?: boolean }) => (
    <>
      <div className="flex justify-between py-4">
        <div className="flex gap-4 items-center">
          <div
            className={`p-2 rounded-lg ${credit ? 'bg-green-100' : 'bg-red-100'}`}
          >
            {credit ? (
              <ArrowDownLeft color="green" />
            ) : (
              <ArrowUpRight color="red" />
            )}
          </div>
          <div>
            <Typography.CardHeading>Topup</Typography.CardHeading>
            <Typography.Info className="text-sm">Paystack</Typography.Info>
          </div>
        </div>
        <div>
          <Typography.CardHeading>
            {credit ? '+' : '-'}10000
          </Typography.CardHeading>
          <Typography.Info className="text-sm">3.01 PM</Typography.Info>
        </div>
      </div>
      <hr className="opacity-80" />
    </>
  )

  return (
    <div className="py-4">
      <Typography.CardHeading className="opacity-65">
        Today
      </Typography.CardHeading>
      <TransactionCard credit />
      <TransactionCard credit />
      <TransactionCard />
      <TransactionCard />
    </div>
  )
}
