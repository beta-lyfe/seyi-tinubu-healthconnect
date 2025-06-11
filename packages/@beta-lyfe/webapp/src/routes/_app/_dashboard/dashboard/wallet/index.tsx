import { Typography } from '@beta-lyfe/ui/components/typography'
import { BottomNav } from '../../../-components/bottom-nav'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowDownLeft, ArrowUpRight, Wallet2 } from 'lucide-react'
import { LayoutWithBottomNav } from '../-components/layout'

export const Route = createFileRoute('/_app/_dashboard/dashboard/wallet/')({
  component: WalletPage
})
import { MainLayout } from '../-components/main-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@beta-lyfe/ui/components/shad/ui/card'
import { Button } from '@beta-lyfe/ui/components/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import {
  Wallet,
  CreditCard,
  PlusCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Stethoscope,
  Pill,
  FlaskRoundIcon as Flask,
  Download
} from 'lucide-react'

export default function WalletPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Wallet & Transactions
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg">
            Manage your payments and view transaction history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export History
          </Button>
          <Button className='text-white'>
            <PlusCircle className="mr-2 h-4 w-4 text-white" /> Add Funds
          </Button>
        </div>
      </div>

      {/* Wallet balance */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className='text-md md:text-lg'>Wallet Balance</CardTitle>
            <CardDescription>
              Your current Beta-Lyfe wallet balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Available Balance
                  </p>
                  <p className="text-lg md:text-xl font-bold ">₦245.50</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <ArrowDownCircle className="mr-2 h-4 w-4" /> Deposit
                </Button>
                <Button variant="outline">
                  <ArrowUpCircle className="mr-2 h-4 w-4" /> Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className='text-md md:text-lg'>Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
                <Badge>Default</Badge>
              </div>
              <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className='text-md font-bold md:text-xl'>Transaction History</CardTitle>
          <CardDescription>View all your past transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" >
            <TabsList className="mb-4 w-[100%] overflow-scroll">
              <TabsTrigger value="none">None</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="lab-tests">Lab Tests</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="bg-blue-100 p-2 rounded-md">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="text-sm">
                        Consultation with Dr. Sarah Johnson
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Cardiology
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 15, 2023
                      </Badge>
                      <p className="font-semibold text-red-500">-₦75.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="bg-green-100 p-2 rounded-md">
                  <Pill className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="text-sm">Prescription Medication</p>
                      <p className="text-sm text-muted-foreground">
                        Lisinopril (30-day supply)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 10, 2023
                      </Badge>
                      <p className="font-semibold text-red-500">-₦25.50</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Flask className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="text-md">Lab Test</p>
                      <p className="text-sm text-muted-foreground">
                        Complete Blood Count
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 5, 2023
                      </Badge>
                      <p className="font-semibold text-red-500">-₦45.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="bg-primary/10 p-2 rounded-md">
                  <ArrowDownCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Wallet Deposit</p>
                      <p className="text-sm text-muted-foreground">
                        From Credit Card •••• 4242
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 1, 2023
                      </Badge>
                      <p className="font-semibold text-green-500">+₦200.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="consultations" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="bg-blue-100 p-2 rounded-md">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Consultation with Dr. Sarah Johnson
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Cardiology
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 15, 2023
                      </Badge>
                      <p className="font-semibold text-red-500">-₦75.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="bg-green-100 p-2 rounded-md">
                  <Pill className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="text-md">Prescription Medication</p>
                      <p className="text-sm text-muted-foreground">
                        Lisinopril (30-day supply)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 10, 2023
                      </Badge>
                      <p className="font-semibold text-red-500">-₦25.50</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lab-tests" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Flask className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="text-sm">Lab Test</p>
                      <p className="text-sm text-muted-foreground">
                        Complete Blood Count
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 5, 2023
                      </Badge>
                      <p className="font-semibold text-red-500">-₦45.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
