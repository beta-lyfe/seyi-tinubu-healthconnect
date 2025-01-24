import { cn } from "@beta-lyfe/webapp/components/shad/lib/utils"
import { Link, useRouter } from "@tanstack/react-router"
import { Calendar, CalendarDays, CircleUserRoundIcon, Clock3, Clock3Icon, HomeIcon, MessageSquareIcon, MessageSquareMoreIcon, StethoscopeIcon, User, User2 } from "lucide-react"
import { FunctionComponent } from "react"
import ElevatedButton from "@beta-lyfe/webapp/components/elevatedbtn"

type IconProps = {
  className?: string,
}

type navProps={
  text:string,
  link:string,
  icon:FunctionComponent<{className:string}>,
  main:boolean,
  iconFilled:FunctionComponent<{className:string}>
}

const nav :navProps[] = [
  {
    text: "Schedule",
    link: "/dashboard/schedule",
    main:false,
    icon: ({ className }: IconProps) => <CalendarDays className={cn(className,"stroke-white size-7")} fill="#f382ec"/>,
    iconFilled: ({ className }: IconProps) => <CalendarDays className={cn(className,"stroke-primary size-7")} fill="white" />
  },
 /* {
    text: "Doctors",
    link: "/dashboard/chats",
    main:true,
    icon: ({ className }: IconProps) => <StethoscopeIcon className={cn(className)} />,
    iconFilled: ({ className }: IconProps) => <HomeIcon className={cn(className)} />
  },
  */
 /* {
    text: "Chats",
    link: "/chats",
    icon: ({ className }: IconProps) => <MessageSquareMoreIcon className={cn(className)} />,
    iconFilled: ({ className }: IconProps) => <HomeIcon className={cn(className)} />
  }, */
  {
    text: "Profile",
    link: "/dashboard/profile",
    main:false,
    icon: ({ className }: IconProps) => <User2 className={cn(className,"stroke-white size-7")} fill="#f382ec" />,
    iconFilled: ({ className }: IconProps) => <User2 className={cn(className,"stroke-primary size-7")} fill="white" />
  }
]

export function BottomNav() {
  return (
    <>
      <div className="h-12 mt-10" />
      <div className="fixed bottom-0 left-0 w-full bg-white grid grid-cols-2 p-5 gap-x-10">
      {nav.map((data,index) => <BottomNavLink {...data} key={index} iconFilled={data.iconFilled}/>)}
        <ElevatedButton />
      </div>
    </>
  )
}

const BottomNavLink: FunctionComponent<{
  link: string
   text: string,
   main:boolean,
   iconFilled:FunctionComponent<{ className: string}>,
  icon: FunctionComponent<{ className: string}>
  }> = ({ link, text, icon: Icon,main ,iconFilled:IconFilled}) => {
  const router =useRouter()
  const active = router.history.location.pathname === link

  return (
    <>
      <Link
            to={link}
            key={text}
            className={cn("flex flex-col items-center justify-center gap-1")}
          >
           {
            active ? <Icon className='size-6'/> : <IconFilled className='size-6'/>
           }
            <span className={cn("text-sm",active && "font-bold")}>
              {text}
            </span>
          </Link>
    </>
          
  )
}
