import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@beta-lyfe/ui/components/shad//ui/card'
import { Button } from '@beta-lyfe/ui/components/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@beta-lyfe/ui/components/shad//ui/avatar'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import { Progress } from '@beta-lyfe/ui/components/shad/ui/progress'
import {
  Calendar,
  Clock,
  Users,
  Star,
  GraduationCap,
  Award,
  MessageSquare,
  Video,
  ThumbsUp,
  Languages,
  Stethoscope,
  MapPin,
  Mail,
  Phone,
  Edit,
  Share2,
  Bookmark
} from 'lucide-react'

export const Route = createFileRoute('/_app/_doctor/doctor/dashboard/profile/')(
  {
    component: DoctorProfilePage
  }
)

import {
  FileText,
  Upload,
  Eye,
  DollarSign,
  Settings,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  ArrowUpRight
} from 'lucide-react'

export default function DoctorProfilePage() {
  // In a real app, this data would come from an API or database
  const doctorData = {
    patientReviews: [] as {
      name: string
      date: string
      comment: string
    }[],
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.8,
    reviews: 120,
    image: '/placeholder.svg?height=200&width=200&text=Dr.J',
    about:
      'Board-certified cardiologist with over 10 years of experience in treating heart conditions. Specializes in preventive cardiology, heart failure management, and interventional procedures.',
    education: [
      { degree: 'MD', institution: 'Harvard Medical School', year: '2008' },
      {
        degree: 'Residency in Internal Medicine',
        institution: 'Massachusetts General Hospital',
        year: '2011'
      },
      {
        degree: 'Fellowship in Cardiology',
        institution: 'Johns Hopkins Hospital',
        year: '2014'
      }
    ],
    certifications: [
      'American Board of Internal Medicine',
      'American Board of Cardiology',
      'Advanced Cardiac Life Support (ACLS)'
    ],
    languages: ['English', 'Spanish'],
    specializations: [
      'Preventive Cardiology',
      'Heart Failure Management',
      'Coronary Artery Disease',
      'Hypertension Management',
      'Cardiac Rehabilitation'
    ],
    availability: [
      { day: 'Monday', slots: ['9:00 AM', '11:30 AM', '2:00 PM'] },
      { day: 'Wednesday', slots: ['10:00 AM', '1:00 PM', '3:30 PM'] },
      { day: 'Friday', slots: ['9:30 AM', '12:00 PM', '2:30 PM'] }
    ],
    location:
      'Cardiology Associates Medical Group, 123 Health Avenue, San Francisco, CA',
    contact: {
      email: 'dr.sarah.johnson@betalyfe.com',
      phone: '+1 (555) 123-4567'
    },
    consultationFee: '₦150',
    profileCompletion: 85,
    stats: {
      patients: 142,
      consultationsThisMonth: 28,
      upcomingAppointments: 8,
      pendingReviews: 3,
      earnings: {
        thisMonth: '₦4,250',
        lastMonth: '₦3,850',
        change: '+10.4%'
      }
    },
    upcomingAppointments: [
      {
        patientName: 'John Doe',
        patientImage: '/placeholder.svg?height=40&width=40',
        type: 'Video',
        date: 'Today',
        time: '10:00 AM',
        reason: 'Follow-up for heart condition'
      },
      {
        patientName: 'Maria Garcia',
        patientImage: '/placeholder.svg?height=40&width=40',
        type: 'Chat',
        date: 'Today',
        time: '11:30 AM',
        reason: 'Initial consultation for chest pain'
      },
      {
        patientName: 'Robert Brown',
        patientImage: '/placeholder.svg?height=40&width=40',
        type: 'Video',
        date: 'Tomorrow',
        time: '2:00 PM',
        reason: 'Initial consultation for hypertension'
      }
    ]
  }

  return (
    <div className="space-y-6 overflow-x-clip">
      {/* Profile header with completion status */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="relative h-40 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20">
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Eye className="h-4 w-4 mr-2" /> Public View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
          </div>
        </div>

        <CardContent className="p-6 pt-0 -mt-16">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-background dark:border-gray-950 shadow-lg">
                  <AvatarImage src={doctorData.image} alt={doctorData.name} />
                  <AvatarFallback className="text-2xl">
                    {doctorData.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-background dark:bg-gray-950 shadow"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ₦{
                      i < Math.floor(doctorData.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-2 font-medium">{doctorData.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({doctorData.reviews} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Languages className="h-3 w-3" />{' '}
                  {doctorData.languages.join(', ')}
                </Badge>
                <Button variant="outline" size="sm" className="h-6">
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-4 mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold">{doctorData.name}</h1>
                  <p className="text-primary font-medium">
                    {doctorData.specialty}
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      Profile Completion
                    </span>
                    <span className="text-sm font-medium">
                      {doctorData.profileCompletion}%
                    </span>
                  </div>
                  <Progress
                    value={doctorData.profileCompletion}
                    className="h-2"
                  />
                  {doctorData.profileCompletion < 100 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete your profile to increase visibility
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <p className="text-sm">{doctorData.location}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                  <p className="text-sm">{doctorData.contact.email}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                  <p className="text-sm">{doctorData.contact.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg dark:bg-gray-900">
                  <p className="text-xl font-bold">
                    {doctorData.stats.patients}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Patients
                  </p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg dark:bg-gray-900">
                  <p className="text-xl font-bold">
                    {doctorData.stats.consultationsThisMonth}
                  </p>
                  <p className="text-sm text-muted-foreground">Consultations</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg dark:bg-gray-900">
                  <p className="text-xl font-bold">
                    {doctorData.stats.upcomingAppointments}
                  </p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg dark:bg-gray-900">
                  <div className="flex items-center">
                    <p className="text-xl font-bold">
                      {doctorData.stats.earnings.thisMonth}
                    </p>
                    <Badge className="ml-2 h-5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      <ArrowUpRight className="h-3 w-3 mr-1" />{' '}
                      {doctorData.stats.earnings.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button className="flex-1" asChild>
                  <a href="#!">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/doctor/dashboard/appointments">
                    <Calendar className="mr-2 h-4 w-4" /> Manage Availability
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctor profile tabs */}
      <Tabs defaultValue="appointments">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="about">About Me</TabsTrigger>
          <TabsTrigger value="experience">Experience & Education</TabsTrigger>
          <TabsTrigger value="reviews">Reviews & Feedback</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    Your scheduled consultations for today and tomorrow
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link to="/doctor/dashboard/appointments">
                    View All Appointments
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctorData.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`bg-primary/10 p-3 rounded-md dark:bg-primary/20`}
                  >
                    {appointment.type === 'Video' ? (
                      <Video className="h-6 w-6 text-primary" />
                    ) : (
                      <MessageSquare className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">
                          {appointment.patientName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.reason}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Calendar className="h-3 w-3" /> {appointment.date}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" /> {appointment.time}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={appointment.patientImage}
                            alt={appointment.patientName}
                          />
                          <AvatarFallback>
                            {appointment.patientName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {appointment.type} Consultation
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            to="/doctor/dashboard/patients/$id"
                            params={{
                              id: appointment.patientName
                                .toLowerCase()
                                .replace(/\s+/g, '-')
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" /> View Records
                          </Link>
                        </Button>
                        <Button size="sm">
                          {appointment.type === 'Video' ? (
                            <>
                              <Video className="mr-2 h-4 w-4" /> Start Call
                            </>
                          ) : (
                            <>
                              <MessageSquare className="mr-2 h-4 w-4" /> Start
                              Chat
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/doctor/dashboard/appointments">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Availability Slots
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Actions</CardTitle>
                <CardDescription>
                  Items that require your attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-md">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    <div>
                      <p className="font-medium">Appointment Requests</p>
                      <p className="text-sm text-muted-foreground">
                        2 new requests need approval
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-md">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                    <div>
                      <p className="font-medium">Unread Messages</p>
                      <p className="text-sm text-muted-foreground">
                        5 messages from patients
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-500" />
                    <div>
                      <p className="font-medium">Prescription Renewals</p>
                      <p className="text-sm text-muted-foreground">
                        3 renewals pending review
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Process
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>
                  Patients you've recently consulted with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&text=P₦{index + 1}`}
                          alt="Patient"
                        />
                        <AvatarFallback>P{index + 1}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">
                            {
                              ['John Doe', 'Maria Garcia', 'Robert Brown'][
                                index
                              ]
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {['2h ago', 'Yesterday', '3d ago'][index]}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {
                            [
                              'Follow-up for heart condition',
                              'Initial consultation for chest pain',
                              'Prescription renewal for hypertension'
                            ][index]
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/doctor/patients">
                    <Users className="mr-2 h-4 w-4" /> View All Patients
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>About Me</CardTitle>
                  <CardDescription>
                    Your professional summary and specializations
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{doctorData.about}</p>

              <h3 className="font-medium mb-3">Specializations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doctorData.specializations.map((specialization, index) => (
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Location & Practice</CardTitle>
                  <CardDescription>
                    Your office location and practice details
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p>{doctorData.location}</p>
                </div>
              </div>

              <div className="mt-4 h-48 bg-muted rounded-md flex items-center justify-center dark:bg-gray-800">
                <p className="text-muted-foreground">
                  Map will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Consultation Fees</CardTitle>
                  <CardDescription>
                    Your current consultation pricing
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md dark:border-gray-800">
                  <div>
                    <p className="font-medium">Video Consultation</p>
                    <p className="text-sm text-muted-foreground">
                      30 minutes session
                    </p>
                  </div>
                  <p className="font-semibold">{doctorData.consultationFee}</p>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md dark:border-gray-800">
                  <div>
                    <p className="font-medium">Chat Consultation</p>
                    <p className="text-sm text-muted-foreground">
                      Asynchronous messaging
                    </p>
                  </div>
                  <p className="font-semibold">₦75</p>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md dark:border-gray-800">
                  <div>
                    <p className="font-medium">Follow-up Consultation</p>
                    <p className="text-sm text-muted-foreground">
                      15 minutes session
                    </p>
                  </div>
                  <p className="font-semibold">₦100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Your academic background and training
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctorData.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>
                    Your professional certifications and licenses
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {doctorData.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary mt-1" />
                  <p>{cert}</p>
                </div>
              ))}
              <Button variant="ghost" className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Languages</CardTitle>
                  <CardDescription>
                    Languages you speak with patients
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctorData.languages.map((language, index) => (
                  <Badge key={index} className="px-3 py-1">
                    {language}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-7">
                  <PlusCircle className="mr-2 h-3 w-3" /> Add Language
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>Feedback from your patients</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="#!">View All Reviews</a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg dark:bg-gray-900">
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ₦{
                            i < Math.floor(doctorData.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">
                      {doctorData.rating} out of 5
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on {doctorData.reviews} reviews
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Response Rate</p>
                  <p className="text-sm text-muted-foreground">
                    You've responded to 92% of reviews
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {doctorData.patientReviews.slice(0, 2).map((review, index) => (
                  <div
                    key={index}
                    className="border-b last:border-b-0 pb-6 last:pb-0 dark:border-gray-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ₦{
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" /> Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" /> Respond to Pending
                Reviews ({doctorData.stats.pendingReviews})
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Analytics</CardTitle>
              <CardDescription>
                Insights from your patient reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg dark:bg-gray-900">
                  <p className="text-xl font-bold">98%</p>
                  <p className="text-sm text-muted-foreground">
                    Positive Feedback
                  </p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg dark:bg-gray-900">
                  <p className="text-xl font-bold">4.9/5</p>
                  <p className="text-sm text-muted-foreground">Communication</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg dark:bg-gray-900">
                  <p className="text-xl font-bold">4.8/5</p>
                  <p className="text-sm text-muted-foreground">
                    Treatment Quality
                  </p>
                </div>
              </div>

              <div className="mt-6 h-48 bg-muted rounded-md flex items-center justify-center dark:bg-gray-800">
                <p className="text-muted-foreground">
                  Review trends chart will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your financial summary</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/doctor/dashboard/earnings">
                    View Detailed Report
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold">
                    {doctorData.stats.earnings.thisMonth}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      <ArrowUpRight className="h-3 w-3 mr-1" />{' '}
                      {doctorData.stats.earnings.change}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      from last month
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Last Month: </p>
                  <p className="font-medium">
                    {doctorData.stats.earnings.lastMonth}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Video Consultations
                  </span>
                  <span className="font-medium">₦3,200.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Chat Consultations
                  </span>
                  <span className="font-medium">₦850.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Prescription Fees
                  </span>
                  <span className="font-medium">₦200.00</span>
                </div>
              </div>

              <div className="mt-6 h-48 bg-muted rounded-md flex items-center justify-center dark:bg-gray-800">
                <p className="text-muted-foreground">
                  Earnings chart will be displayed here
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Next Payout</p>
                    <p className="text-sm text-muted-foreground">
                      Scheduled for June 15, 2023
                    </p>
                  </div>
                  <p className="font-semibold">
                    {doctorData.stats.earnings.thisMonth}
                  </p>
                </div>
                <Button variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" /> Request Early Payout
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest earnings activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                        <Calendar className="h-3 w-3" /> Today
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
                        <Calendar className="h-3 w-3" /> Yesterday
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
                        <Calendar className="h-3 w-3" /> 2 days ago
                      </Badge>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        +₦25.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="w-full flex justify-center items-center">
        <Link to="/auth/sign-in">
          <Button className="text-white">Logout</Button>
        </Link>
      </div>
    </div>
  )
}
