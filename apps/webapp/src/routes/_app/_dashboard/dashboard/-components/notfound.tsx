import { Button } from '@beta-lyfe/ui/components/button'
import { Link, useRouter } from '@tanstack/react-router'
import {
  Stethoscope,
  Home,
  Search,
  ArrowLeft,
  Pill,
  HeartPulse
} from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  router.navigate({ to: '/dashboard' })

  return (
    <div className="h-dvh flex overflow-hidden flex-col items-center justify-center p-6 bg-gradient-to-b from-primary-50 to-background">
      <div className="w-full max-w-md text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-30">
            <HeartPulse className="h-48 w-48 text-primary" />
          </div>

          <div className="relative flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <img
                src="/images/logo-stl.png"
                className="w-14 h-14 rounded-full"
              />
            </div>

            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <div className="flex items-center gap-2 mb-4">
              <Pill className="h-5 w-5 text-primary animate-bounce" />
              <h2 className="text-2xl font-semibold">Page Not Found</h2>
              <Pill className="h-5 w-5 text-primary animate-bounce" />
            </div>

            <p className="text-muted-foreground mb-2">
              Oops! It seems we can't find the page you're looking for.
            </p>
            <p className="text-muted-foreground mb-8">
              The page might have been moved, deleted, or is temporarily
              unavailable.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild size="lg" className="w-full text-white">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Return Home
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full ">
              <Link to="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go to Dashboard
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-muted"></div>
              <span className="mx-4 text-sm text-muted-foreground">or</span>
              <div className="flex-grow border-t border-muted"></div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search for doctors, services, or pages..."
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button className="ml-2 text-white">Search</Button>
          </div>
        </div>

        <div className="mt-10 text-sm text-muted-foreground">
          <p>
            Need help?{' '}
            <Link to="/" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>

      {/* Animated elements for visual interest */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-10 hidden md:block">
        <HeartPulse
          className="h-24 w-24 text-primary animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 opacity-10 hidden md:block">
        <Pill
          className="h-24 w-24 text-primary animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>
    </div>
  )
}
