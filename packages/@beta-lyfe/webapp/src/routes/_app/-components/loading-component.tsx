import { Loader2, Pill, Video } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative flex items-center justify-center">
          {/* Rotating Semi-circle */}
         <Loader2 className="animate-spin text-primary h-32 w-32 absolute" />

          {/* Pill Icon */}
          <div className="absolute animate-pulse">
          <img src='/images/betalyfe-icon.svg' className='w-24 h-24 rounded-full'/>
          </div>
          
        </div>

        {/* Scaling Logo */}
        <div className="mt-14 flex items-center justify-center animate-scale">
          <span className="text-2xl font-bold">BetaLyfe</span>
        </div>

        <p className="mt-4 text-muted-foreground">Loading your healthcare experience...</p>
      </div>
    </div>
  )
}

