import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_extras/specialties')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/_app/_extras/specialties"!</div>
}
