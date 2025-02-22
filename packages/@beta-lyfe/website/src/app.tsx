import { zodResolver } from '@hookform/resolvers/zod'
import { SocialIcon } from 'react-social-icons'
import { toast } from 'sonner'
import { Button } from '@beta-lyfe/ui/components/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem
} from '@beta-lyfe/ui/components/shad/ui/form'
import { client } from './api'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'

const waitlistFormSchema = z.object({
  email: z.string().email()
})
type WaitlistFormSchema = z.infer<typeof waitlistFormSchema>

export function App() {
  const form = useForm<WaitlistFormSchema>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: { email: '' }
  })

  const { mutate: joinWaitlist, status } = useMutation({
    mutationFn: async (data: WaitlistFormSchema) => {
      try {
        const res = await client.POST('/api/waitlist', { body: data })
        if (res.error) throw new Error(res.error.message)
        return res.data
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'Failed to fetch') {
            throw new Error('Please check your internet connection')
          }
        }
        throw err
      }
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success('You have been added to the waitlist')
    },
    onError: (err) => {
      toast.warning(err.message)
    }
  })

  const emailRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = (data: WaitlistFormSchema) => {
    joinWaitlist(data)
  }

  const isSubmitting = form.formState.isSubmitting || status === 'pending'

  return (
    <div className="relative w-full h-lvh overflow-hidden flex flex-col justify-center p-2 items-center">
      <CircleInWaitList position="top-left">
        <img
          src="betalyfe-icon.svg"
          className="mt-12 ml-12 w-[60px] md:w-[120px] rounded-full"
          alt="BetaLyfe"
        />
      </CircleInWaitList>
      <CircleInWaitList position="bottom-right" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-center text-xs font-bold">— Coming soon —</p>
          <h1 className="text-center text-4xl md:text-5xl text-black font-extrabold">
            Get Notified When we Launch
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[360px] flex self-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div
                    className="flex items-center gap-4 border-2 border-black p-[3px] rounded-lg bg-[#F3F4F6] pl-5"
                    onClick={() => emailRef.current?.focus()}
                    onKeyUp={() => emailRef.current?.focus()}
                  >
                    <input
                      type="email"
                      className="grow border-none focus:[box-shadow:none] focus:outline-none focus:border-none bg-transparent p-0"
                      placeholder="Enter Your email address"
                      {...field}
                      ref={(e) => {
                        field.ref(e)
                        emailRef.current = e
                      }}
                    />
                    <Button type="submit" disabled={isSubmitting} className='text-white'>
                      Notify me
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3">
          <h2 className="text-center text-black text-sm">
            Don't worry, we won't spam you ;)
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <SocialIcon
              network="x"
              url="https://twitter.com"
              bgColor="transparent"
              fgColor="black"
              className="border-black border-2 rounded-full size-6"
            />
            <SocialIcon
              network="instagram"
              url="https://instagram.com"
              bgColor="transparent"
              fgColor="black"
              className="border-black border-2 rounded-full size-6"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CircleInWaitList({
  position,
  children
}: {
  position: 'top-left' | 'bottom-right'
  children?: React.ReactNode
}) {
  return (
    <div
      className={`border-black
            flex justify-center items-center
            -z-10 border-2 absolute size-[256px] md:size-[512px] rounded-full bg-primary ${
              position === 'top-left'
                ? 'top-0 left-0 -translate-x-1/3 -translate-y-1/3'
                : 'bottom-0 right-0 translate-x-1/3 translate-y-1/3'
            }`}
    >
      {children}
    </div>
  )
}
