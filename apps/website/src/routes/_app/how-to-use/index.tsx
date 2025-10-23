import { createFileRoute } from '@tanstack/react-router'
import {
  Video,
  Smartphone,
  Search,
  Calendar,
  MessageSquare,
  Pill,
  CreditCard,
  Truck,
  HelpCircle,
  PlayCircle,
  CheckCircle2
} from 'lucide-react'

import { Button } from '@beta-lyfe/ui/components/button'
import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
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
import WhatsAppButton from '@beta-lyfe/ui/components/whatappbtn'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/how-to-use/')({
  component: HowToUsePage
})

function HowToUsePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How To Use Seyi Tinubu Connect
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Your step-by-step guide to accessing quality healthcare
                  through our platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Getting Started
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Begin Your Healthcare Journey
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Follow these simple steps to set up your Seyi Tinubu Connect account and
                  start using our services
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Download & Register</h3>
                  <ol className="text-left space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Download the STConnect app from Google Play or App Store
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Create an account with your email or phone number
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        Complete your profile with basic health information
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        4
                      </span>
                      <span>Add payment method for seamless transactions</span>
                    </li>
                  </ol>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/get-the-app">Download Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-green-600/10 p-3">
                    <Search className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Find a Doctor</h3>
                  <ol className="text-left space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Browse our network of 2,500+ Nigerian healthcare
                        providers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Filter by specialty, availability, language, or rating
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        View doctor profiles, qualifications, and patient
                        reviews
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        4
                      </span>
                      <span>
                        Select a healthcare provider that meets your needs
                      </span>
                    </li>
                  </ol>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/specialties">Find Doctors</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-purple-600/10 p-3">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">Book & Consult</h3>
                  <ol className="text-left space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Select your preferred date and time for consultation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Provide brief information about your health concern
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <span>Confirm and pay for your appointment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        4
                      </span>
                      <span>Join the video call at your scheduled time</span>
                    </li>
                  </ol>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/virtual-consultations">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Guides Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Service Guides
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  How to Use Our Services
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Detailed guides for each of our healthcare services
                </p>
              </div>
            </div>

            <Tabs defaultValue="consultations" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="consultations" className="text-center">
                  Virtual Consultations
                </TabsTrigger>
                <TabsTrigger value="pharmacy" className="text-center">
                  Online Pharmacy
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="text-center">
                  Prescriptions
                </TabsTrigger>
                <TabsTrigger value="follow-up" className="text-center">
                  Follow-up Care
                </TabsTrigger>
              </TabsList>

              <TabsContent value="consultations" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2 items-center pt-4">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                      Virtual Consultations
                    </h3>
                    <p className="text-muted-foreground">
                      Connect with licensed Nigerian doctors via video, voice,
                      or chat from the comfort of your home.
                    </p>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2 mt-1">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Prepare for Your Consultation
                          </h4>
                          <p className="text-muted-foreground">
                            Find a quiet, well-lit space with good internet
                            connection. Have your medical history, current
                            medications, and symptoms ready to discuss.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2 mt-1">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">During the Video Call</h4>
                          <p className="text-muted-foreground">
                            Speak clearly, show any visible symptoms when asked,
                            and ask questions. The doctor will provide
                            diagnosis, treatment plan, and prescriptions if
                            needed.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2 mt-1">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">After Your Consultation</h4>
                          <p className="text-muted-foreground">
                            Access your consultation summary, prescriptions, and
                            doctor's notes in the app. Order prescribed
                            medications directly through our pharmacy.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button asChild className="mt-4">
                      <Link to="/virtual-consultations" className="text-white">
                        Book a Consultation
                      </Link>
                    </Button>
                  </div>

                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=400&width=600&text=Doctor+Video+Call"
                      alt="Virtual consultation with doctor"
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pharmacy" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Online Pharmacy</h3>
                    <p className="text-muted-foreground">
                      Order prescription and over-the-counter medications online
                      with delivery to your doorstep anywhere in Nigeria.
                    </p>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-green-600/10 p-2 mt-1">
                          <Pill className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Browse & Select Medications
                          </h4>
                          <p className="text-muted-foreground">
                            Search for medications by name or browse by
                            category. View detailed information, including usage
                            instructions, side effects, and pricing.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-green-600/10 p-2 mt-1">
                          <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Upload Prescription & Checkout
                          </h4>
                          <p className="text-muted-foreground">
                            For prescription medications, upload a valid
                            prescription. Add items to cart, select delivery
                            address, and complete payment securely.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-green-600/10 p-2 mt-1">
                          <Truck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Track & Receive Delivery
                          </h4>
                          <p className="text-muted-foreground">
                            Track your order in real-time. Receive medications
                            at your doorstep with same-day delivery available in
                            major Nigerian cities.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button asChild className="mt-4">
                      <Link to="/pharmacy">Visit Pharmacy</Link>
                    </Button>
                  </div>

                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=400&width=600&text=Online+Pharmacy"
                      alt="Online pharmacy interface"
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prescriptions" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                      Managing Prescriptions
                    </h3>
                    <p className="text-muted-foreground">
                      Easily manage, renew, and fulfill your prescriptions
                      through the Seyi Tinubu Connect platform.
                    </p>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-purple-600/10 p-2 mt-1">
                          <Pill className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">
                            View Active Prescriptions
                          </h4>
                          <p className="text-muted-foreground">
                            Access all your prescriptions in one place. View
                            medication details, dosage instructions, and refill
                            information.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-purple-600/10 p-2 mt-1">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Request Prescription Renewals
                          </h4>
                          <p className="text-muted-foreground">
                            Request renewals for existing prescriptions directly
                            through the app. Your doctor will review and approve
                            if appropriate.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-purple-600/10 p-2 mt-1">
                          <Truck className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Order Prescribed Medications
                          </h4>
                          <p className="text-muted-foreground">
                            Order your prescribed medications with one click.
                            Set up automatic refills for medications you take
                            regularly.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button asChild className="mt-4">
                      <Link to="/pharmacy">Manage Prescriptions</Link>
                    </Button>
                  </div>

                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=400&width=600&text=Prescription+Management"
                      alt="Prescription management interface"
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="follow-up" className="mt-0">
                <div className="grid gap-6 lg:grid-cols-2 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Follow-up Care</h3>
                    <p className="text-muted-foreground">
                      Maintain continuity of care with easy follow-up
                      appointments and ongoing health monitoring.
                    </p>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-blue-600/10 p-2 mt-1">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Schedule Follow-up Appointments
                          </h4>
                          <p className="text-muted-foreground">
                            Easily book follow-up appointments with your doctor.
                            Receive reminders before your scheduled appointment.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-blue-600/10 p-2 mt-1">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">Message Your Doctor</h4>
                          <p className="text-muted-foreground">
                            Send secure messages to your healthcare provider
                            with questions or updates about your condition
                            between appointments.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-blue-600/10 p-2 mt-1">
                          <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">Track Your Progress</h4>
                          <p className="text-muted-foreground">
                            Monitor your health progress, track symptoms, and
                            share updates with your doctor for better continuity
                            of care.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button asChild className="mt-4">
                      <Link to="/specialties">Manage Follow-ups</Link>
                    </Button>
                  </div>

                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=400&width=600&text=Follow-up+Care"
                      alt="Follow-up care interface"
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Video Tutorials Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Video Tutorials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Watch & Learn
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Visual guides to help you navigate the Seyi Tinubu Connect platform with
                  ease
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Getting Started with Seyi Tinubu Connect',
                  duration: '3:45',
                  thumbnail:
                    '/placeholder.svg?height=200&width=350&text=Getting+Started'
                },
                {
                  title: 'How to Book a Consultation',
                  duration: '2:30',
                  thumbnail:
                    '/placeholder.svg?height=200&width=350&text=Book+Consultation'
                },
                {
                  title: 'Using the Online Pharmacy',
                  duration: '4:15',
                  thumbnail:
                    '/placeholder.svg?height=200&width=350&text=Online+Pharmacy'
                },
                {
                  title: 'Managing Your Prescriptions',
                  duration: '3:20',
                  thumbnail:
                    '/placeholder.svg?height=200&width=350&text=Prescriptions'
                },
                {
                  title: 'Scheduling Follow-up Appointments',
                  duration: '2:10',
                  thumbnail:
                    '/placeholder.svg?height=200&width=350&text=Follow-ups'
                },
                {
                  title: 'Payment Methods & Insurance',
                  duration: '3:55',
                  thumbnail:
                    '/placeholder.svg?height=200&width=350&text=Payments'
                }
              ].map((video, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail || '/placeholder.svg'}
                      alt={video.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                      <PlayCircle className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{video.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button asChild variant="outline">
                <Link to="/how-to-use">View All Tutorials</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  FAQs
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Find answers to common questions about using the Seyi Tinubu Connect
                  platform
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I create an account?
                  </AccordionTrigger>
                  <AccordionContent>
                    Download the STConnect app from Google Play or App Store, tap
                    "Sign Up," and follow the prompts to create your account.
                    You'll need to provide your email address or phone number,
                    create a password, and complete your profile with basic
                    information.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    What devices can I use for virtual consultations?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can use any smartphone, tablet, or computer with a
                    camera, microphone, and internet connection. For the best
                    experience, we recommend using a device with a front-facing
                    camera and a stable internet connection.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How do I pay for consultations and medications?
                  </AccordionTrigger>
                  <AccordionContent>
                    Seyi Tinubu Connect accepts various payment methods including
                    credit/debit cards, bank transfers, and mobile money. You
                    can add your preferred payment method in the "Payment
                    Methods" section of your profile and select it during
                    checkout.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How long does medication delivery take?
                  </AccordionTrigger>
                  <AccordionContent>
                    Delivery times vary by location. In Lagos, Abuja, and Port
                    Harcourt, we offer same-day delivery for orders placed
                    before 2 PM. For other Abuja, and Port Harcourt, we offer
                    same-day delivery for orders placed before 2 PM. For other
                    locations across Nigeria, delivery typically takes 1-3
                    business days depending on your location.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Can I get a prescription through a virtual consultation?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, doctors on Seyi Tinubu Connect can issue prescriptions during
                    virtual consultations when medically appropriate. The
                    prescription will be available in your account immediately
                    after the consultation, and you can order the prescribed
                    medications directly through our pharmacy.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    What if I need to reschedule my appointment?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can reschedule your appointment up to 2 hours before the
                    scheduled time without any penalty. Simply go to "My
                    Appointments" in the app, select the appointment you wish to
                    change, and tap "Reschedule" to select a new date and time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>
                    Is my medical information secure?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, Seyi Tinubu Connect takes your privacy seriously. All your medical
                    information is encrypted and stored securely in compliance
                    with healthcare privacy regulations. We never share your
                    information with third parties without your explicit
                    consent.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>
                    What should I do if I experience technical issues?
                  </AccordionTrigger>
                  <AccordionContent>
                    If you experience technical issues, try refreshing the app
                    or website, check your internet connection, or restart your
                    device. If problems persist, contact our support team
                    through the in-app chat or by calling our helpline at +234
                    800 000 0000.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/contact-us">Still Have Questions? Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Help & Support Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Help & Support
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Need Additional Help?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Our support team is available 24/7 to assist you with any
                  questions or issues
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <HelpCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Help Center</h3>
                  <p className="text-muted-foreground">
                    Browse our comprehensive knowledge base for detailed guides,
                    tutorials, and troubleshooting tips.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/contact-us">Visit Help Center</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Live Chat</h3>
                  <p className="text-muted-foreground">
                    Chat with our support team in real-time through the app or
                    website for immediate assistance.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link to="/contact-us">Start Chat</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Phone Support</h3>
                  <p className="text-muted-foreground">
                    Call our dedicated support line at +234 800 000 0000 to
                    speak directly with a support representative.
                  </p>
                  <Button asChild variant="outline" className="mt-2">
                    <a href="/tel:+2348000000000">Call Now</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to experience better healthcare?
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Download the STConnect app today and join thousands of
                  Nigerians who are already enjoying convenient access to
                  quality healthcare.
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
