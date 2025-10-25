import { createFileRoute } from '@tanstack/react-router'

import { ArrowLeft, Loader2Icon } from 'lucide-react'
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
  Video,
  Calendar,
  ClipboardList,
  MessageSquare,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Menu,
  Phone,
  MapPin,
  Pill,
  Stethoscope,
  Users,
  Map,
  Award
} from 'lucide-react'

import WhatsAppButton from '@beta-lyfe/ui/components/whatappbtn'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage
})

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-30 xl:py-36  bg-green-600
         ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 mb-4">
                  <div className=' text-md text-left font-semibold text-white rounded-full rounded-br-none bg-green-400 px-8 py-3 w-fit mb-6'>
                    <p>YOUR HEALTH IS OUR PRIORITY</p>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white pb-12">                
                   Redefining Access to Healthcare in Nigeria
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-white">
                   Seyi Tinubu Health Initiative is a tech-driven health initiative using telehealth to deliver free medical consultations and essential drug access to Nigeria’s most vulnerable. Through a mobile-first platform, underserved mothers and children can now connect with doctors, access care, and receive medications anytime, anywhere.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="px-8 text-white">
                    Book a Consultation
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8  rounded-full border-none bg-orange-500 text-white">
                    <div className="flex items-end gap-4">
                    <p>Visit Our Pharmacy </p>
                    <div className=' rounded-full bg-white p-1'>
                       <ArrowRight className=' text-orange-500'/>
                      </div>
                    </div>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-10 rounded-full border-white bg-transparent text-white">
                    <p>Contact us</p>
                  </Button>
                </div>
                
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="/public/images/seyi1.png"
                  width={550}
                  height={550}
                  alt="Doctor on video call with patient"
                  className="mx-auto overflow-hidden rounded-xl object-cover"
                />
                {/* <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Average wait time</p>
                      <p className="text-xl font-bold">Under 5 minutes</p>
                    </div>
                  </div>
                 </div> */}
              </div> 
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-20 lg:py-16 lg:px-52 ">
          <div className="grid grid-cols-2 bg-white gap-4 md:grid-cols-4 mt-8">
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-3xl font-bold text-primary">2,500+</span>
              <span className="text-sm text-muted-foreground text-center font-semibold text-black">
                Care Providers
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-3xl font-bold text-primary">36+</span>
              <span className="text-sm text-muted-foreground text-center font-semibold text-black">
                Specialties
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-3xl font-bold text-primary ">100%</span>
              <span className="text-sm text-muted-foreground text-center font-semiboldx text-black">
                States in Nigeria + FCT
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-3xl font-bold text-primary">8,000+</span>
              <span className="text-sm text-muted-foreground text-center font-semibold text-black">
                Completed Appointments
              </span>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Comprehensive Healthcare Solutions
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
                  <Button asChild variant="link" className="mt-2">
                    <p>
                      Find a Doctor <ArrowRight className="ml-2 h-4 w-4" />
                    </p>
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
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/pharmacy">
                      Visit Pharmacy <ArrowRight className="ml-2 h-4 w-4" />
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
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/specialties">
                      Explore Specialties{' '}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  How To Use
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, secure, and convenient
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the care you need in three easy steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Download & Register',
                  description:
                    'Download the STConnect app from Google Play or App Store. Create your account in minutes.'
                },
                {
                  step: '02',
                  title: 'Choose a Specialist',
                  description:
                    'Browse our network of 2,500+ Nigerian healthcare providers and select a specialist.'
                },
                {
                  step: '03',
                  title: 'Consult & Get Care',
                  description:
                    'Connect via video call, receive diagnosis, prescriptions, and order medications if needed.'
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl text-center font-bold">
                      {step.title}
                    </h3>
                    <p className="text-center text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="absolute left-[calc(50%+4rem)] top-8 hidden h-0.5 w-[calc(100%-8rem)] bg-border md:block" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild size="lg" className="px-8 text-white">
                <Link to="/get-the-app">Download the App</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Care Providers Section */}
        <section id="care-providers" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Care Providers
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Meet Our Healthcare Professionals
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our network includes 2,500+ licensed Nigerian doctors across
                  36+ specialties.
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: 'Dr. Adebayo Johnson',
                  specialty: 'Cardiology',
                  experience: '15+ years',
                  img: '/images/doctor1.png'
                },
                {
                  name: 'Dr. Ngozi Okafor',
                  specialty: 'Pediatrics',
                  experience: '12+ years',
                  img: '/images/doctor2.png'
                },
                {
                  name: 'Dr. Emeka Nwachukwu',
                  specialty: 'Dermatology',
                  experience: '10+ years',
                  img: '/images/doctor3.png'
                },
                {
                  name: 'Dr. Fatima Bello',
                  specialty: 'Gynecology',
                  experience: '14+ years',
                  img: '/images/doctor4.png'
                }
              ].map((doctor, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={doctor.img || '/placeholder.svg'}
                      alt={doctor.name}
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doctor.specialty}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {doctor.experience} experience
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="p-2 h-auto mt-2 hover:bg-primary hover:text-white no-underline"
                    >
                      <p>View Profile</p>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild variant="outline">
                <p>View All Care Providers</p>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What our users are saying
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from Nigerians who have experienced better healthcare
                  through Seyi Tinubu Connect.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  quote:
                    'Seyi Tinubu Connect saved me hours of travel time. I consulted with a dermatologist from Lagos while I was in Abuja, and received my medication the next day.',
                  author: 'Chioma Eze',
                  location: 'Abuja',
                  rating: 5
                },
                {
                  quote:
                    'As a busy professional, being able to consult with a doctor without leaving my office has been a game-changer. The service is fast, reliable, and the doctors are excellent.',
                  author: 'Oluwaseun Adeyemi',
                  location: 'Lagos',
                  rating: 5
                },
                {
                  quote:
                    'I was skeptical about telehealth, but Seyi Tinubu Connect changed my mind. The quality of care is outstanding, and the pharmacy delivery service is prompt and reliable.',
                  author: 'Emmanuel Okonkwo',
                  location: 'Port Harcourt',
                  rating: 4
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
                    <blockquote className="text-lg mb-4">
                      {testimonial.quote}
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

        {/* Coverage Map Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Nationwide Coverage
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Serving All 36 States and FCT
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Seyi Tinubu Connect provides healthcare services and medication delivery
                  across all of Nigeria. No matter where you are, quality
                  healthcare is just a tap away.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>2,500+ Care Providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span>36+ Medical Specialties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    <span>100% Geographic Coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Medication Delivery Nationwide</span>
                  </div>
                </div>
                <Button asChild className="mt-4 text-white">
                  <p>Check Availability in Your Area</p>
                </Button>
              </div>
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Nigeria+Map"
                  alt="Map of Nigeria showing Seyi Tinubu Connect coverage"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to transform your healthcare experience?
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of Nigerians who are already using Seyi Tinubu Connect for
                  better healthcare access.
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
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo-stl.png"
                  className="h-10 w-10 rounded-full"
                />
                <span className="text-lg font-bold">STConnect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming healthcare in Nigeria through technology. Connect
                with licensed doctors anytime, anywhere.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Services</h3>
              <ul className="space-y-2">
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Virtual Consultations
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Online Pharmacy
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Medical Specialties
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Lab Tests
                  </p>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Press
                  </p>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Contact Us
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    FAQs
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Health Tips
                  </p>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </p>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground hover:text-foreground">
                    Licenses
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Seyi Tinubu Connect. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
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
              =<span className="sr-only">Facebook</span>
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
              <span className="sr-only">LinkedIn</span>
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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  )
}
