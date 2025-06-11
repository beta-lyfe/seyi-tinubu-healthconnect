import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@beta-lyfe/ui/components/shad/ui/card'
import { Button } from '@beta-lyfe/ui/components/button'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@beta-lyfe/ui/components/shad/ui/select'
import {
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Video,
  MessageSquare,
  FileText,
  CreditCard,
  Clock,
  Filter
} from 'lucide-react'

export const Route = createFileRoute(
  '/_app/_doctor/doctor/dashboard/earnings/'
)({
  component: DoctorEarningsPage
})

export default function DoctorEarningsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Earnings & Transactions
          </h1>
          <p className="text-muted-foreground">
            Track your income and payment history
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button size="sm" className='text-white'>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Earnings overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className='text-lg'>Earnings Overview</CardTitle>
            <CardDescription>
              Your earnings summary for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  May 1 - May 31, 2023
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-lg md:text-2xl font-bold py-2">₦12,450.00</p>
              </div>
              <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <ArrowUpRight className="h-3 w-3" /> +15.2% from last month
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-blue-100 p-2 rounded-md dark:bg-blue-900">
                  <Video className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Video Consultations
                  </p>
                  <p className="font-semibold">₦8,250.00</p>
                  <Badge className="mt-1 text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +12%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-green-100 p-2 rounded-md dark:bg-green-900">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Chat Consultations
                  </p>
                  <p className="font-semibold">₦3,200.00</p>
                  <Badge className="mt-1 text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +24%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-purple-100 p-2 rounded-md dark:bg-purple-900">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Prescription Fees
                  </p>
                  <p className="font-semibold">₦1,000.00</p>
                  <Badge className="mt-1 text-red-600 dark:text-red-400">
                    <ArrowDownRight className="h-3 w-3 mr-1" /> -5%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 h-48 bg-muted rounded-md flex items-center justify-center dark:bg-gray-800">
              <p className="text-muted-foreground">
                Earnings chart will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className='text-lg'>Payout Information</CardTitle>
            <CardDescription>Your payment details and schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
              <div className="bg-primary/10 p-2 rounded-md dark:bg-primary/20">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
              <Badge>Default</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Payout</span>
                <span className="font-medium">₦12,450.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payout Date</span>
                <span className="font-medium">June 15, 2023</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payout Method</span>
                <span className="font-medium">Direct Deposit</span>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full">Request Early Payout</Button>
              <Button variant="outline" className="w-full mt-2">
                Update Payment Info
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Transaction History</CardTitle>
          <CardDescription>View all your past transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4 w-full overflow-auto pl-72">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="video">Video Consultations</TabsTrigger>
              <TabsTrigger value="chat">Chat Consultations</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-blue-100 p-2 rounded-md dark:bg-blue-900">
                  <Video className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Video Consultation with John Doe
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Follow-up for heart condition
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 15, 2023
                      </Badge>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        +₦150.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-green-100 p-2 rounded-md dark:bg-green-900">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Chat Consultation with Maria Garcia
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Initial consultation for chest pain
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 14, 2023
                      </Badge>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        +₦75.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-purple-100 p-2 rounded-md dark:bg-purple-900">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Prescription Fee</p>
                      <p className="text-sm text-muted-foreground">
                        Lisinopril for John Doe
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 12, 2023
                      </Badge>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        +₦25.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-primary/10 p-2 rounded-md dark:bg-primary/20">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Payout</p>
                      <p className="text-sm text-muted-foreground">
                        Direct deposit to account ending in 4242
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 1, 2023
                      </Badge>
                      <p className="font-semibold text-amber-600 dark:text-amber-400">
                        -₦10,850.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-blue-100 p-2 rounded-md dark:bg-blue-900">
                  <Video className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Video Consultation with John Doe
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Follow-up for heart condition
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 15, 2023
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" /> 25 minutes
                      </Badge>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        +₦150.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-green-100 p-2 rounded-md dark:bg-green-900">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Chat Consultation with Maria Garcia
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Initial consultation for chest pain
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 14, 2023
                      </Badge>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        +₦75.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-purple-100 p-2 rounded-md dark:bg-purple-900">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Prescription Fee</p>
                      <p className="text-sm text-muted-foreground">
                        Lisinopril for John Doe
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 12, 2023
                      </Badge>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        +₦25.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payouts" className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-md dark:border-gray-800">
                <div className="bg-primary/10 p-2 rounded-md dark:bg-primary/20">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Payout</p>
                      <p className="text-sm text-muted-foreground">
                        Direct deposit to account ending in 4242
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 1, 2023
                      </Badge>
                      <p className="font-semibold text-amber-600 dark:text-amber-400">
                        -₦10,850.00
                      </p>
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
