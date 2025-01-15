import { Typography } from '@beta-lyfe/webapp/components/typography'
import { Button } from '@beta-lyfe/webapp/components/shad/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { type FunctionComponent, useEffect, useState } from 'react'
import doctorMariaWatts from '@beta-lyfe/webapp/assets/images/doctors/maria-watts.png'
import { $api,schema } from '@beta-lyfe/webapp/lib/backend'
import appointmentIcon from '@beta-lyfe/webapp/assets/images/icons/appointment.png'
import examinationIcon from '@beta-lyfe/webapp/assets/images/icons/examination.png'
import medicalProfileIcon from '@beta-lyfe/webapp/assets/images/icons/medical-profile.png'
export const Route = createFileRoute('/_pages/_pages/')({
  component: () => <LandingPage />
})

const links = ['Home', 'About us', 'Services', 'Doctors', 'FAQs', 'Contact']
type Doctor= schema.components['schemas']['Api.Doctor.Doctor']

const statements = [
  {
    heading: 'Our Mission',
    body: 'Building easy and efficient access to healthcare in Nigeria'
  },
  {
    heading: 'Our Vision',
    body: 'Creating smooth and premium accessibility to healthcare systems in Nigeria'
  }
]

function LandingPage() {
  const { data, status } = $api.useQuery("get",'/api/doctors/')
  if (status === 'pending' || status === 'error') return null

  const doctors = data

  return (
    <main>
      <Heading />
      <Hero />
      <WhatWeDo />
      <MeetOurDoctors doctors={doctors} />
      <PartnerWithUs />
      <Footer />
    </main>
  )
}

const Heading = () => (
  <header className="py-2 md:py-2 bg-primary">
    <div className="p-5 bg-primary gap-5 flex justify-between items-center px-8">
      <div className="flex items-center justify-center gap-8">
        <Typography.PageHeading className="text-white md:text-3xl text-3xl">
          BetaLyfe
        </Typography.PageHeading>
      </div>
      <Nav />
      <NavBar />
    </div>
  </header>
)

