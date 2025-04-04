import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/privacy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/privacy/"!</div>
}
