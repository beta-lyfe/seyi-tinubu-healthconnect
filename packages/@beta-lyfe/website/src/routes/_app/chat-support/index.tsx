import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/chat-support/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/chat-support/"!</div>
}
