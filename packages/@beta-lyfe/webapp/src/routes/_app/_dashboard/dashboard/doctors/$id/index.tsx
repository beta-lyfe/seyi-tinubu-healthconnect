import { createFileRoute } from '@tanstack/react-router'

import { MainLayout } from "../../-components/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@beta-lyfe/ui/components/shad/ui/card"
import { Button } from "@beta-lyfe/ui/components/button"
import { Avatar, AvatarFallback, AvatarImage } from "@beta-lyfe/ui/components/shad/ui/avatar"
import { Badge } from "@beta-lyfe/ui/components/shad/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@beta-lyfe/ui/components/shad/ui/tabs"
import {
  Star,
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  Award,
  MessageSquare,
  Video,
  ThumbsUp,
  Heart,
  Languages,
  Stethoscope,
} from "lucide-react"



export const Route = createFileRoute('/_app/_dashboard/dashboard/doctors/$id/')({
  component: DoctorProfilePage
})

// Mock data for the doctor profile
const doctorData = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  rating: 4.8,
  reviews: 120,
  image: "/placeholder.svg?height=200&width=200&text=Dr.1",
  about:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating heart conditions. She specializes in preventive cardiology, heart failure management, and interventional procedures.",
  education: [
    { degree: "MD", institution: "Harvard Medical School", year: "2008" },
    { degree: "Residency in Internal Medicine", institution: "Massachusetts General Hospital", year: "2011" },
    { degree: "Fellowship in Cardiology", institution: "Johns Hopkins Hospital", year: "2014" },
  ],
  certifications: [
    "American Board of Internal Medicine",
    "American Board of Cardiology",
    "Advanced Cardiac Life Support (ACLS)",
  ],
  languages: ["English", "Spanish"],
  specializations: [
    "Preventive Cardiology",
    "Heart Failure Management",
    "Coronary Artery Disease",
    "Hypertension Management",
    "Cardiac Rehabilitation",
  ],
  availability: [
    { day: "Monday", slots: ["9:00 AM", "11:30 AM", "2:00 PM"] },
    { day: "Wednesday", slots: ["10:00 AM", "1:00 PM", "3:30 PM"] },
    { day: "Friday", slots: ["9:30 AM", "12:00 PM", "2:30 PM"] },
  ],
  location: "Cardiology Associates Medical Group, 123 Health Avenue, San Francisco, CA",
  consultationFee: "$150",
  patientReviews: [
    {
      name: "John D.",
      rating: 5,
      date: "2 months ago",
      comment:
        "Dr. Johnson was very thorough and took the time to explain my condition in detail. She answered all my questions and made me feel at ease.",
    },
    {
      name: "Maria S.",
      rating: 4,
      date: "3 months ago",
      comment: "Very knowledgeable doctor. The wait time was a bit long, but the quality of care was excellent.",
    },
    {
      name: "Robert T.",
      rating: 5,
      date: "5 months ago",
      comment:
        "Dr. Johnson helped me manage my heart condition effectively. Her treatment plan has significantly improved my quality of life.",
    },
  ],
}

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the doctor data based on the ID
  const doctor = doctorData

  return (


        <div className="space-y-6">
          {/* Doctor profile header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{doctor.reviews}+ Reviews</p>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold">{doctor.name}</h1>
                    <p className="text-primary font-medium">{doctor.specialty}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Available today
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Video className="h-3 w-3" /> Video consultation
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> Chat consultation
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Languages className="h-3 w-3" /> {doctor.languages.join(", ")}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground">{doctor.about}</p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 text-white">
                      <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctor details tabs */}
          <Tabs defaultValue="about">
            <TabsList className="mb-4 pl-36 w-full overflow-scroll">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience & Education</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Specializations</CardTitle>
                  <CardDescription>Areas of expertise and focus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {doctor.specializations.map((specialization, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-primary" />
                        <span>{specialization}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>Practice address</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p>{doctor.location}</p>
                      <Button variant="link" className="p-2 h-auto mt-2">
                        Get Directions
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 h-48 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Map will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consultation Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{doctor.consultationFee}</p>
                      <p className="text-sm text-muted-foreground">Per consultation</p>
                    </div>
                    <Button>Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Academic background and training</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <GraduationCap className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Professional certifications and licenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doctor.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary mt-1" />
                      <p>{cert}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Time Slots</CardTitle>
                  <CardDescription>Book your preferred time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {doctor.availability.map((day, index) => (
                      <div key={index}>
                        <h3 className="font-medium mb-3">{day.day}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {day.slots.map((slot, slotIndex) => (
                            <Button key={slotIndex} variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {slot}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>What others are saying about {doctor.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doctor.patientReviews.map((review, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-8">
                          <ThumbsUp className="h-4 w-4 mr-1" /> Helpful
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

  )
}

