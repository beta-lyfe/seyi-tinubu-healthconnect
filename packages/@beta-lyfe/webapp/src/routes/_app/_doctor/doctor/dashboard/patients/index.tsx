import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
import { Button } from '@beta-lyfe/ui/components/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@beta-lyfe/ui/components/shad/ui/avatar'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import { Input } from '@beta-lyfe/ui/components/input'
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
  Search,
  Filter,
  Calendar,
  FileText,
  MessageSquare,
  Heart,
  AlertCircle
} from 'lucide-react'

export const Route = createFileRoute(
  '/_app/_doctor/doctor/dashboard/patients/'
)({
  component: DoctorPatientsPage
})

export default function DoctorPatientsPage() {
  return (
    <div className="space-y-6 overflow-x-clip">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">
            Manage your patient records and medical histories
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
          <Button size="sm" className='text-white'>Export Data</Button>
        </div>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search patients..." className="pl-8" />
            </div>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="hypertension">Hypertension</SelectItem>
                <SelectItem value="diabetes">Diabetes</SelectItem>
                <SelectItem value="heart">Heart Disease</SelectItem>
                <SelectItem value="asthma">Asthma</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Last Visit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last 3 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="visits">Most Visits</SelectItem>
                <SelectItem value="age">Age</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Patient cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Patient"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-sm text-muted-foreground">
                          45 years • Male
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline">Hypertension</Badge>
                          <Badge variant="outline">Diabetes</Badge>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Last visit: 2 weeks
                          ago
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/doctor/dashboard/patients/$id"
                          params={{ id: 'john-doe' }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> View Records
                        </Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Patient"
                    />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Maria Garcia</h3>
                        <p className="text-sm text-muted-foreground">
                          38 years • Female
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline">Chest Pain</Badge>
                          <Badge variant="outline">Anxiety</Badge>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Calendar className="h-3 w-3" /> New Patient
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/doctor/dashboard/patients/$id"
                          params={{ id: 'john-doe' }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> View Records
                        </Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Patient"
                    />
                    <AvatarFallback>RB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Robert Brown</h3>
                        <p className="text-sm text-muted-foreground">
                          52 years • Male
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline">Hypertension</Badge>
                          <Badge variant="outline">High Cholesterol</Badge>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Calendar className="h-3 w-3" /> New Patient
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/doctor/dashboard/patients/$id"
                          params={{ id: 'john-doe' }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> View Records
                        </Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Patient"
                    />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Sarah Thompson</h3>
                        <p className="text-sm text-muted-foreground">
                          41 years • Female
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline">Asthma</Badge>
                          <Badge variant="outline">Allergies</Badge>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Last visit: Yesterday
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/doctor/dashboard/patients/$id"
                          params={{ id: 'john-doe' }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> View Records
                        </Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button variant="outline">Load More Patients</Button>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Patient"
                    />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Sarah Thompson</h3>
                        <p className="text-sm text-muted-foreground">
                          41 years • Female
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline">Asthma</Badge>
                          <Badge variant="outline">Allergies</Badge>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Last visit: Yesterday
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/doctor/dashboard/patients/$id"
                          params={{ id: 'john-doe' }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> View Records
                        </Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Patient"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-sm text-muted-foreground">
                          45 years • Male
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline">Hypertension</Badge>
                          <Badge variant="outline">Diabetes</Badge>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Last visit: 2 weeks
                          ago
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/doctor/dashboard/patients/$id"
                          params={{ id: 'john-doe' }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> View Records
                        </Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="/placeholder.svg?height=64&width=64"
                    alt="Patient"
                  />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Michael Johnson</h3>
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" /> Critical
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        68 years • Male
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline">Heart Failure</Badge>
                        <Badge variant="outline">Arrhythmia</Badge>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <Badge className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> Requires immediate
                        attention
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        to="/doctor/dashboard/patients/$id"
                        params={{
                          id: 'john-doe'
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" /> View Records
                      </Link>
                    </Button>
                    <Button size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" /> Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Patient"
                    />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Maria Garcia</h3>
                        <p className="text-sm text-muted-foreground">
                          38 years • Female
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline">Chest Pain</Badge>
                          <Badge variant="outline">Anxiety</Badge>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Calendar className="h-3 w-3" /> New Patient
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/doctor/dashboard/patients/$id"
                          params={{ id: 'john-doe' }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> View Records
                        </Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="Patient"
                    />
                    <AvatarFallback>RB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Robert Brown</h3>
                        <p className="text-sm text-muted-foreground">
                          52 years • Male
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline">Hypertension</Badge>
                          <Badge variant="outline">High Cholesterol</Badge>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Calendar className="h-3 w-3" /> New Patient
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to="/doctor/dashboard/patients/$id"
                          params={{
                            id: 'john-doe'
                          }}
                        >
                          <FileText className="mr-2 h-4 w-4" /> View Records
                        </Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
