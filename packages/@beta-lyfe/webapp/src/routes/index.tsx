import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  useRouter().navigate({
    to:'/onboarding'
  })
  return <div>Hello "/"!</div>
}
