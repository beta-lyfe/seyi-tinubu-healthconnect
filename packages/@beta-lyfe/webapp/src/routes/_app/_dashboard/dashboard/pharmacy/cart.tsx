import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_dashboard/dashboard/pharmacy/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/pharmacy/cart"!</div>
}
