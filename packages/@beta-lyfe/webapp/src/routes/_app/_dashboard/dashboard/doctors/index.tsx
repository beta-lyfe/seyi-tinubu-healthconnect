import { MainLayout } from '../-components/main-layout'
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
  Star,
  Calendar,
  Clock,
  Filter,
  MessageSquare,
  Video
} from 'lucide-react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { $api } from '../../../../../lib/backend'
import { useEffect, useState } from 'react'
import { schema } from '@beta-lyfe/api'
import { toast } from 'sonner'

export type DoctorResponse =
schema.components["schemas"]["Api.Doctor.DoctorProfile"][]


export const Route = createFileRoute('/_app/_dashboard/dashboard/doctors/')({
  component: DoctorsPage
})




function DoctorsPage() {
  const [doctorsData,setDoctorsData]=useState<DoctorResponse>([])

  const {mutate}=$api.useMutation('get','/api/doctors',{
    onSuccess:(response)=>{
      if(response.code==='FETCH_DOCTOR_PROFILES_SUCCESSFUL'){
        setDoctorsData(response.data.data)
      }
    },
    onError:err=>{
      toast.error(err.code)
    }
  })


  useEffect(()=>{
    mutate({})
  },[])
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Find Doctors
          </h1>
          <p className="text-muted-foreground">
            Connect with healthcare professionals
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
          <Button size="sm" className="text-white">
            Book Appointment
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search doctors" className="pl-8" />
            </div>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent className="bg-white pr-4">
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent className="bg-white pr-4">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="next-week">Next Week</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Consultation Type" />
              </SelectTrigger>
              <SelectContent className="bg-white pr-4">
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Doctors list */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Doctors</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {doctorsData.map((doctor) => (
            <Card
              key={doctor.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 p-4 flex flex-col items-center md:items-start">
                    <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-2">
                      <AvatarImage src={doctor.profile_picture.url} alt={doctor.first_name} />
                      <AvatarFallback>
                        {doctor.first_name
                          }
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < parseFloat(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                        />
                      ))}
                      <span className="text-sm font-medium ml-1">
                        {doctor.rating}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                      {doctor.number_of_reviews}+ Reviews
                    </p>
                  </div>

                  <div className="flex-1 p-4 border-t md:border-t-0 md:border-l">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{doctor.first_name}</h3>
                        <p className="text-primary font-medium">
                          {doctor.specialization}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {true && (
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Clock className="h-3 w-3" /> Available today
                          </Badge>
                        )}
                        {true && (
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Video className="h-3 w-3" /> Video
                          </Badge>
                        )}
                       
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {doctor.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">
                          Next Available
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {/* {doctor.nextAvailable.map((slot, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Calendar className="h-3 w-3" /> {slot}
                            </Badge>
                          ))} */}
                        </div>
                      </div>
                      <div className="flex gap-2 sm:self-end">
                        <Button variant="outline" asChild>
                          <Link
                            to="/dashboard/doctors/$id"
                            params={{
                              id: doctor.id
                            }}
                          >
                            View Profile
                          </Link>
                        </Button>
                        <Button className="text-white">Book Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          {doctorsData
            .filter((d) => true)
            .map((doctor) => (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 p-4 flex flex-col items-center md:items-start">
                      <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-2">
                        <AvatarImage src={doctor.profile_picture.url} alt={doctor.first_name} />
                        <AvatarFallback>
                          {doctor.first_name
                           }
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < parseFloat(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">
                          {doctor.rating}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground text-center md:text-left">
                        {doctor.number_of_reviews}+ Reviews
                      </p>
                    </div>

                    <div className="flex-1 p-4 border-t md:border-t-0 md:border-l">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {doctor.first_name}
                          </h3>
                          <p className="text-primary font-medium">
                            {doctor.specialization}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Clock className="h-3 w-3" /> Available today
                          </Badge>
                          {true && (
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Video className="h-3 w-3" /> Video
                            </Badge>
                          )}
                         
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {doctor.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">
                            Next Available
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {/* {doctor.nextAvailable.map((slot, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <Calendar className="h-3 w-3" /> {slot}
                              </Badge>
                            ))} */}
                          </div>
                        </div>
                        <div className="flex gap-2 sm:self-end">
                          <Button variant="outline" asChild>
                            <Link
                              to="/dashboard/doctors/$id"
                              params={{ id: doctor.id }}
                            >
                              View Profile
                            </Link>
                          </Button>
                          <Button>Book Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="top-rated" className="space-y-4">
          {doctorsData
            .filter((d) => parseFloat(d.rating) >= 4.8)
            .map((doctor) => (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 p-4 flex flex-col items-center md:items-start">
                      <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-2">
                        <AvatarImage src={doctor.profile_picture.url} alt={doctor.first_name} />
                        <AvatarFallback>
                          {doctor.first_name
                            }
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < parseFloat(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">
                          {doctor.rating}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground text-center md:text-left">
                        {doctor.number_of_reviews}+ Reviews
                      </p>
                    </div>

                    <div className="flex-1 p-4 border-t md:border-t-0 md:border-l">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {doctor.first_name}
                          </h3>
                          <p className="text-primary font-medium">
                            {doctor.specialization}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {true && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Clock className="h-3 w-3" /> Available today
                            </Badge>
                          )}
                          {true && (
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Video className="h-3 w-3" /> Video
                            </Badge>
                          )}
                         
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {doctor.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">
                            Next Available
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {/* {doctor.nextAvailable.map((slot, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <Calendar className="h-3 w-3" /> {slot}
                              </Badge>
                            ))} */}
                          </div>
                        </div>
                        <div className="flex gap-2 sm:self-end">
                          <Button variant="outline" asChild>
                            <Link
                              to="/dashboard/doctors/$id"
                              params={{ id: doctor.id }}
                            >
                              View Profile
                            </Link>
                          </Button>
                          <Button>Book Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <p>Your favorite doctors will appear here.</p>
              <Button variant="outline" className="mt-4">
                Browse Doctors
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
