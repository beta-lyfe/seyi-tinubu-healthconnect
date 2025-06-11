import { MainLayout } from './-components/main-layout'
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
  MessageSquare,
  ArrowRight,
  Search,
  Star,
  Activity
} from 'lucide-react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { $api } from '../../../../lib/backend'
import { useAuth } from '../../../../hooks/auth'
import { AdditionalInfoModal } from './-components/profilemodal'
import { GetAllAppointments } from './schedule'

export const Route = createFileRoute('/_app/_dashboard/dashboard/')({
  component: DashboardPage
})

export default function DashboardPage() {
  const auth=useAuth(true)
  const user=auth.data.data.user
  const [showExtraProfile,setShowExtraProfile]=useState(false)
  const router=useRouter()

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Welcome back, {user.data.first_name} 
          </h1>
          <p className="text-muted-foreground text-sm">
            Here's an overview of your telehealth services.
          </p>
        </div>
        <Button className="w-full md:w-auto text-white" onClick={()=>router.navigate({
          to:'/dashboard/doctors'
        })}>
          <Search className="mr-2 h-4 w-4" /> Find a Doctor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-2 rounded-full mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
            <p className="text-xl font-bold">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-green-100 p-2 rounded-full mb-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">Unread</p>
            <p className="text-xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-2 rounded-full mb-2">
              <Activity className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground">Consultations</p>
            <p className="text-xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="bg-amber-100 p-2 rounded-full mb-2">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-sm text-muted-foreground">Reviews</p>
            <p className="text-xl font-bold">8</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming appointment */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl pb-2 md:text-2xl">
            Upcoming Appointments
          </CardTitle>
          <CardDescription>
            Your next scheduled telehealth consultations
          </CardDescription>
        </CardHeader>
      <GetAllAppointments number={2}/>
      </Card>

     
      <AdditionalInfoModal open={showExtraProfile} onOpenChange={setShowExtraProfile}/>
    </div>
  )
}


