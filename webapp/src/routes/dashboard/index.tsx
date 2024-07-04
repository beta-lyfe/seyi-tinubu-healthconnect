import { Input } from "@/components/input"
import { Typography } from "@/components/typography"
import { Button } from "@/shad/ui/button"
import { Link, createFileRoute, useNavigate, useRouter } from "@tanstack/react-router"
import { Microscope, Wallet } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shad/ui/carousel"

import { ArrowRightIcon, ArrowUpRight, BuildingIcon, CalendarCheckIcon, MessageSquareIcon, PillIcon, SearchIcon, StethoscopeIcon } from "lucide-react"
import { BottomNav } from "@/routes/-components/bottom-nav"

export const Route = createFileRoute('/dashboard/')({
  component: IndexPage,
})


export const quickNav = [
  {
    text: "Doctor",
    icon: StethoscopeIcon,
    link:"/dashboard/chats"
  },
  {
    text: "Pharmacy",
    icon: PillIcon
  },
  {
    text: "Appointment",
    icon: CalendarCheckIcon
  },
  {
    text: "Labs",
    icon: Microscope
  }
]

export const doctors = [
  {
    firstName: "Goodseed",
    lastName: "Reginald",
    specialty: "Prosthetitian",
    image: "/images/doctors/john-doe.png"
  },
  {
    firstName: "Anna",
    lastName: "Michaels",
    specialty: "Paediatritian",
    image: "/images/doctors/anna-michaels.png"
  },
  {
    firstName: "Maria",
    lastName: "Watts",
    specialty: "Geriatritian",
    image: "/images/doctors/maria-watts.png"
  }
]

function IndexPage() {
  return (
    <main className="selection:bg-black selection:text-primary">
      <div
        className="bg-primary p-5 flex flex-col gap-5"
      >
       
        <div>
          <Input
            icon={<SearchIcon className="stroke-[3px] text-slate-300 size-5" />}
            placeholder="Search for a doctor or health issue"
          />
        </div>
      </div>
      <div
        className="grid grid-cols-4 gap-5 p-5"
      >
        {quickNav.map(({ text, icon: Icon ,link}) => (
          <Link to={link}><div key={text} className="flex flex-col gap-2">
            <div className="rounded-lg bg-slate-200 grid place-items-center aspect-square">
              <Icon className="size-6 stroke-primary" />
            </div>
            <Typography.HeadingLead className="text-center">
              {text}
            </Typography.HeadingLead>
          </div>
          </Link>
        ))}
      </div>

    
      <BottomNav />
    </main>
  )
}
