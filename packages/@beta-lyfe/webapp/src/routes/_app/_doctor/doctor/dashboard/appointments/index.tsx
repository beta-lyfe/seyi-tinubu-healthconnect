import {
  createFileRoute,
  Link,
  useLocation,
  useNavigate,
  useRouter
} from '@tanstack/react-router'

import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
import { Button } from '@beta-lyfe/ui/components/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@beta-lyfe/ui/components/shad/ui/avatar'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@beta-lyfe/ui/components/shad/ui/select'
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  Check,
  X
} from 'lucide-react'
import { $api } from '../../../../../../lib/backend'
import { useAuth } from '../../../../../../hooks/auth'
import { toast } from 'sonner'
import JoinCallModal from '../../../../-components/join-call-modal'
import { JoinButton } from '../../../../_dashboard/dashboard/schedule'

export const Route = createFileRoute(
  '/_app/_doctor/doctor/dashboard/appointments/'
)({
  component: DoctorAppointmentsPage
})

export function ConsultationRequest({
  call,
  number
}: { call?: boolean; number?: number }) {
  const token = useAuth(true).data.data.token.access_token
  const user = useAuth(true).data.data.user
  const queryConsultation = $api.useQuery('get', '/api/consultation', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      query: !number
        ? {
            profile: 'true'
          }
        : {
            profile: 'true',
            page: 1,
            per_page: 3
          }
    }
  })
  const queryConsultationRequest = $api.useQuery(
    'get',
    '/api/consultation/request',
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        query: {
          profile: 'true'
        }
      }
    }
  )

  const consultationRequest = call
    ? (queryConsultation.data?.data.data ?? [])
    : (queryConsultationRequest.data?.data.data ?? [])

  const { mutate } = $api.useMutation(
    'post',
    '/api/consultation/request/{id}/accept',
    {
      onSuccess: (response) => {
        if (response.code === 'CONSULTATION_REQUEST_ACCEPTED_SUCCESSFULLY') {
          toast.success(response.code)
        }
      },
      onError: (err) => {
        toast.error(err.code)
      }
    }
  )

  const { mutate: mutateReject } = $api.useMutation(
    'post',
    '/api/consultation/request/{id}/reject',
    {
      onSuccess: (response) => {
        if (response.code === 'CONSULTATION_REQUEST_REJECTED_SUCCESSFULLY') {
          toast.success(response.code)
        }
      },
      onError: (err) => {
        toast.error(err.code)
      }
    }
  )

  const isSuccessful =
    queryConsultation.status === 'success' &&
    queryConsultationRequest.status === 'success'

  return (
    <>
      {isSuccessful &&
        consultationRequest &&
        consultationRequest.map((consultation: any) => (
          <Card key={consultation.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-md dark:bg-primary/20">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">
                        {consultation.patient_profile!.first_name}{' '}
                        {consultation.patient_profile!.last_name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Follow-up consultation for heart condition
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> Today
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" /> {consultation.start_time}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <AvatarFallback>
                          {consultation.patient_profile!.first_name[0]}
                          {consultation.patient_profile!.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Patient since: Jan 2023
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last visit: 2 weeks ago
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      {consultation.status === 'pending' ? (
                        <>
                          <Button
                            variant="outline"
                            className="bg-transparent"
                            size="sm"
                            onClick={() => {
                              mutate({
                                headers: {
                                  Authorization: `Bearer ${token}`
                                },
                                params: {
                                  path: {
                                    id: consultation.id
                                  }
                                }
                              })
                            }}
                          >
                            <Check className="mr-2 h-4 w-4 text-primary" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              mutateReject({
                                headers: {
                                  Authorization: `Bearer ${token}`
                                },
                                params: {
                                  path: {
                                    id: consultation.id
                                  }
                                }
                              })
                            }}
                          >
                            <X className="mr-2 h-4 w-4 " /> Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          {call && (
                            <JoinButton
                              token={consultation.token}
                              roomname={consultation.room_name}
                              patientName={`Dr ${consultation.patient_profile.first_name} ${consultation.patient_profile.last_name}`}
                              doctorName={`${user.data.first_name} ${user.data.last_name}`}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  )
}

export default function DoctorAppointmentsPage() {
  return (
    <div className="space-y-6 overflow-x-clip">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your consultations and patient appointments
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
          <Button size="sm" className='text-white'>Set Availability</Button>
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
                <SelectValue placeholder="Appointment Type" />
              </SelectTrigger>
              <SelectContent>
                
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="video">Video Consultation</SelectItem>
                <SelectItem value="chat">Chat Consultation</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
                <SelectItem value="initial">Initial Consultation</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="pending">Pending Confirmation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Calendar view */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center p-6 border rounded-md dark:border-gray-800">
            <p className="text-muted-foreground">
              Calendar view will be displayed here
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Appointments tabs */}
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4 w-full overflow-auto">
         
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <ConsultationRequest call />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-md dark:bg-amber-900">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">Robert Brown</h3>
                      <p className="text-sm text-muted-foreground">
                        Initial consultation for hypertension
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> Tomorrow
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" /> 2:00 PM
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <AvatarFallback>RB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          New patient
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Insurance: Blue Cross
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm">
                        <XCircle className="mr-2 h-4 w-4" /> Decline
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="mr-2 h-4 w-4" /> Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-md dark:bg-amber-900">
                  <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">Emily Wilson</h3>
                      <p className="text-sm text-muted-foreground">
                        Follow-up for medication adjustment
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> Friday
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" /> 9:30 AM
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Patient since: Mar 2023
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last visit: 1 month ago
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm">
                        <XCircle className="mr-2 h-4 w-4" /> Decline
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="mr-2 h-4 w-4" /> Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-md dark:bg-green-900">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">Sarah Thompson</h3>
                      <p className="text-sm text-muted-foreground">
                        Follow-up for medication review
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> Yesterday
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" /> 3:00 PM
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Duration: 25 minutes
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Prescription: Updated
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" /> View Notes
                      </Button>
                      <Button size="sm">
                        <Calendar className="mr-2 h-4 w-4" /> Schedule Follow-up
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-md dark:bg-red-900">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">Michael Johnson</h3>
                      <p className="text-sm text-muted-foreground">
                        Follow-up consultation
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" /> May 2, 2023
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" /> 1:00 PM
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Cancelled by: Patient
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Reason: Personal emergency
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                      </Button>
                      <Button size="sm">
                        <Calendar className="mr-2 h-4 w-4" /> Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
