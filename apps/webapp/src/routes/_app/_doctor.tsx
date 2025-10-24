import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Fragment, useState, useEffect } from 'react'
import BetalyfeLogo from '../../assets/images/betalyfeLogo3.png'
import { cn } from '@beta-lyfe/ui/components/shad/lib/utils'
import { useLocation } from '@tanstack/react-router'
import {
  Calendar,
  MessageSquare,
  Users,
  Search,
  Menu,
  Home,
  Bell,
  Settings,
  LogOut,
  X,
  DollarSign,
  FileText,
  Sun,
  Moon,
  Stethoscope,
  Wallet
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
import { Switch } from '@beta-lyfe/ui/components/shad/ui/switch'
import { Label } from '@beta-lyfe/ui/components/shad/ui/label'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_doctor')({
  component: DoctorLayout
})

interface DoctorLayoutProps {
  children: React.ReactNode
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const pathnamearr = useLocation().pathname.split('/')
  const pathname = '/'.concat(pathnamearr[pathnamearr.length - 1])
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  console.log(pathname, 20303)
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

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }

  const navigation = [
    { name: 'Dashboard', to: '/doctor/dashboard', icon: Home },
    {
      name: 'Appointments',
      to: '/doctor/dashboard/appointments',
      icon: Calendar
    },
    { name: 'Patients', to: '/doctor/dashboard/patients', icon: Users },
    { name: 'Earnings', to: '/doctor/dashboard/earnings', icon: DollarSign },
    { name: 'profile', to: '/doctor/dashboard/profile', icon: Stethoscope }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-950/95 dark:border-gray-800">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link
              to="/doctor/dashboard"
              className="flex items-center space-x-2"
            >
              <img
                src="/images/betalyfe-icon.svg"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-bold text-lg hidden md:inline-block">
                ST connect MD
              </span>
            </Link>
          </div>

          <div className="flex-1 flex justify-end md:justify-between items-center gap-2">
            <div className="relative w-full max-w-sm hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search patients, appointments..."
                className="w-full bg-background pl-8 h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-gray-900 dark:border-gray-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Switch
                  id="theme-toggle"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
                <Label htmlFor="theme-toggle" className="cursor-pointer">
                  {theme === 'dark' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Label>
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>

              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Link to="/doctor/dashboard/wallet">
                    <Button variant="ghost" size="icon">
                      <Wallet className="h-5 w-5" />
                    </Button>
                  </Link>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1 rounded-md dark:bg-primary/20">
                          <Stethoscope className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-bold text-lg">ST connect MD</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-6 px-3">
                      <Switch
                        id="mobile-theme-toggle"
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                      />
                      <Label
                        htmlFor="mobile-theme-toggle"
                        className="cursor-pointer"
                      >
                        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                      </Label>
                    </div>

                    <div className="flex flex-col gap-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                            pathname === item.to ||
                              pathname.startsWith(`${item.to}/`)
                              ? 'bg-primary/10 text-primary dark:bg-primary/20'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto border-t pt-4 dark:border-gray-800">
                      <Link
                        to="/"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Settings className="h-5 w-5" />
                        Settings
                      </Link>
                      <Link
                        to="/auth/sign-in"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <a href="#!" className="hidden md:flex">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32&text=DR"
                    alt="Doctor"
                  />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with sidebar for desktop */}
      <div className="flex-1 flex">
        {/* Desktop sidebar */}
        <div className="hidden md:flex w-64 flex-col border-r bg-background dark:bg-gray-950 dark:border-gray-800">
          <div className="flex-1 flex flex-col gap-0.5 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                  pathname === item.to || pathname.startsWith(`${item.to}/`)
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="p-4 border-t dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40&text=DR"
                  alt="Doctor"
                />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">Dr. Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Cardiologist</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a
                href="#!"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Settings className="h-5 w-5" />
                Settings
              </a>
              <Link
                to="/auth/sign-in"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 container py-4 md:py-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <div className="sticky bottom-0 z-30 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-950/95 dark:border-gray-800">
          <div className="grid grid-cols-5 h-16">
            {navigation.slice(0, 5).map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  'flex flex-col items-center justify-center gap-1',
                  pathname === item.to || pathname.startsWith(`${item.to}/`)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
