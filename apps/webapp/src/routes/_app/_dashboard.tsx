import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { MainLayout } from './_dashboard/dashboard/-components/main-layout'
import { useAuth } from '../../hooks/auth'
import { useEffect } from 'react'


export const Route = createFileRoute('/_app/_dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  
  const auth=useAuth()
 
  const router=useRouter()
  if(auth.data.status==='unauthenticated'){
    router.navigate({
      to:'/auth/sign-in'
    })

    return null
  }

  if(auth.data.status==='authenticating'){
    return null
  }

  if(!auth.data.data.user.data.is_verified){
    router.navigate({
      to:'/auth/verify',
      search:{
        email:auth.data.data.user.data.email
      }
    })

    return null
  }

  return (
    <div className="w-full">
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  )
}
