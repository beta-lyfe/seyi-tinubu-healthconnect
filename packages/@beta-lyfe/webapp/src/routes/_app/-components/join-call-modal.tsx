
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@beta-lyfe/ui/components/shad/ui/dialog"
import { Button } from "@beta-lyfe/ui/components/shad/ui/button"
import { Video, Phone, X } from "lucide-react"
import { useRouter } from "@tanstack/react-router"

interface JoinCallModalProps {
  isOpen: boolean
  onClose: () => void
  token: string
  roomname: string,
    doctorName: string
    patientName: string
 
}

export default function JoinCallModal({
  isOpen,
  onClose,
  token,
  roomname,
  doctorName,
    patientName
}: JoinCallModalProps) {
  const [isJoining, setIsJoining] = useState(false)
  const router=useRouter()

  const handleJoinCall = async () => {
    router.navigate({
      to: '/dashboard/consultation',
      search: {
        token,
        roomname,
      },    
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Join Video Call
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Do you want to join the call?</h3>
              {(doctorName || patientName) && (
                <p className="text-sm text-gray-600">
                  {doctorName && patientName
                    ? `Call between Dr. ${doctorName} and ${patientName}`
                    : doctorName
                      ? `Call with Dr. ${doctorName}`
                      : `Call with ${patientName}`}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isJoining}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleJoinCall}
              className="flex-1 bg-primary hover:bg-primaru"
              disabled={isJoining || !token || !roomname}
            >
              <Video className="h-4 w-4 mr-2" />
              {isJoining ? "Joining..." : "Join Call"}
            </Button>
          </div>

          {(!token || !roomname) && (
            <p className="text-sm text-red-600 text-center">Missing call information. Please try again.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
