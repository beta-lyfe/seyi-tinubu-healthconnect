import { MainLayout } from "../-components/main-layout"
import { Card, CardContent } from "@beta-lyfe/ui/components/shad/ui/card"
import { Button } from "@beta-lyfe/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@beta-lyfe/ui/components/shad/ui/avatar"
import { Badge } from "@beta-lyfe/ui/components/shad/ui/badge"
import { Input } from "@beta-lyfe/ui/components/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@beta-lyfe/ui/components/shad/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@beta-lyfe/ui/components/shad/ui/select"
import { Search, Star, Calendar, Clock, Filter, MessageSquare, Video } from "lucide-react"
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_dashboard/dashboard/doctors/')({
  component: DoctorsPage
})
// Mock data for doctors
const doctorsData = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 120,
    image: "/placeholder.svg?height=96&width=96&text=Dr.1",
    description:
      "Board-certified cardiologist with over 10 years of experience in treating heart conditions. Specializes in preventive cardiology and heart failure management.",
    availableToday: true,
    nextAvailable: ["Today, 2:00 PM", "Tomorrow, 10:00 AM"],
    consultationTypes: ["video", "chat"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 95,
    image: "/placeholder.svg?height=96&width=96&text=Dr.2",
    description:
      "Experienced dermatologist specializing in skin cancer detection, acne treatment, and cosmetic procedures. Passionate about helping patients achieve healthy skin.",
    availableToday: false,
    nextAvailable: ["Tomorrow, 1:30 PM", "Friday, 11:00 AM"],
    consultationTypes: ["video"],
  },
  {
    id: "3",
    name: "Dr. Rachel Patel",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 88,
    image: "/placeholder.svg?height=96&width=96&text=Dr.3",
    description:
      "Neurologist with expertise in headache disorders, epilepsy, and neurodegenerative diseases. Committed to providing compassionate and comprehensive neurological care.",
    availableToday: true,
    nextAvailable: ["Today, 4:15 PM", "Wednesday, 9:30 AM"],
    consultationTypes: ["video", "chat"],
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    rating: 4.6,
    reviews: 110,
    image: "/placeholder.svg?height=96&width=96&text=Dr.4",
    description:
      "Orthopedic surgeon specializing in sports medicine, joint replacement, and minimally invasive procedures. Dedicated to helping patients regain mobility and function.",
    availableToday: false,
    nextAvailable: ["Thursday, 2:45 PM", "Friday, 10:30 AM"],
    consultationTypes: ["video"],
  },
]

function DoctorsPage() {
  return (
   
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Find Doctors</h1>
              <p className="text-muted-foreground">Connect with healthcare professionals</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" /> Filters
              </Button>
              <Button size="sm" className="text-white">Book Appointment</Button>
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
                  <SelectContent  className="bg-white pr-4">
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
                  <SelectContent  className="bg-white pr-4">
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
                <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 p-4 flex flex-col items-center md:items-start">
                        <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-2">
                          <AvatarImage src={doctor.image} alt={doctor.name} />
                          <AvatarFallback>
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                            />
                          ))}
                          <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                          {doctor.reviews}+ Reviews
                        </p>
                      </div>

                      <div className="flex-1 p-4 border-t md:border-t-0 md:border-l">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <p className="text-primary font-medium">{doctor.specialty}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {doctor.availableToday && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Available today
                              </Badge>
                            )}
                            {doctor.consultationTypes.includes("video") && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Video className="h-3 w-3" /> Video
                              </Badge>
                            )}
                            {doctor.consultationTypes.includes("chat") && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" /> Chat
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{doctor.description}</p>

                        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">Next Available</p>
                            <div className="flex flex-wrap gap-2">
                              {doctor.nextAvailable.map((slot, index) => (
                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" /> {slot}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 sm:self-end">
                            <Button variant="outline" asChild >
                              <Link to="/dashboard/doctors/$id" params={{
                                id:doctor.id
                              }}>View Profile</Link>
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
                .filter((d) => d.availableToday)
                .map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 p-4 flex flex-col items-center md:items-start">
                          <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-2">
                            <AvatarImage src={doctor.image} alt={doctor.name} />
                            <AvatarFallback>
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                              />
                            ))}
                            <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground text-center md:text-left">
                            {doctor.reviews}+ Reviews
                          </p>
                        </div>

                        <div className="flex-1 p-4 border-t md:border-t-0 md:border-l">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{doctor.name}</h3>
                              <p className="text-primary font-medium">{doctor.specialty}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Available today
                              </Badge>
                              {doctor.consultationTypes.includes("video") && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Video className="h-3 w-3" /> Video
                                </Badge>
                              )}
                              {doctor.consultationTypes.includes("chat") && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" /> Chat
                                </Badge>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">{doctor.description}</p>

                          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-1">Next Available</p>
                              <div className="flex flex-wrap gap-2">
                                {doctor.nextAvailable.map((slot, index) => (
                                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> {slot}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 sm:self-end">
                              <Button variant="outline" asChild>
                                <Link to='/dashboard/doctors/$id' params={{id:doctor.id}}>View Profile</Link>
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
                .filter((d) => d.rating >= 4.8)
                .map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 p-4 flex flex-col items-center md:items-start">
                          <Avatar className="h-20 w-20 md:h-24 md:w-24 mb-2">
                            <AvatarImage src={doctor.image} alt={doctor.name} />
                            <AvatarFallback>
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                              />
                            ))}
                            <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground text-center md:text-left">
                            {doctor.reviews}+ Reviews
                          </p>
                        </div>

                        <div className="flex-1 p-4 border-t md:border-t-0 md:border-l">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{doctor.name}</h3>
                              <p className="text-primary font-medium">{doctor.specialty}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {doctor.availableToday && (
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> Available today
                                </Badge>
                              )}
                              {doctor.consultationTypes.includes("video") && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Video className="h-3 w-3" /> Video
                                </Badge>
                              )}
                              {doctor.consultationTypes.includes("chat") && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" /> Chat
                                </Badge>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">{doctor.description}</p>

                          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-1">Next Available</p>
                              <div className="flex flex-wrap gap-2">
                                {doctor.nextAvailable.map((slot, index) => (
                                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> {slot}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 sm:self-end">
                              <Button variant="outline" asChild>
                                <Link to='/dashboard/doctors/$id' params={{id:doctor.id}}>View Profile</Link>
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

