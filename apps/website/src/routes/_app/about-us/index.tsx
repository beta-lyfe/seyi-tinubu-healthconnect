import { createFileRoute } from '@tanstack/react-router'

import {
  Video,
  Heart,
  Users,
  Globe,
  Award,
  Shield,
  Lightbulb,
  Zap,
  Building,
  MapPin
} from 'lucide-react'

import { Button } from '@beta-lyfe/ui/components/button'
import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import WhatsAppButton from '@beta-lyfe/ui/components/whatappbtn'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/about-us/')({
  component: AboutUsPage
})

export default function AboutUsPage() {
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
                    Transforming Healthcare in Nigeria
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Seyi Tinubu Connect is on a mission to make quality healthcare
                    accessible to all Nigerians through innovative technology
                    and a network of dedicated healthcare professionals.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="px-8">
                    <Link to="/care-services">Our Services</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8">
                    <Link to="/contact-us">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="/images/seyi1.png"
                  width={700}
                  height={700}
                  alt="Seyi Tinubu Connect team members"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Bridging the Healthcare Gap
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Our mission is to bridge the healthcare gap in Nigeria by
                  leveraging technology to connect patients with quality
                  healthcare providers, regardless of location or socioeconomic
                  status.
                </p>
                <p className="text-muted-foreground">
                  We're committed to making healthcare more accessible,
                  affordable, and efficient for all Nigerians. Through our
                  platform, we aim to reduce the barriers to healthcare access,
                  improve health outcomes, and contribute to a healthier
                  Nigeria.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Vision
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Healthcare for Every Nigerian
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  We envision a Nigeria where every citizen has access to
                  quality healthcare services, regardless of their location or
                  economic status.
                </p>
                <p className="text-muted-foreground">
                  By 2030, we aim to be the leading telehealth provider in
                  Africa, serving millions of patients across the continent with
                  innovative healthcare solutions that address the unique
                  challenges of African healthcare systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Story
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  The Seyi Tinubu Connect Journey
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From a small startup to Nigeria's leading telehealth platform
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              <Card className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <span className="text-xl font-bold text-primary">2025</span>
                  </div>
                  <h3 className="text-xl font-bold">The Beginning</h3>
                  <p className="text-muted-foreground">
                    Seyi Tinubu Connect was founded by Seyi Tinubu, Abubakar Isa Jibrin, Okechukwu Samuel, Uchenna Ofoma and Ikechukwu Fortune
                    in Lagos with a vision to revolutionize healthcare access in
                    Nigeria.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <span className="text-xl font-bold text-primary">2025</span>
                  </div>
                  <h3 className="text-xl font-bold">Platform Launch</h3>
                  <p className="text-muted-foreground">
                    We launched our telehealth platform with 50 doctors,
                    focusing initially on general consultations and basic
                    healthcare services.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <span className="text-xl font-bold text-primary">2022</span>
                  </div>
                  <h3 className="text-xl font-bold">Nationwide Expansion</h3>
                  <p className="text-muted-foreground">
                    Seyi Tinubu Connect expanded to all 36 states in Nigeria, growing our
                    network to over 1,000 healthcare providers across multiple
                    specialties.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <span className="text-xl font-bold text-primary">
                      Today
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">
                    Leading Telehealth Provider
                  </h3>
                  <p className="text-muted-foreground">
                    Now with 2,500+ healthcare providers, 36+ specialties, and
                    over 100,000 patients served, Seyi Tinubu Connect is Nigeria's premier
                    telehealth platform.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Team
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Meet Our Leadership
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The visionaries and experts behind Seyi Tinubu Connect
                </p>
              </div>
            </div>

            <Tabs defaultValue="executives" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="executives">Executive Team</TabsTrigger>
                <TabsTrigger value="medical">Medical Leadership</TabsTrigger>
                <TabsTrigger value="tech">Technology Team</TabsTrigger>
              </TabsList>

              <TabsContent value="executives" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      name: 'Seyi Tinubu',
                      title: 'Founder',
                      bio: 'Seyi Tinubu is a entrepreneur with a passion for healthcare innovation.',
                      img: '/images/seyi1.png'
                    },
                    // {
                    //   name: 'Ngozi Okafor',
                    //   title: 'Co-Founder & COO',
                    //   bio: "With a background in healthcare management and an MBA from Lagos Business School, Ngozi oversees Seyi Tinubu Connect's operations, ensuring seamless service delivery across all departments.",
                    //   img: '/placeholder.svg?height=300&width=300&text=Ngozi+Okafor'
                    // },
                    // {
                    //   name: 'Oluwaseun Adeyemi',
                    //   title: 'Chief Financial Officer',
                    //   bio: 'Oluwaseun brings 12 years of financial expertise from both healthcare and technology sectors. He previously worked with major health insurance providers and tech startups in Nigeria.',
                    //   img: '/placeholder.svg?height=300&width=300&text=Oluwaseun+Adeyemi'
                    // }
                  ].map((person, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={person.img || '/placeholder.svg'}
                          alt={person.name}
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{person.name}</h3>
                        <p className="text-sm text-primary font-medium mb-2">
                          {person.title}
                        </p>
                        <p className="text-muted-foreground">{person.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="medical" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      name: 'Dr. Fatima Bello',
                      title: 'Chief Medical Officer',
                      bio: 'Dr. Bello leads our medical team with over 20 years of experience in healthcare. She ensures all medical services meet the highest standards of quality and ethics.',
                      img: '/placeholder.svg?height=300&width=300&text=Dr.+Bello'
                    },
                    {
                      name: 'Dr. Emeka Nwachukwu',
                      title: 'Head of Specialist Care',
                      bio: 'A renowned specialist with expertise in multiple fields, Dr. Nwachukwu oversees our network of specialists and ensures comprehensive care for complex conditions.',
                      img: '/placeholder.svg?height=300&width=300&text=Dr.+Nwachukwu'
                    },
                    {
                      name: 'Pharm. Aisha Mohammed',
                      title: 'Director of Pharmacy Services',
                      bio: 'With a background in pharmaceutical sciences and supply chain management, Aisha leads our online pharmacy operations, ensuring safe and efficient medication delivery.',
                      img: '/placeholder.svg?height=300&width=300&text=Aisha+Mohammed'
                    }
                  ].map((person, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={person.img || '/placeholder.svg'}
                          alt={person.name}
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{person.name}</h3>
                        <p className="text-sm text-primary font-medium mb-2">
                          {person.title}
                        </p>
                        <p className="text-muted-foreground">{person.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tech" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      name: 'Chinedu Okonkwo',
                      title: 'Chief Technology Officer',
                      bio: 'A tech innovator with experience at leading African startups, Chinedu leads our technology team in developing and maintaining our secure, scalable telehealth platform.',
                      img: '/placeholder.svg?height=300&width=300&text=Chinedu+Okonkwo'
                    },
                    {
                      name: 'Amina Ibrahim',
                      title: 'Head of Product',
                      bio: 'With a background in UX design and healthcare technology, Amina ensures our platform is intuitive, accessible, and meets the needs of both patients and healthcare providers.',
                      img: '/placeholder.svg?height=300&width=300&text=Amina+Ibrahim'
                    },
                    {
                      name: 'Emmanuel Okafor',
                      title: 'Director of Data & AI',
                      bio: 'Emmanuel leads our data science initiatives, using AI and machine learning to improve healthcare delivery, optimize operations, and enhance the patient experience.',
                      img: '/placeholder.svg?height=300&width=300&text=Emmanuel+Okafor'
                    }
                  ].map((person, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={person.img || '/placeholder.svg'}
                          alt={person.name}
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{person.name}</h3>
                        <p className="text-sm text-primary font-medium mb-2">
                          {person.title}
                        </p>
                        <p className="text-muted-foreground">{person.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Values
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Core Principles That Guide Us
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The fundamental values that shape everything we do at Seyi Tinubu Connect
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Patient-Centered Care</h3>
                  <p className="text-muted-foreground">
                    We put patients at the center of everything we do, designing
                    our services around their needs, preferences, and
                    experiences.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Quality & Safety</h3>
                  <p className="text-muted-foreground">
                    We maintain the highest standards of medical care and data
                    security, ensuring safe and effective healthcare delivery.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We're committed to making quality healthcare accessible to
                    all Nigerians, regardless of location, income, or
                    background.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously innovate to improve healthcare delivery,
                    leveraging technology to solve Nigeria's unique healthcare
                    challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact & Achievements Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Impact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Making a Difference
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The real impact of our work across Nigeria
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                      <span className="text-4xl font-bold text-primary">
                        100,000+
                      </span>
                      <p className="text-muted-foreground">Patients Served</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                      <span className="text-4xl font-bold text-primary">
                        2,500+
                      </span>
                      <p className="text-muted-foreground">
                        Healthcare Providers
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                      <span className="text-4xl font-bold text-primary">
                        36+
                      </span>
                      <p className="text-muted-foreground">
                        Medical Specialties
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                      <span className="text-4xl font-bold text-primary">
                        37
                      </span>
                      <p className="text-muted-foreground">
                        States Covered (All Nigeria)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-background">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Awards & Recognition</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>2023 Nigeria Healthcare Innovation Award</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>2022 Africa Digital Health Excellence Award</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>2021 Nigeria Tech Startup of the Year</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          Featured in Forbes Africa 30 Under 30 (Co-founders)
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-background">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Impact Stories</h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-bold">Rural Healthcare Access</h4>
                      <p className="text-muted-foreground">
                        Through our mobile clinics and telehealth services,
                        we've provided healthcare access to over 50,000 patients
                        in rural communities across Nigeria who previously had
                        limited or no access to quality healthcare.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold">Maternal Health Initiative</h4>
                      <p className="text-muted-foreground">
                        Our maternal health program has supported over 10,000
                        expectant mothers with prenatal care, reducing
                        complications and improving outcomes for both mothers
                        and babies in underserved communities.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold">Chronic Disease Management</h4>
                      <p className="text-muted-foreground">
                        Our chronic disease management program has helped over
                        15,000 patients with conditions like diabetes and
                        hypertension better manage their health, reducing
                        hospital admissions by 40%.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold">Healthcare Education</h4>
                      <p className="text-muted-foreground">
                        Through our health education initiatives, we've reached
                        over 200,000 Nigerians with vital information about
                        preventive care, disease management, and healthy living
                        practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partners & Affiliations Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Partners
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Strategic Partnerships
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Working together to transform healthcare in Nigeria
                </p>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {[
                'Nigerian Medical Association',
                'Federal Ministry of Health',
                'WHO Nigeria',
                'Lagos State Government',
                'MTN Nigeria',
                'Access Bank',
                'Nigeria Health Insurance Authority',
                'Pharmaceutical Society of Nigeria',
                'Tech4Dev Nigeria',
                'African Development Bank',
                'UNICEF Nigeria',
                'Nigeria Centre for Disease Control'
              ].map((partner, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Building className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium">{partner}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        {/*<section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Our Locations
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Where to Find Us
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our physical offices across Nigeria
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Lagos Headquarters</h3>
                  </div>
                  <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Lagos+Office+Map"
                      alt="Lagos Office Location"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    123 Adeola Odeku Street, Victoria Island, Lagos, Nigeria
                  </p>
                  <p className="text-muted-foreground">
                    Phone: +234 800 000 0000
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Abuja Office</h3>
                  </div>
                  <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Abuja+Office+Map"
                      alt="Abuja Office Location"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    45 Ademola Adetokunbo Crescent, Wuse II, Abuja, Nigeria
                  </p>
                  <p className="text-muted-foreground">
                    Phone: +234 800 000 0001
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Port Harcourt Office</h3>
                  </div>
                  <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Port+Harcourt+Office+Map"
                      alt="Port Harcourt Office Location"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    78 Aba Road, GRA Phase 2, Port Harcourt, Rivers State,
                    Nigeria
                  </p>
                  <p className="text-muted-foreground">
                    Phone: +234 800 000 0002
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>*/}

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Join Us in Transforming Healthcare
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Whether you're a patient seeking care, a healthcare provider
                  looking to join our network, or a partner interested in
                  collaboration, we'd love to hear from you.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" variant="secondary" className="px-8">
                  <Link to="/get-the-app">
                    <Zap className="mr-2 h-5 w-5" /> Download the App
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8"
                >
                  <Link to="/contact-us">
                    <Users className="mr-2 h-5 w-5" /> Contact Us
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
                href="instagram.com"
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
