import { createFileRoute, Link } from '@tanstack/react-router'

import { Label } from '@beta-lyfe/ui/components/shad/ui/label'

import { useState } from 'react'

import {
  ArrowUp,
  Calendar,
  ChevronDown,
  CreditCard,
  Download,
  Filter,
  HelpCircle,
  Plus,
  Search,
  Wallet
} from 'lucide-react'
import { Button } from '@beta-lyfe/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@beta-lyfe/ui/components/shad/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@beta-lyfe/ui/components/shad/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@beta-lyfe/ui/components/shad/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@beta-lyfe/ui/components/shad/ui/table'

export const Route = createFileRoute('/_app/_doctor/doctor/dashboard/wallet/')({
  component: DoctorWalletPage
})

export default function DoctorWalletPage() {
  const [dateRange, setDateRange] = useState<string>('30days')

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">
            Manage your earnings and payouts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦3,240.50</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="mr-1">
                Pending: ₦750.00
              </Badge>
              <a
                href="#!"
                className="text-xs text-primary underline-offset-4 hover:underline"
              >
                View details
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Withdraw Funds</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦1,840.00</div>
            <div className="mt-1 flex items-center text-xs text-green-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>12.5% from last month</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-xs text-muted-foreground">
            <div>
              <div>Consultations</div>
              <div className="font-medium">32</div>
            </div>
            <div>
              <div>Avg. per consultation</div>
              <div className="font-medium">₦57.50</div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Next Payout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦1,250.00</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span>Scheduled for May 15, 2025</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center text-xs">
              <CreditCard className="mr-1 h-3 w-3" />
              <span>XXXX-XXXX-XXXX-4285</span>
            </div>
            <Button variant="ghost" size="sm">
              Change
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-2 md:w-auto">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>All transactions</DropdownMenuItem>
                <DropdownMenuItem>Consultations only</DropdownMenuItem>
                <DropdownMenuItem>Prescription fees only</DropdownMenuItem>
                <DropdownMenuItem>Payouts only</DropdownMenuItem>
                <DropdownMenuItem>Refunds only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="w-full pl-8 md:w-[250px]"
            />
          </div>
        </div>

        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View all your earnings and payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">May 10, 2025</TableCell>
                    <TableCell>Video Consultation</TableCell>
                    <TableCell>James Wilson</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦75.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">May 9, 2025</TableCell>
                    <TableCell>Follow-up Consultation</TableCell>
                    <TableCell>Emma Thompson</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦45.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">May 8, 2025</TableCell>
                    <TableCell>Prescription Renewal</TableCell>
                    <TableCell>Michael Brown</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦25.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">May 7, 2025</TableCell>
                    <TableCell>Video Consultation</TableCell>
                    <TableCell>Sophia Garcia</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400"
                      >
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦75.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">May 5, 2025</TableCell>
                    <TableCell>Emergency Consultation</TableCell>
                    <TableCell>David Martinez</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦95.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">May 1, 2025</TableCell>
                    <TableCell>Monthly Payout</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                      >
                        Transferred
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-red-500">
                      -₦1,450.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 flex items-center justify-center">
                <Button variant="outline" size="sm">
                  Load More
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>
                View your past and upcoming payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">May 15, 2025</TableCell>
                    <TableCell>BL-PAY-2505150001</TableCell>
                    <TableCell>XXXX-XXXX-XXXX-4285</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400"
                      >
                        Scheduled
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦1,250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">May 1, 2025</TableCell>
                    <TableCell>BL-PAY-2505010001</TableCell>
                    <TableCell>XXXX-XXXX-XXXX-4285</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦1,450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Apr 15, 2025</TableCell>
                    <TableCell>BL-PAY-2504150001</TableCell>
                    <TableCell>XXXX-XXXX-XXXX-4285</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦1,320.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Apr 1, 2025</TableCell>
                    <TableCell>BL-PAY-2504010001</TableCell>
                    <TableCell>XXXX-XXXX-XXXX-4285</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₦1,580.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-methods" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payout methods and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4285</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 09/27
                      </p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Bank Account (ACH)</p>
                      <p className="text-sm text-muted-foreground">
                        Ending in 7890
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Set as default
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Payout Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="payout-frequency">Payout Frequency</Label>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Select defaultValue="biweekly">
                      <SelectTrigger id="payout-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="min-payout">Minimum Payout Amount</Label>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Select defaultValue="100">
                      <SelectTrigger id="min-payout">
                        <SelectValue placeholder="Select minimum amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">₦50</SelectItem>
                        <SelectItem value="100">₦100</SelectItem>
                        <SelectItem value="250">₦250</SelectItem>
                        <SelectItem value="500">₦500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Analytics</CardTitle>
          <CardDescription>
            View your earnings trends and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 h-[300px] w-full rounded-lg bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground">
              Earnings chart visualization would appear here
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Top Earning Services
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Video Consultations</span>
                  <span className="font-medium">₦2,450.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Follow-ups</span>
                  <span className="font-medium">₦875.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Prescriptions</span>
                  <span className="font-medium">₦625.00</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Earnings by Day
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monday</span>
                  <span className="font-medium">₦620.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wednesday</span>
                  <span className="font-medium">₦580.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Friday</span>
                  <span className="font-medium">₦540.00</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Year-to-Date
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Earnings</span>
                  <span className="font-medium">₦18,450.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Consultations</span>
                  <span className="font-medium">312</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg. per Consultation</span>
                  <span className="font-medium">₦59.13</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Information</CardTitle>
          <CardDescription>
            Manage your tax documents and information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">2024 Tax Statement</p>
                  <p className="text-sm text-muted-foreground">
                    Available for download
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">2023 Tax Statement</p>
                  <p className="text-sm text-muted-foreground">
                    Available for download
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Need help with your taxes? Contact our support team for
                assistance with tax-related questions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