function Hero() {
  return (
    <section className="lg:px-[70px] md:px[50px] md:py-[20px] py-[4px] bg-primary">
      <div className="text-center px-8 md:flex justify-center bg-primary rounded-lg">
        <div className="flex-1 md:pt-[60px] flex flex-col gap-6">
          <Typography.Heading className="text-white text-2xl md:text-3xl text-left leading-normal">
            Welcome to BetaLyfe <br />
            Your Health, Your Life, Your Way
          </Typography.Heading>
          <Typography.Info className="text-white text-md text-left leading-normal">
            Transforming Healthcare with Cutting-Edge Telemedicine , Say goodbye
            to the hassle of traditional doctor's visits. With BetaLyfe, you can
            schedule appointments, consult with healthcare providers, and access
            your medical records—all from your smartphone, tablet, or computer
          </Typography.Info>
          <div className="text-left py-6">
            <Link to="/auth/sign-in">
              <Button className="bg-white text-primary hover:text-primary hover:bg-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src={doctorMariaWatts} alt="Dr. Maria Watts." />
        </div>
      </div>
    </section>
  )
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  return (
    <nav className="md:hidden">
      <div className="flex justify-between items-center">
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex items-center`}
        >
          <div className="flex p-8 flex-col md:flex-row w-full md:w-auto md:items-center md:ml-4 space-y-4 md:space-y-0 md:space-x-4 md:p-0">
            <div className="flex justify-between items-center w-full md:hidden">
              <div className="text-primary text-2xl font-bold">Menu</div>
              <button
                onClick={toggleMenu}
                className="text-primary focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            {links.map((item, id) => (
              <a
                href="#"
                key={id}
                className="block text-primary py-2 hover:text-gray-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

function WhatWeDo() {
  const aboutList = [
    {
      image: appointmentIcon,
      heading: 'Online Appointments',
      body: `No more waiting in long lines or dealing with traffic. Schedule
                 and attend your appointments from the comfort of your home. `
    },
    {
      image: examinationIcon,
      heading: 'Expert Care',
      body: 'Our network of board-certified doctors, specialists, and healthcare professionals are here to provide you with expert advice, diagnosis, and treatment.'
    },
    {
      image: medicalProfileIcon,
      heading: 'Secure and Private',
      body: 'Your health information is safe with us. BetaLyfe uses state-of-the-art encryption and security protocols to protect your data, ensuring your privacy and confidentiality at all times.'
    }
  ]

  return (
    <section className="p-8 lg:p-[70px] md:px[50px]">
      <h2 className="text-black text-center md:text-left text-3xl">
        What do we do ?
      </h2>
      <p className="lg:w-[600px] text-left text-lg py-6">
        Easy accessiblity to healthcare through information Technology From
        primary care and mental health services to chronic disease management
        and prescription refills, BetaLyfe offers a wide range of healthcare
        services designed to meet all your needs.
      </p>
      <div className="py-8">
        <div className="grid md:grid-cols-3 gap-10">
          {aboutList.map((item, id) => (
            <AboutCards
              key={id}
              src={item.image}
              heading={item.heading}
              body={item.body}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center pt-8">
        <div className="grid gap-20 grid-flow-row md:grid-cols-2">
          {statements.map((item, id) => (
            <Statement heading={item.heading} body={item.body} key={id} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Nav() {
  return (
    <nav className="lg:px-8 md:px-2 md:flex-[0.7] md:flex md:items-center justify-between gap-6 hidden">
      <ul className="md:flex md:gap-9">
        {links.map((item, key) => (
          <li key={key}>
            <Link to="/" className="text-white text-nowrap">
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/auth/sign-in">
        <Button className="bg-white text-primary hover:text-primary hover:bg-white">
          Login
        </Button>
      </Link>
    </nav>
  )
}

function AboutCards({
  src,
  heading,
  body
}: {
  src: string
  heading: string
  body: string
}) {
  return (
    <div className="p-6 shadow-lg rounded-xl">
      <img src={src} className="w-[35px] " />
      <h2
        className="text-md font-semibold pt-3 pb-1 border-b-2 border-primary
            w-max
            "
      >
        {heading}
      </h2>
      <p className="text-sm text-left py-4">{body}</p>
    </div>
  )
}

const MeetOurDoctors: FunctionComponent<{ doctors: Doctor[] }> = ({
  doctors
}) => {
  return (
    <section className="p-8 lg:px-[70px] md:px[50px] flex flex-col items-center gap-6">
      <h2 className="text-3xl text-center md:text-left">
        Meet Our Expert Doctors
      </h2>
      <p className="text-center">
        Connect with a specialist for a 2nd Opinion . Access health and wlness
        Services
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 md:gap-20">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </section>
  )
}

const DoctorCard: FunctionComponent<{ doctor: Doctor}> = ({ doctor }) => {
  const fullName = `${doctor.first_name} ${doctor.last_name}`

  return (
    <div
      className="w-max flex flex-col items-center justify-center gap-2
        py-5
         border-primary border-2 px-8 rounded-2xl hover:bg-primary hover:text-white"
    >
      <img src={doctor.image_url} className="w-[200px]" alt="" />
      <p>{fullName}</p>
      <p className="text-sm ">{doctor.specialty}</p>
    </div>
  )
}

function Statement({ heading, body }: { heading: string; body: string }) {
  return (
    <div
      className="p-8 rounded-full border-primary border-2 text-center w-[350px]
        hover:bg-primary hover:text-white
        "
    >
      <h2 className="py-3 text-lg font-bold">{heading}</h2>
      <p className="text-md">{body}</p>
    </div>
  )
}

function PartnerWithUs() {
  return (
    <section className="p-8 md:p-[70px] flex flex-col gap-4">
      <h2 className=" text-3xl md:text-center">Partner with us...</h2>
      <p>
        One Score a a time. Betalyfe is making healthcare seamless for Nigerians
        living on Medication
      </p>
      <ul>
        <li>- 14- labs</li>
        <li>- 50+ world class doctors</li>
        <li>- 100- pharmacies</li>
      </ul>
      <p>By Q4 of 2024</p>
      <div className="text-center">
        <Button className="rounded-r-full px-6 font-semibold">
          Join
          <ArrowRight />
        </Button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="text-white py-10 bg-primary p-8 md:p-[70px]">
      <div className="container mx-auto px-5 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Betalyfe</h2>
            <p>
              Stay updated with our latest news and offerings. Subscribe to our
              newsletter.
            </p>
            <form className="mt-4">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-2
                            border-white border-2
                            rounded-l-lg border-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-primary border-white border-[1px] p-2 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="grid grid-cols-3 md:grid-cols-1">
              {links.map((item, id) => (
                <li key={id} className="mb-2">
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="https://twitter.com" className="hover:underline">
                  <svg
                    className="w-6 h-6 fill-current text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.93 4.93 0 002.17-2.72c-.95.57-2 .98-3.13 1.2a4.92 4.92 0 00-8.37 4.48 13.94 13.94 0 01-10.13-5.14 4.92 4.92 0 001.52 6.57 4.92 4.92 0 01-2.23-.62v.06a4.92 4.92 0 003.94 4.83 4.92 4.92 0 01-2.22.08 4.92 4.92 0 004.59 3.41A9.87 9.87 0 010 19.54a13.92 13.92 0 007.55 2.21c9.06 0 14-7.5 14-14 0-.21 0-.42-.02-.63A9.93 9.93 0 0024 4.56z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://facebook.com" className="hover:underline">
                  <svg
                    className="w-6 h-6 fill-current text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.68 0H1.32A1.32 1.32 0 000 1.32v21.36A1.32 1.32 0 001.32 24h11.49v-9.3H9.97v-3.62h2.84V8.41c0-2.81 1.71-4.34 4.21-4.34 1.2 0 2.23.09 2.53.13v2.94h-1.74c-1.36 0-1.62.65-1.62 1.6v2.1h3.24l-.42 3.62h-2.82V24h5.53A1.32 1.32 0 0024 22.68V1.32A1.32 1.32 0 0022.68 0z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10">
          <p className="text-gray-500">
            &copy; 2024 Betalyfe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
