import { Button } from '@beta-lyfe/webapp/shad/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { StethoscopeIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/doctors/')({
  component: DoctorsPage
})

function DoctorsPage() {
  return (
    <ElevatedButton />
  )
}

function ElevatedButton(){
  return(
    <div className='rounded'>
       <Button className='py-10 px-8 shadow-xl rounded-full'>
      <StethoscopeIcon color='white'/>
    </Button>
    </div>
  )
}
