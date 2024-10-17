import { Input } from '@beta-lyfe/webapp/components/input'
import { Typography } from '@beta-lyfe/webapp/components/typography'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import {
  Carousel,
  CarouselItem,
  CarouselContent
} from '@beta-lyfe/webapp/components/shad/ui/carousel'
import { Button } from '@beta-lyfe/webapp/components/shad/ui/button'
import {
  ArrowRightIcon,
  ArrowUpRight,
  BuildingIcon,
  CalendarCheckIcon,
  MessageSquareIcon,
  PillIcon,
  SearchIcon,
  StethoscopeIcon
} from 'lucide-react'
import { quickNav } from './schedule'
import { Wallet } from 'lucide-react'
import { BottomNav } from '../-components/bottom-nav'
import type { Doctor } from '@beta-lyfe/webapp/lib/backend/api/doctors'
import { backend } from '@beta-lyfe/webapp/lib/backend'
import { LogoIcon } from '@beta-lyfe/webapp/components/icons'
import doctorImage from '@beta-lyfe/webapp/assets/images/doctor.png'

export const Route = createFileRoute('/_app/dashboard/')({
  component: ChatsListPage
})

function ChatList() {
  const { data, status } = backend.api.doctors.useGetDoctors()

  if (status === 'pending' || status === 'error') return null

  const doctors = data

  return (
    <div className="grid grid-flow-row grow divide-y-2 divide-gray-300">
      {doctors.map((doctor) => (
        <Link
          to="/dashboard/doctors/profile/$doctorId"
          params={{ doctorId: doctor.id }}
          state={{}}
          key={doctor.id}
          className="flex gap-4 p-4"
        >
          <span className="bg-gray-200 size-12 rounded-full overflow-hidden">
            <img
              src={doctor.image_url}
              alt={`${doctor.first_name} ${doctor.last_name}`}
              className="size-full object-cover"
            />
          </span>
          <span className="flex items-center">
            <span>
              {doctor.first_name} {doctor.last_name}
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}

const DoctorsCarousel = () => {
  const { data, status } = backend.api.doctors.useGetDoctors()

  if (status === 'pending' || status === 'error') return null

  const doctors = data

  return (
    <Carousel>
      <CarouselContent>
        {doctors.map((doctor) => (
          <CarouselItem
            key={`${doctor.first_name} ${doctor.last_name}`}
            className="basis-auto"
          >
            <div className="border-2 border-gray-300 rounded-2xl aspect-card w-[200px] shadow-md flex flex-col overflow-clip">
              <div className="bg-gray-300 flex justify-center items-end">
                <img
                  src={doctor.image_url}
                  alt={`${doctor.first_name} ${doctor.last_name}`}
                  className="w-full object-cover h-[230px] object-center"
                />
              </div>
              <div className="flex flex-col p-3 gap-3 divide-y grow">
                <hgroup className="grow">
                  <Typography.CardHeadingLead>
                    {doctor.specialty}
                  </Typography.CardHeadingLead>
                  <Typography.CardHeading>
                    {doctor.first_name} {doctor.last_name}
                  </Typography.CardHeading>
                </hgroup>
                <div className="flex gap-2 pt-3">
                  <Button className="flex gap-2 font-medium bg-slate-200 text-primary grow">
                    View
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                  <Button className="flex gap-2 font-medium">
                    <MessageSquareIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

function ChatsListPage() {
  const router = useRouter()
  return (
    <div className="grow">
      <div className="flex justify-between flex-row items-center  bg-primary p-5">
        <LogoIcon />

        <Button
          onClick={() => router.navigate({ to: '/dashboard/wallet' })}
          className="flex  justify-around bg-[#ffffff30] hover:bg-[#ffffff30] gap-4 items-center"
        >
          <Wallet color="white" />
          <Typography.Info className="text-white">₦ 3000.00</Typography.Info>
        </Button>
      </div>

      <div className="p-5 pt-0 bg-primary grid grid-flow-row gap-5">
        <div className="flex flex-col-reverse gap-3">
          <div className="p-0">
            <div className="bg-primary rounded-lg grid grid-cols-2 aspect-video">
              <div className="grid items-center p-5">
                <div className="flex flex-col gap-2">
                  <header className="text-white leading-relaxed text-lg font-semibold">
                    Get 10% off for your first 5 minutes
                  </header>
                  <div>
                    <Link to="/dashboard">
                      <Button className="rounded-full bg-white flex gap-2 items-center text-primary shadow-md">
                        Try it
                        <ArrowRightIcon className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid place-items-end">
                <img
                  className="aspect-square object-cover object-center"
                  src={doctorImage}
                  alt="doctor"
                />
              </div>
            </div>
          </div>
          <div>
            <Input
              icon={
                <SearchIcon className="stroke-[3px] text-slate-300 size-5" />
              }
              placeholder="Search for a Doctor"
            />
          </div>
        </div>
      </div>
      <div className="p-5">
        <Typography.PageHeading className="pb-5">
          Our Services
        </Typography.PageHeading>
        <div className="grid grid-cols-4 gap-5">
          {quickNav.map(({ text, icon: Icon, link }, index) => (
            <Link to={link} key={index}>
              <div key={index} className="flex flex-col gap-2">
                <div
                  className="rounded-lg bg-slate-200 grid place-items-center aspect-square"
                  key={index}
                >
                  <Icon className="size-6 stroke-primary" />
                </div>
                <Typography.HeadingLead className="text-center">
                  {text}
                </Typography.HeadingLead>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <Typography.PageHeading>Top Doctors</Typography.PageHeading>
          <Link
            to="/dashboard/doctors"
            className="text-primary text-xs font-medium"
          >
            See All
          </Link>
        </div>
        <div className="py-5">
          <DoctorsCarousel />
        </div>
      </div>
      <div className="pb-10">
        <ChatList />
      </div>
      <BottomNav />
    </div>
  )
}
