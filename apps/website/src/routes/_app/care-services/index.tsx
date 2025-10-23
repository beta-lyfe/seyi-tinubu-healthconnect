import { createFileRoute, Link } from '@tanstack/react-router'

import {
  Video,
  Stethoscope,
  Pill,
  HeartPulse,
  Baby,
  Brain,
  Thermometer,
  Microscope,
  Activity,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  Star,
  ArrowRight
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@beta-lyfe/ui/components/shad/ui/accordion'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import WhatsAppButton from '@beta-lyfe/ui/components/whatappbtn'

export const Route = createFileRoute('/_app/care-services/')({
  component: CareServicesPage
})

function CareServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Comprehensive Healthcare Services
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Access quality healthcare services from licensed Nigerian
                    professionals, all from the comfort of your home.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="px-8">
                    <Link to="/signup">Book a Consultation</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8">
                    <Link to="/specialties">Find a Specialist</Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="/placeholder.svg?height=550&width=550&text=Healthcare+Services"
                  width={550}
                  height={550}
                  alt="Healthcare services illustration"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
                <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Stethoscope className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        36+ Medical Specialties
                      </p>
                      <p className="text-xl font-bold">2,500+ Care Providers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Primary Healthcare Services
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Seyi Tinubu Connect offers a complete healthcare ecosystem for Nigerians.
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Virtual Consultations</h3>
                  <p className="text-muted-foreground">
                    Connect with licensed Nigerian doctors via video, voice, or
                    chat. Get medical advice, prescriptions, and referrals from
                    the comfort of your home.
                  </p>
                  <ul className="text-left w-full space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 availability for urgent care</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Secure and private video sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Digital prescriptions and referrals</span>
                    </li>
                  </ul>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/virtual-consultations">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-green-600/10 rounded-full">
                    <Pill className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Online Pharmacy</h3>
                  <p className="text-muted-foreground">
                    Order prescription and over-the-counter medications online.
                    Enjoy fast delivery to your doorstep anywhere in Nigeria.
                  </p>
                  <ul className="text-left w-full space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Genuine medications from licensed sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Same-day delivery in major cities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Automatic refills and reminders</span>
                    </li>
                  </ul>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/pharmacy">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-purple-600/10 rounded-full">
                    <Stethoscope className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Specialist Care</h3>
                  <p className="text-muted-foreground">
                    Access specialists across 36+ medical fields including
                    pediatrics, gynecology, cardiology, dermatology, and mental
                    health.
                  </p>
                  <ul className="text-left w-full space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Board-certified specialists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Comprehensive care plans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Follow-up appointments and monitoring</span>
                    </li>
                  </ul>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/specialties">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specialist Care Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Specialist Care
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Medical Specialties
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access expert care across a wide range of medical specialties
                </p>
              </div>
            </div>

            <Tabs defaultValue="popular" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="popular">Popular Specialties</TabsTrigger>
                <TabsTrigger value="chronic">Chronic Conditions</TabsTrigger>
                <TabsTrigger value="preventive">Preventive Care</TabsTrigger>
                <TabsTrigger value="mental">Mental Health</TabsTrigger>
              </TabsList>

              <TabsContent value="popular" className="mt-0">
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {[
                    {
                      name: 'General Medicine',
                      icon: <Stethoscope className="h-6 w-6" />,
                      count: 350
                    },
                    {
                      name: 'Pediatrics',
                      icon: <Baby className="h-6 w-6" />,
                      count: 215
                    },
                    {
                      name: 'Gynecology',
                      icon: <HeartPulse className="h-6 w-6" />,
                      count: 180
                    },
                    {
                      name: 'Cardiology',
                      icon: <Activity className="h-6 w-6" />,
                      count: 120
                    },
                    {
                      name: 'Dermatology',
                      icon: <Thermometer className="h-6 w-6" />,
                      count: 95
                    },
                    {
                      name: 'Orthopedics',
                      icon: <Activity className="h-6 w-6" />,
                      count: 85
                    },
                    {
                      name: 'Neurology',
                      icon: <Brain className="h-6 w-6" />,
                      count: 75
                    },
                    {
                      name: 'Ophthalmology',
                      icon: <Microscope className="h-6 w-6" />,
                      count: 65
                    }
                  ].map((specialty, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          {specialty.icon}
                        </div>
                        <h3 className="font-bold">{specialty.name}</h3>
                        <Badge variant="outline">
                          {specialty.count} Specialists
                        </Badge>
                        <Button asChild variant="link" className="mt-2 p-0">
                          <a
                            href={`/specialty/${specialty.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            Find Specialists
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chronic" className="mt-0">
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {[
                    {
                      name: 'Diabetes Care',
                      icon: <Thermometer className="h-6 w-6" />,
                      count: 110
                    },
                    {
                      name: 'Hypertension',
                      icon: <Activity className="h-6 w-6" />,
                      count: 125
                    },
                    {
                      name: 'Asthma',
                      icon: <HeartPulse className="h-6 w-6" />,
                      count: 85
                    },
                    {
                      name: 'Arthritis',
                      icon: <Activity className="h-6 w-6" />,
                      count: 70
                    }
                  ].map((specialty, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          {specialty.icon}
                        </div>
                        <h3 className="font-bold">{specialty.name}</h3>
                        <Badge variant="outline">
                          {specialty.count} Specialists
                        </Badge>
                        <Button asChild variant="link" className="mt-2 p-0">
                          <a
                            href={`/specialty/${specialty.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            Find Specialists
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="preventive" className="mt-0">
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {[
                    {
                      name: 'Wellness Checks',
                      icon: <CheckCircle2 className="h-6 w-6" />,
                      count: 180
                    },
                    {
                      name: 'Nutrition',
                      icon: <Pill className="h-6 w-6" />,
                      count: 95
                    },
                    {
                      name: 'Vaccination',
                      icon: <Shield className="h-6 w-6" />,
                      count: 75
                    },
                    {
                      name: 'Health Screening',
                      icon: <Microscope className="h-6 w-6" />,
                      count: 110
                    }
                  ].map((specialty, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          {specialty.icon}
                        </div>
                        <h3 className="font-bold">{specialty.name}</h3>
                        <Badge variant="outline">
                          {specialty.count} Specialists
                        </Badge>
                        <Button asChild variant="link" className="mt-2 p-0">
                          <a
                            href={`/specialty/${specialty.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            Find Specialists
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mental" className="mt-0">
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {[
                    {
                      name: 'Psychiatry',
                      icon: <Brain className="h-6 w-6" />,
                      count: 65
                    },
                    {
                      name: 'Psychology',
                      icon: <Brain className="h-6 w-6" />,
                      count: 85
                    },
                    {
                      name: 'Therapy',
                      icon: <HeartPulse className="h-6 w-6" />,
                      count: 95
                    },
                    {
                      name: 'Counseling',
                      icon: <HeartPulse className="h-6 w-6" />,
                      count: 110
                    }
                  ].map((specialty, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          {specialty.icon}
                        </div>
                        <h3 className="font-bold">{specialty.name}</h3>
                        <Badge variant="outline">
                          {specialty.count} Specialists
                        </Badge>
                        <Button asChild variant="link" className="mt-2 p-0">
                          <a
                            href={`/specialty/${specialty.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            Find Specialists
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/specialties">View All Specialties</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Plans Section */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Service Plans
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Choose Your Healthcare Plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Flexible plans designed to meet your healthcare needs
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle>Basic Plan</CardTitle>
                  <CardDescription>Essential healthcare services for individuals</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">₦5,000</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>4 virtual consultations per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Access to general practitioners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Digital prescriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>5% discount on medications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 chat support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/signup?plan=basic">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-2 border-primary relative">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Premium Plan</CardTitle>
                  <CardDescription>Comprehensive healthcare for individuals and families</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">₦12,000</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Unlimited virtual consultations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Access to all specialists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Digital prescriptions and referrals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>15% discount on medications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Priority appointment scheduling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/signup?plan=premium">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle>Family Plan</CardTitle>
                  <CardDescription>Complete healthcare for up to 5 family members</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">₦25,000</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Unlimited virtual consultations for all members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Access to all specialists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Digital prescriptions and referrals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>20% discount on medications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Family health records management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/signup?plan=family">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section> */}

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Why Choose Seyi Tinubu Connect
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  The Benefits of Our Healthcare Services
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Experience healthcare that's designed around your needs and
                  lifestyle.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Convenient Access</h3>
                      <p className="text-muted-foreground">
                        Access healthcare services 24/7 from anywhere in
                        Nigeria. No more long waits or travel time.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Quality Assurance</h3>
                      <p className="text-muted-foreground">
                        All our healthcare providers are licensed, verified, and
                        continuously evaluated for quality care.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Flexible Scheduling</h3>
                      <p className="text-muted-foreground">
                        Book appointments at times that work for you, with
                        options for same-day consultations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Stethoscope className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Comprehensive Care</h3>
                      <p className="text-muted-foreground">
                        From preventive care to specialist consultations, we
                        offer a full spectrum of healthcare services.
                      </p>
                    </div>
                  </div>
                </div>
                <Button asChild className="mt-4">
                  <Link to="/about-us">Learn More About Us</Link>
                </Button>
              </div>
              <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=500&width=600&text=Healthcare+Benefits"
                  alt="Seyi Tinubu Connect Healthcare Benefits"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  What Our Patients Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Real experiences from Nigerians who have used our healthcare
                  services
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    'Seyi Tinubu Connect has transformed how I manage my diabetes. The regular consultations with my specialist and medication delivery service have made my life so much easier.',
                  author: 'Oluwaseun Adeyemi',
                  location: 'Lagos',
                  rating: 5,
                  service: 'Chronic Care'
                },
                {
                  quote:
                    'As a busy mother of three, being able to consult with pediatricians without leaving home has been a game-changer. The doctors are professional and caring.',
                  author: 'Amina Ibrahim',
                  location: 'Abuja',
                  rating: 5,
                  service: 'Pediatrics'
                },
                {
                  quote:
                    "I was skeptical about virtual consultations, but my experience with Seyi Tinubu Connect's dermatologist was excellent. Clear diagnosis, effective treatment, and convenient follow-ups.",
                  author: 'Chinedu Okonkwo',
                  location: 'Port Harcourt',
                  rating: 4,
                  service: 'Dermatology'
                }
              ].map((testimonial, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`}
                          />
                        ))}
                    </div>
                    <Badge className="mb-4">{testimonial.service}</Badge>
                    <blockquote className="text-lg mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-muted">
                        <img
                          src={`/placeholder.svg?height=40&width=40&text=${testimonial.author.charAt(0)}`}
                          alt={testimonial.author}
                          width={40}
                          height={40}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  FAQs
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our healthcare services
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do virtual consultations work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Virtual consultations take place through our secure video
                    platform. After booking an appointment, you'll receive a
                    link to join the video call at the scheduled time. During
                    the consultation, the doctor will discuss your symptoms,
                    provide a diagnosis, and recommend treatment. If needed,
                    they can issue prescriptions or referrals, which will be
                    available in your account immediately.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    What types of conditions can be treated through Seyi Tinubu Connect?
                  </AccordionTrigger>
                  <AccordionContent>
                    Seyi Tinubu Connect can address a wide range of conditions, including
                    common illnesses (cold, flu, allergies), chronic disease
                    management (diabetes, hypertension), skin conditions, mental
                    health concerns, pediatric issues, and more. However,
                    emergency situations requiring immediate physical
                    intervention should be directed to the nearest emergency
                    room.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How much do consultations cost?
                  </AccordionTrigger>
                  <AccordionContent>
                    Consultation fees vary depending on the type of specialist
                    and whether you have a subscription plan. General
                    practitioner consultations start at ₦3,000, while specialist
                    consultations range from ₦5,000 to ₦15,000. With our
                    subscription plans, you can access consultations at reduced
                    rates or as part of your monthly package.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Are the doctors on Seyi Tinubu Connect licensed?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, all healthcare providers on Seyi Tinubu Connect are licensed and
                    registered with the appropriate Nigerian medical boards and
                    councils. We verify credentials, experience, and standing
                    with regulatory bodies before onboarding any provider. You
                    can view each doctor's qualifications and licensing
                    information on their profile.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How quickly can I get an appointment?
                  </AccordionTrigger>
                  <AccordionContent>
                    Appointment availability varies by specialty and provider.
                    For general consultations, same-day appointments are often
                    available. For specialists, you may need to book 1-3 days in
                    advance. Premium and Family plan members receive priority
                    scheduling and can often secure same-day appointments with
                    specialists.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Can I use health insurance with Seyi Tinubu Connect?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, Seyi Tinubu Connect works with several health insurance providers
                    in Nigeria. During registration, you can add your insurance
                    information, and we'll verify your coverage. Depending on
                    your policy, consultations and medications may be partially
                    or fully covered. We're continuously expanding our insurance
                    partnerships to serve more patients.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to experience better healthcare?
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Join thousands of Nigerians who are already using Seyi Tinubu Connect for
                  convenient, quality healthcare services.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" variant="secondary" className="px-8">
                  <Link to="/get-the-app">Download the App</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8"
                >
                  <Link to="/signup">Create Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Seyi Tinubu Connect. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  )
}
