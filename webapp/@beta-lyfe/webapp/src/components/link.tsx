import { HTMLAttributes, forwardRef } from "react";
import { useRouter } from "@tanstack/react-router"

export const BackLink = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(({ children, onClick, ...props }, ref) => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={(e) => {
        router.history.back()
        onClick?.(e)
      }}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

