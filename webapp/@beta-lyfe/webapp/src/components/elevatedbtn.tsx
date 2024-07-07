import { StethoscopeIcon } from "lucide-react"
import { Button } from "@beta-lyfe/webapp/shad/ui/button"
import { Link } from "@tanstack/react-router"


export default function ElevatedButton(){
    return(
        <Link to="/dashboard/chats">
        <div className="rounded-full border-white shadow-xl absolute top-1.5 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-primary rounded-full py-6 w-min px-6">
                <StethoscopeIcon color='white'/>
                </div>
            </div>
        </Link>
            
    
    )
  }
