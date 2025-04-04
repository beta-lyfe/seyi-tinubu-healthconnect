import { MainLayout } from '../../routes/_app/_dashboard/dashboard/-components/main-layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@beta-lyfe/ui/components/shad/ui/card'
import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
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

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, John!
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your telehealth services.
            </p>
          </div>
          <Button className="w-full md:w-auto">
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
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Your next scheduled telehealth consultations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-md">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">
                      Cardiologist
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
                      <Clock className="h-3 w-3" /> 10:00 AM
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                  <p className="text-sm">
                    Follow-up consultation for heart condition
                  </p>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button size="sm">Join Call</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-md">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">Dr. Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">
                      Dermatologist
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
                      <Clock className="h-3 w-3" /> 2:30 PM
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                  <p className="text-sm">
                    Asynchronous consultation for skin condition
                  </p>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Send Message</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent messages */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  Your latest conversations with doctors
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Doctor"
                />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">Dr. Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">2h ago</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  Please let me know if you've been taking the medication as
                  prescribed...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Doctor"
                />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">Dr. Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  I've reviewed the photos of your skin condition. It appears to
                  be...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Doctor"
                />
                <AvatarFallback>RP</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">Dr. Rachel Patel</p>
                  <p className="text-xs text-muted-foreground">3d ago</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  Your lab results look good. Your blood pressure has improved
                  since...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
