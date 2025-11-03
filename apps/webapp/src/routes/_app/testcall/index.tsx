import { Button } from '@beta-lyfe/ui/components/button'
import { Input } from '@beta-lyfe/ui/components/input'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_app/testcall/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router=useRouter()
  const [token,setToken]=useState("")
  return <div>
    <Input type='text' value={token} onChange={(e)=>setToken(e.target.value)}/>
    <Button 
    onClick={()=>router.navigate({to:'/testcall/call',search:{
      roomname:'ST connect',
      token:token
    }})}
    >move to consulation</Button>
  </div>
}