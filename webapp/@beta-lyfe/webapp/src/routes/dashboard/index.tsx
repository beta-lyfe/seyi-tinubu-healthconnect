import { Input } from '@beta-lyfe/webapp/components/input'
import { Typography } from '@beta-lyfe/webapp/components/typography'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { Carousel,CarouselItem ,CarouselContent} from '@beta-lyfe/webapp/shad/ui/carousel'
import { Button } from '@beta-lyfe/webapp/shad/ui/button'
import { ArrowRightIcon, ArrowUpRight, BuildingIcon, CalendarCheckIcon, MessageSquareIcon, PillIcon, SearchIcon, StethoscopeIcon } from "lucide-react"
import { doctors, quickNav } from './schedule'
import { Wallet } from 'lucide-react'
import { BottomNav } from "@beta-lyfe/webapp/routes/-components/bottom-nav"
import doctorJohnDoe from '@beta-lyfe/webapp/assets/images/doctors/john-doe.png'
import doctorAnnaMichaels from '@beta-lyfe/webapp/assets/images/doctor.png'
import doctorMariaWatts from '@beta-lyfe/webapp/assets/images/doctors/maria-watts.png'

export const Route = createFileRoute('/dashboard/')({
  component: ChatsListPage
})

const chatList = [
  {
    id: "1",
    firstName: "Goodseed",
    lastName: "Reginald",
    image: "/images/doctors/john-doe.png"
  },
  {
    id: "2",
    firstName: "Anna",
    lastName: "Michaels",
    image: "/images/doctors/anna-michaels.png"
  },
  {
    id: "3",
    firstName: "Maria",
    lastName: "Watts",
    image: "/images/doctors/maria-watts.png"
  }
]

function ChatList() {
  return (
    <div
      className="grid grid-flow-row grow divide-y-2 divide-gray-300"
    >
      {chatList
        .map((chat) => (
          <Link
            to='/dashboard/doctors/profile/$doctorId'
            params={{doctorId : chat.id}}
            state={{}}
            key={chat.id}
            className="flex gap-4 p-4"
          >
            <span className="bg-gray-200 size-12 rounded-full overflow-hidden">
              <img
                src={chat.image}
                alt={`${chat.firstName} ${chat.lastName}`}
                className="size-full object-cover" />
            </span>
            <span className="flex items-center">
              <span>
                {chat.firstName} {chat.lastName}
              </span>
            </span>
          </Link>
        ))}
    </div>
  )
}

function ChatsListPage() {
  const router=useRouter()
  return (
    <div className="grow">
       <div
       
          className="flex justify-between flex-row items-center  bg-primary p-5"
        >
          <img 
          className='w-[180px]'
          src='/images/betalyfe.png'
          />
          
          <Button 
          onClick={()=>router.navigate({to:'/dashboard/wallet'})}
          className="flex  justify-around bg-[#ffffff30] hover:bg-[#ffffff30] gap-4 items-center">
            <Wallet color="white"/>
            <Typography.Info className="text-white">₦ 3000.00</Typography.Info>
          </Button>
        </div>
       
      <div className="p-5 pt-0 bg-primary grid grid-flow-row gap-5">
      <div className='flex flex-col-reverse gap-3'>
      <div
        className="p-0"
      >
        <div className="bg-primary rounded-lg grid grid-cols-2 aspect-video">
          <div className="grid items-center p-5">
            <div className="flex flex-col gap-2">
              <header className="text-white leading-relaxed text-lg font-semibold">
                Get 10% off for your first 5 minutes
              </header>
              <div>
                <Link to='/dashboard'>
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
              src="/images/doctor.png"
              alt="doctor" />
          </div>
        </div>
      </div>
        <div >
          <Input
            icon={<SearchIcon className="stroke-[3px] text-slate-300 size-5" />}
            placeholder="Search for a Doctor"
          />
        </div>
      </div>
      </div>
      <div className='p-5'>
      <Typography.PageHeading className='pb-5'>
            Our Services
          </Typography.PageHeading>
      <div
        className="grid grid-cols-4 gap-5"
      >
      {quickNav.map(({ text, icon: Icon ,link},index) => (
          <Link to={link}  key={index}><div key={index} className="flex flex-col gap-2">
            <div className="rounded-lg bg-slate-200 grid place-items-center aspect-square" key={index}>
              <Icon className="size-6 stroke-primary" />
            </div>
            <Typography.HeadingLead className="text-center" >
              {text}
            </Typography.HeadingLead>
          </div>
          </Link>
        ))}
        </div>
        </div>
      <div
        className="p-5"
      >
        <div className="flex items-center justify-between">
          <Typography.PageHeading>
            Top Doctors
          </Typography.PageHeading>
          <Link
            to='/dashboard/doctors'
            className="text-primary text-xs font-medium"
          >
            See All
          </Link>
        </div>
        <div className="py-5">
          <Carousel>
            <CarouselContent>
              {doctors.map(({ firstName, lastName, image, specialty }) => (
                <CarouselItem
                  key={`${firstName} ${lastName}`}
                  className="basis-auto"
                >
                  <div
                    className="border-2 border-gray-300 rounded-2xl aspect-card w-[200px] shadow-md flex flex-col overflow-clip">
                    <div className="bg-gray-300 flex justify-center items-end">
                      <img
                        src={image}
                        alt={`${firstName} ${lastName}`}
                        className="w-full object-cover h-[230px] object-center"
                      />
                    </div>
                    <div className="flex flex-col p-3 gap-3 divide-y grow">
                      <hgroup className="grow">
                        <Typography.CardHeadingLead>
                          {specialty}
                        </Typography.CardHeadingLead>
                        <Typography.CardHeading>
                          {firstName} {lastName}
                        </Typography.CardHeading>
                      </hgroup>
                      <div className="flex gap-2 pt-3">
                        <Button
                          className="flex gap-2 font-medium bg-slate-200 text-primary grow"
                        >
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
        </div>
      </div>
      <div className='pb-10'>
        <ChatList />
      </div>
      <BottomNav />
    </div>
  )
}
