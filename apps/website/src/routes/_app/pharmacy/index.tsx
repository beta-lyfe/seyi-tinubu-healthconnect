import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Video,
  Clock,
  ArrowRight,
  Star,
  Menu,
  MapPin,
  Pill,
  Stethoscope,
  Users,
  Map,
  Award
} from 'lucide-react'

import { Button } from '@beta-lyfe/ui/components/button'
import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
import WhatsAppButton from '@beta-lyfe/ui/components/whatappbtn'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import {
  Search,
  ShoppingCart,
  Truck,
  Shield,
  ChevronRight,
  PillIcon as Capsule,
  Thermometer,
  Phone
} from 'lucide-react'

export const Route = createFileRoute('/_app/pharmacy/')({
  component: PharmacyPage
})

function PharmacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Health, Delivered
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Order prescription and over-the-counter medications online.
                    Enjoy fast delivery to your doorstep anywhere in Nigeria.
                  </p>
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <div className="relative w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search for medications..."
                      className="w-full pl-9 pr-4"
                    />
                  </div>
                  <Button className="text-white">Search</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-background">
                    Antibiotics
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    Pain Relief
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    Diabetes
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    Hypertension
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    Vitamins
                  </Badge>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="/placeholder.svg?height=550&width=550&text=Pharmacy+Delivery"
                  width={550}
                  height={550}
                  alt="Medication delivery"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
                <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fast Delivery</p>
                      <p className="text-xl font-bold">
                        Same-day in major cities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Browse by Category
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find the medications and health products you need.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-8">
              {[
                {
                  name: 'Prescription Drugs',
                  icon: <Pill className="h-8 w-8" />
                },
                {
                  name: 'Over-the-Counter',
                  icon: <Capsule className="h-8 w-8" />
                },
                {
                  name: 'Vitamins & Supplements',
                  icon: <Pill className="h-8 w-8 rotate-45" />
                },
                {
                  name: 'Diabetes Care',
                  icon: <Thermometer className="h-8 w-8" />
                },
                {
                  name: 'Blood Pressure',
                  icon: <Stethoscope className="h-8 w-8" />
                },
                { name: 'First Aid', icon: <Shield className="h-8 w-8" /> },
                { name: 'Pain Relief', icon: <Pill className="h-8 w-8" /> },
                { name: 'Antibiotics', icon: <Capsule className="h-8 w-8" /> },
                {
                  name: 'Skincare',
                  icon: <Pill className="h-8 w-8 rotate-45" />
                },
                {
                  name: "Children's Health",
                  icon: <Thermometer className="h-8 w-8" />
                },
                {
                  name: "Women's Health",
                  icon: <Stethoscope className="h-8 w-8" />
                },
                { name: "Men's Health", icon: <Shield className="h-8 w-8" /> }
              ].map((category, index) => (
                <a href={`/pharmacy/category/${index}`} key={index}>
                  <Card className="h-full transition-colors hover:border-primary">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-3 rounded-full bg-primary/10 p-3">
                        {category.icon}
                      </div>
                      <h3 className="text-sm font-medium">{category.name}</h3>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
                Featured Medications
              </h2>
              <a
                href="/pharmacy/all"
                className="flex items-center text-sm font-medium text-primary"
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            <Tabs defaultValue="popular" className="mt-8">
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
                <TabsTrigger value="otc">Over-the-Counter</TabsTrigger>
                <TabsTrigger value="supplements">Supplements</TabsTrigger>
              </TabsList>
              <TabsContent value="popular" className="mt-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {[
                    {
                      name: 'Paracetamol',
                      generic: 'Acetaminophen',
                      price: '₦500',
                      img: '/images/drug1.png'
                    },
                    {
                      name: 'Amoxicillin',
                      generic: 'Amoxicillin',
                      price: '₦1,200',
                      prescription: true,
                      img: '/images/drug2.png'
                    },
                    {
                      name: 'Vitamin C',
                      generic: 'Ascorbic Acid',
                      price: '₦800',
                      img: '/images/drug3.png'
                    },
                    {
                      name: 'Lisinopril',
                      generic: 'Lisinopril',
                      price: '₦1,500',
                      prescription: true,
                      img: '/images/drug4.png'
                    },
                    {
                      name: 'Ibuprofen',
                      generic: 'Ibuprofen',
                      price: '₦600',
                      img: '/images/drug5.png'
                    }
                  ].map((product, index) => (
                    <a href={`/pharmacy/product/${index}`} key={index}>
                      <Card className="h-full overflow-hidden transition-all hover:border-primary">
                        <div className="aspect-square relative bg-muted/20">
                          <img
                            src={product.img || '/placeholder.svg'}
                            alt={product.name}
                            className="object-cover p-4"
                          />
                          {product.prescription && (
                            <Badge className="absolute top-2 right-2 bg-amber-500">
                              Prescription
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {product.generic}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-bold">{product.price}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span className="sr-only">Add to cart</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="prescription" className="mt-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {/* Similar product grid for prescription medications */}
                  <Card className="h-full overflow-hidden">
                    <div className="aspect-square relative bg-muted/20">
                      <img
                        src="/placeholder.svg?height=200&width=200&text=Lisinopril"
                        alt="Lisinopril"
                        className="object-cover p-4"
                      />
                      <Badge className="absolute top-2 right-2 bg-amber-500">
                        Prescription
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">Lisinopril</h3>
                      <p className="text-xs text-muted-foreground">
                        Lisinopril
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold">₦1,500</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span className="sr-only">Add to cart</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  {/* More prescription products would go here */}
                </div>
              </TabsContent>
              <TabsContent value="otc" className="mt-6">
                {/* OTC medications content */}
                <div className="text-center py-12">
                  <p>Over-the-counter medications tab content would go here</p>
                </div>
              </TabsContent>
              <TabsContent value="supplements" className="mt-6">
                {/* Supplements content */}
                <div className="text-center py-12">
                  <p>Supplements tab content would go here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  How Our Pharmacy Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Getting your medications has never been easier.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Upload Prescription',
                  description:
                    'Upload your prescription through the app or website. Our pharmacists will verify it.'
                },
                {
                  step: '02',
                  title: 'Place Your Order',
                  description:
                    'Select your medications, add to cart, and proceed to checkout with secure payment options.'
                },
                {
                  step: '03',
                  title: 'Fast Delivery',
                  description:
                    'Receive your medications at your doorstep. Same-day delivery available in major Nigerian cities.'
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
                    <h3 className="text-xl font-bold">{step.title}</h3>
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
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px] items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Why Choose Seyi Tinubu Connect Pharmacy
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Quality Medications, Delivered Reliably
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Genuine Medications',
                      description:
                        'All our medications are sourced from licensed manufacturers and distributors.',
                      icon: <Shield className="h-5 w-5 text-primary" />
                    },
                    {
                      title: 'Fast Delivery',
                      description:
                        'Same-day delivery in Lagos, Abuja, and Port Harcourt. 1-3 day delivery nationwide.',
                      icon: <Truck className="h-5 w-5 text-primary" />
                    },
                    {
                      title: 'Pharmacist Consultation',
                      description:
                        'Free consultation with licensed pharmacists for medication guidance.',
                      icon: <Stethoscope className="h-5 w-5 text-primary" />
                    },
                    {
                      title: 'Secure Ordering',
                      description:
                        'End-to-end encryption for all your personal and prescription information.',
                      icon: <Shield className="h-5 w-5 text-primary" />
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-bold">{benefit.title}</h3>
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild className="mt-4">
                  <Link to="/pharmacy" className="text-white">
                    Learn More About Our Pharmacy
                  </Link>
                </Button>
              </div>
              <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=500&width=600&text=Pharmacy+Team"
                  alt="Seyi Tinubu Connect Pharmacy Team"
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
                  Ready to simplify your medication experience?
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Download the STConnect app to order medications, consult with
                  doctors, and manage your health in one place.
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
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-lg font-bold">STConnect Pharmacy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted online pharmacy in Nigeria. Quality medications
                delivered to your doorstep.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/pharmacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Prescription Drugs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pharmacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Over-the-Counter
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pharmacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Vitamins & Supplements
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pharmacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Health Devices
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/pharmacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Our Pharmacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pharmacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Delivery Information
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pharmacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Returns Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pharmacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pharmacy FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    123 Health Street, Lagos, Nigeria
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    +234 800 000 0000
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Open 24/7 for online orders
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/licenses"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
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
              </a>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  )
}
