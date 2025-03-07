import { createFileRoute } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex items-center justify-center h-full">
    <Loader2Icon className="size-12 stroke-primary animate-spin" />
  </div>
}
