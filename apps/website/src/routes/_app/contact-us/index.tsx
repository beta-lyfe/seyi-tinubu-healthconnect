import { createFileRoute } from '@tanstack/react-router'

import {
  Video,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'

import { Button } from '@beta-lyfe/ui/components/button'
import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'
import { Textarea } from '@beta-lyfe/ui/components/shad/ui/textarea'
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

export const Route = createFileRoute('/_app/contact-us/')({
  component: ContactUsPage
})

function ContactUsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get in Touch
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  We're here to help. Reach out to our team for support,
                  feedback, or inquiries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Call Us</h3>
                  <p className="text-muted-foreground">
                    Speak directly with our customer support team
                  </p>
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium">General Inquiries:</span>
                      <a
                        href="tel:+2348000000000"
                        className="text-primary hover:underline"
                      >
                        +234 800 000 0000
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium">Technical Support:</span>
                      <a
                        href="tel:+2348000000001"
                        className="text-primary hover:underline"
                      >
                        +234 800 000 0001
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Email Us</h3>
                  <p className="text-muted-foreground">
                    Send us an email and we'll respond within 24 hours
                  </p>
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium">Support:</span>
                      <a
                        href="mailto:support@stconnect.com"
                        className="text-primary hover:underline"
                      >
                        support@stconnect.com
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium">Partnerships:</span>
                      <a
                        href="mailto:partners@stconnect.com"
                        className="text-primary hover:underline"
                      >
                        partners@stconnect.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Live Chat</h3>
                  <p className="text-muted-foreground">
                    Chat with our support team in real-time
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7 for immediate assistance
                  </p>
                  <Button asChild>
                    <Link to="/chat-support" className="text-white">
                      Start Chat
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form and Information Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First Name
                      </label>
                      <Input
                        id="first-name"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Last Name
                      </label>
                      <Input
                        id="last-name"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What is your message about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message here"
                      className="min-h-[150px]"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter mb-4">
                    Our Offices
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Visit us at one of our locations across Nigeria.
                  </p>

                  <Tabs defaultValue="lagos" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="lagos">Lagos</TabsTrigger>
                      <TabsTrigger value="abuja">Abuja</TabsTrigger>
                      <TabsTrigger value="port-harcourt">
                        Port Harcourt
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="lagos" className="mt-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-4">
                            <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                              <img
                                src="/placeholder.svg?height=200&width=400&text=Lagos+Office+Map"
                                alt="Lagos Office Location"
                                className="object-cover"
                              />
                            </div>
                            <h3 className="text-xl font-bold">
                              Lagos Headquarters
                            </h3>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                123 Adeola Odeku Street, Victoria Island, Lagos,
                                Nigeria
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                                <p>Saturday: 9:00 AM - 3:00 PM</p>
                                <p>Sunday: Closed</p>
                              </div>
                            </div>
                            <Button asChild variant="outline">
                              <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Get Directions
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="abuja" className="mt-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-4">
                            <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                              <img
                                src="/placeholder.svg?height=200&width=400&text=Abuja+Office+Map"
                                alt="Abuja Office Location"
                                className="object-cover"
                              />
                            </div>
                            <h3 className="text-xl font-bold">Abuja Office</h3>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                45 Ademola Adetokunbo Crescent, Wuse II, Abuja,
                                Nigeria
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                                <p>Saturday: 9:00 AM - 3:00 PM</p>
                                <p>Sunday: Closed</p>
                              </div>
                            </div>
                            <Button asChild variant="outline">
                              <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Get Directions
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="port-harcourt" className="mt-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-4">
                            <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                              <img
                                src="/placeholder.svg?height=200&width=400&text=Port+Harcourt+Office+Map"
                                alt="Port Harcourt Office Location"
                                className="object-cover"
                              />
                            </div>
                            <h3 className="text-xl font-bold">
                              Port Harcourt Office
                            </h3>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                78 Aba Road, GRA Phase 2, Port Harcourt, Rivers
                                State, Nigeria
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                                <p>Saturday: 9:00 AM - 3:00 PM</p>
                                <p>Sunday: Closed</p>
                              </div>
                            </div>
                            <Button asChild variant="outline">
                              <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Get Directions
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-3 hover:bg-primary/10 transition-colors"
                    >
                      <Facebook className="h-6 w-6" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-3 hover:bg-primary/10 transition-colors"
                    >
                      <Twitter className="h-6 w-6" />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-3 hover:bg-primary/10 transition-colors"
                    >
                      <Instagram className="h-6 w-6" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-muted p-3 hover:bg-primary/10 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Support Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Customer Support:</span>
                      <span>24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Technical Support:</span>
                      <span>8:00 AM - 10:00 PM (WAT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Pharmacy Support:</span>
                      <span>8:00 AM - 8:00 PM (WAT)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  FAQs
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Common Questions
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Find quick answers to frequently asked questions about
                  contacting us
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What is the typical response time for inquiries?
                  </AccordionTrigger>
                  <AccordionContent>
                    We aim to respond to all inquiries within 24 hours. For
                    urgent matters, we recommend using our live chat feature or
                    calling our customer support line for immediate assistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How can I report a technical issue with the app?
                  </AccordionTrigger>
                  <AccordionContent>
                    Technical issues can be reported through the app by going to
                    Settings &gt; Help &amp; Support &gt; Report an Issue.
                    Alternatively, you can email our technical support team at
                    support@stconnect.com or call our technical support line at
                    +234 800 000 0001.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Can I schedule an in-person meeting at one of your offices?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, you can schedule an in-person meeting at any of our
                    offices. Please call our customer service line or email us
                    at support@stconnect.com with your preferred date, time, and
                    location, and we'll arrange a meeting with the appropriate
                    team member.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How do I provide feedback about your services?
                  </AccordionTrigger>
                  <AccordionContent>
                    We value your feedback! You can provide feedback through the
                    app by going to Settings &gt; Help &amp; Support &gt;
                    Provide Feedback. You can also use our contact form on this
                    page, email us at feedback@stconnect.com, or call our
                    customer support line.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Who should I contact for partnership opportunities?
                  </AccordionTrigger>
                  <AccordionContent>
                    For partnership inquiries, please email our partnerships
                    team at partners@stconnect.com with details about your
                    organization and the nature of the partnership you're
                    interested in. Our team will get back to you within 2-3
                    business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Need immediate assistance?
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Our support team is available 24/7 to help you with any
                  questions or issues.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" variant="secondary" className="px-8">
                  <a href="tel:+2348000000000">
                    <Phone className="mr-2 h-5 w-5" /> Call Now
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8"
                >
                  <Link to="/chat-support">
                    <MessageSquare className="mr-2 h-5 w-5" /> Start Chat
                  </Link>
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
                href="#!"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#!"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#!"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#!"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  )
}
