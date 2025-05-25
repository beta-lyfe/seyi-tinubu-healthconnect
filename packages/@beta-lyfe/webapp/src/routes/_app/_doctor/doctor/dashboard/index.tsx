import { createFileRoute, Link } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@beta-lyfe/ui/components/shad/ui/card'
import { Button } from '@beta-lyfe/ui/components/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@beta-lyfe/ui/components/shad/ui/avatar'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Video,
  MessageSquare,
  Activity,
  Star
} from 'lucide-react'
import { useAuth } from '../../../../../hooks/auth'
import { ConsultationRequest } from './appointments'

export const Route = createFileRoute('/_app/_doctor/doctor/dashboard/')({
  component: DoctorDashboardPage
})



function DoctorDashboardPage() {
  const user = useAuth(true).data.data.user.data


  function GetAllDoctorAppointment(){
    
  }

  return (
    <div className="space-y-6 overflow-x-clip">
      
      {/* Welcome section */}
      {user && (<>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Welcome back, Dr. {user.first_name}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your telehealth practice.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="text-white">
            <Link to="/doctor/dashboard/appointments">
              <Calendar className="mr-2 h-4 w-4" /> View Appointments
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-2 rounded-full mb-2 dark:bg-blue-900">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <p className="text-sm text-muted-foreground">
              Today's Appointments
            </p>
            <p className="text-xl font-bold">8</p>
            <Badge variant="outline" className="mt-1">
              <Clock className="h-3 w-3 mr-1" /> Next in 35m
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-green-100 p-2 rounded-full mb-2 dark:bg-green-900">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <p className="text-sm text-muted-foreground">Today's Earnings</p>
            <p className="text-xl font-bold">₦560.00</p>
            <Badge
              variant="outline"
              className="mt-1 text-green-600 dark:text-green-400"
            >
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from yesterday
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-2 rounded-full mb-2 dark:bg-purple-900">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
            <p className="text-sm text-muted-foreground">Total Patients</p>
            <p className="text-xl font-bold">142</p>
            <Badge variant="outline" className="mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> 3 new this week
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-amber-100 p-2 rounded-full mb-2 dark:bg-amber-900">
              <Star className="h-5 w-5 text-amber-600 dark:text-amber-300" />
            </div>
            <p className="text-sm text-muted-foreground">Rating</p>
            <p className="text-xl font-bold">4.8/5</p>
            <Badge variant="outline" className="mt-1">
              Based on 96 reviews
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming appointments */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl">
                Upcoming Appointments
              </CardTitle>
              <CardDescription>
                Your next scheduled consultations
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/doctor/dashboard/appointments">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <ConsultationRequest />
      </Card>

      {/* Recent activity and earnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/doctor/patients">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
         
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Patient"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  You completed a video consultation for heart condition
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Patient"
                />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">Maria Garcia</p>
                  <p className="text-xs text-muted-foreground">2d ago</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  You ordered a Complete Blood Count test
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Your financial summary</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/doctor/dashboard/earnings">
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">₦2,840.00</p>
              </div>
              <Badge className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <ArrowUpRight className="h-3 w-3" /> +8.2%
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Video Consultations
                </span>
                <span className="font-medium">₦1,920.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Chat Consultations
                </span>
                <span className="font-medium">₦720.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Prescription Fees</span>
                <span className="font-medium">₦200.00</span>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Next Payout</p>
                  <p className="font-medium">₦2,840.00 on May 15, 2023</p>
                </div>
                <Button variant="outline" size="sm">
                  Request Early
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance metrics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Your practice statistics for the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full dark:bg-blue-900">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Consultation Completion Rate
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">98%</p>
                  <Badge className="text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +2%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full dark:bg-green-900">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Response Time
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">4.2 hours</p>
                  <Badge className="text-green-600 dark:text-green-400">
                    <ArrowDownRight className="h-3 w-3 mr-1" /> -15%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full dark:bg-amber-900">
                <Star className="h-6 w-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Patient Satisfaction
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold">4.8/5</p>
                  <Badge className="text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +0.2
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card></>)}
    </div>
  )
}
