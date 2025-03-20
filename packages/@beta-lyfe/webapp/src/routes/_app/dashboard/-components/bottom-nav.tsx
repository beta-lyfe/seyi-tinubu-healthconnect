import { cn } from '@beta-lyfe/ui/components/shad/lib/utils'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  CalendarIcon,
  HomeIcon,
  type LucideIcon,
  MessageSquareIcon,
  UserIcon
} from 'lucide-react'
import { FileRoutesByTo } from '../../../../routeTree.gen'

type Item = {
  icon: LucideIcon
  key: string
  label: string
  link: keyof FileRoutesByTo
}

const items: Item[] = [
  {
    icon: HomeIcon,
    key: 'home',
    label: 'Home',
    link: '/dashboard'
  },
  {
    icon: MessageSquareIcon,
    key: 'conversations',
    label: 'Conversations',
    link: '/dashboard/chats/$doctorId'
  },
  {
    icon: CalendarIcon,
    key: 'schedules',
    label: 'Schedules',
    link: '/dashboard/schedule'
  },
  {
    icon: UserIcon,
    key: 'profile',
    label: 'Profile',
    link: '/dashboard/profile'
  }
]

export const BottomNav = () => {
  const router = useRouterState()

  return (
    <div className="rounded-t-xl bg-primary py-4">
      <div className="flex justify-evenly">
        {items.map((item) => {
          const isActive = router.location.href === item.link
          return (
            <Link to={item.link}>
            <button
              key={item.key}
              type="button"
              className={cn(
                'p-4 flex items-center gap-2',
                isActive
                  ? 'bg-white text-black rounded-full'
                  : 'text-gray-200'
              )}
            >
              <item.icon className="size-6" />
              <span className={cn('text-sm', !isActive && 'hidden')}>
                {item.label}
              </span>
            </button>
           </Link>  
          )
        })}
      </div>
    </div>
  )
}
