import { cn } from "@beta-lyfe/webapp/shad/lib/utils"
import { Link, useRouter } from "@tanstack/react-router"
import { CircleUserRoundIcon, HomeIcon, MessageSquareIcon, MessageSquareMoreIcon, StethoscopeIcon } from "lucide-react"
import { FunctionComponent } from "react"
import ElevatedButton from "@beta-lyfe/webapp/components/elevatedbtn"

type IconProps = {
  className?: string
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
    text: "Home",
    link: "/dashboard/",
    main:false,
    icon: ({ className }: IconProps) => <HomeIcon className={cn(className)}/>,
    iconFilled: ({ className }: IconProps) => <HomeIcon className={cn(className)} />
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
    icon: ({ className }: IconProps) => <CircleUserRoundIcon className={cn(className)} />,
    iconFilled: ({ className }: IconProps) => <HomeIcon className={cn(className)} />
  }
]

export function BottomNav() {
  return (
    <>
      <div className="h-12" />
      <div className="fixed bottom-0 left-0 w-full bg-white grid grid-cols-2 p-5 gap-x-10">
      {nav.map(data => <BottomNavLink {...data} />)}
      <ElevatedButton />
      </div>
    </>
  )
}

const BottomNavLink: FunctionComponent<{
  link: string
   text: string,
   main:boolean,
  icon: FunctionComponent<{ className: string}>
  }> = ({ link, text, icon: Icon,main }) => {
  const router =useRouter()
  const active = router.history.location.pathname === link

  return (
    <>
      <Link
            to={link}
            key={text}
            className={cn("flex flex-col items-center justify-center gap-1")}
          >
            <Icon className={cn("size-5",active && "stroke-primary")}/>
            <span className={cn("text-sm",active && "font-bold")}>
              {text}
            </span>
          </Link>
    </>
          
  )
}
