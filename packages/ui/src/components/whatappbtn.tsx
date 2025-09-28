import { Phone } from 'lucide-react'
import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
import { useState } from 'react'
import { SocialIcon } from 'react-social-icons'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348000000000', '_blank')
  }

  return (
    <div className="fixed bottom-0 right-0 z-50">
      <div className="relative">
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className=" bg-transparent p-6"
        >
          <SocialIcon network="whatsapp" />
          <span className="sr-only">Contact us on WhatsApp</span>
        </button>
      </div>
    </div>
  )
}
