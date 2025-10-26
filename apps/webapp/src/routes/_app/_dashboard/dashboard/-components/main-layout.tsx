import { useState, useEffect } from 'react'
import {
  Calendar,
  MessageSquare,
  User,
  Search,
  Menu,
  Home,
  Bell,
  Settings,
  LogOut,
  X,
  Wallet,
  Pill
} from 'lucide-react'
import { Button } from '@beta-lyfe/ui/components/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@beta-lyfe/ui/components/shad/ui/sheet'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@beta-lyfe/ui/components/shad/ui/avatar'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import { Link, useRouter, useLocation } from '@tanstack/react-router'
import { cn } from '@beta-lyfe/ui/components/shad/lib/utils'
import { auth, useAuth } from '../../../../../hooks/auth'
import { toast } from 'sonner'

interface MainLayoutProps {
  children: React.ReactNode
}


export  function MainLayout({ children }: MainLayoutProps) {
  const pathname = useLocation().pathname
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user=useAuth(true).data.data.user
  const update=useAuth().update
  const profile=user.profiles.patient
  const router=useRouter()


  const logout=async ()=>{
  update({status:'unauthenticated'})
  toast.success("Logged user out")  
  router.navigate({
    to:'/auth/sign-in'
  })
}


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const navigation = [
    { name: 'Home', to: '/dashboard', icon: Home },
    { name: 'Doctors', to: '/dashboard/doctors', icon: Search },
    { name: 'schedule', to: '/dashboard/schedule', icon: Calendar },
    { name: 'Pharmacy', to: '/dashboard/pharmacy/product', icon: Pill },
    { name: 'Profile', to: '/dashboard/profile', icon: User }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {/* <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> */}
       <header className="sticky top-0 z-30 w-full border-b bg-white">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center gap-3">
            <img
              src="/images/logo-stl.png"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-primary font-bold">ST connect</p>
          </div>

          <div className="flex-1 flex justify-end md:justify-between items-center gap-2">
            <div className="relative w-full max-w-sm hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search doctors, specialties..."
                className="w-full bg-background pl-8 h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  2
                </Badge>
              </Button>
              <Link to="/dashboard/wallet">
                <Button variant="ghost" size="icon" className="relative">
                  <Wallet className="h-5 w-5" />
                </Button>
              </Link>

              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1 rounded-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </div>
                        <span className="font-bold text-lg">ST connect</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex flex-col gap-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                            pathname === item.to
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto border-t pt-4">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Settings className="h-5 w-5" />
                        Settings
                      </Link>
                      <Button
                        onClick={()=>logout()}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link to="/dashboard/profile" className="hidden md:flex">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with sidebar for desktop */}
      <div className="flex-1 flex">
        {/* Desktop sidebar */}
        <div className="hidden md:flex w-64 flex-col border-r bg-background">
          <div className="flex-1 flex flex-col gap-0.5 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                  pathname === item.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{profile?.first_name} {profile?.last_name}</p>
                <p className="text-xs text-muted-foreground">
                  {profile?.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <Button
                onClick={()=>logout()}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 container py-4 md:py-6">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        // <div className="sticky bottom-0 z-30 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="sticky bottom-0 z-30 w-full border-t bg-white">
          <div className="grid grid-cols-5 h-16">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  'flex flex-col items-center justify-center gap-1',
                  pathname === item.to
                    ? 'text-primary font-bold'
                    : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-5 w-5 font-bold" />
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
