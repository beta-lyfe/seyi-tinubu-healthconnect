import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
import {
  MultiStepForm,
  StepComponent
} from '@beta-lyfe/ui/components/multi-step-form'
import { createFileRoute, useRouter, Link } from '@tanstack/react-router'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'
import { create } from 'zustand'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  inputOtp
} from '@beta-lyfe/ui/components/shad/ui/input-otp'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@beta-lyfe/ui/components/shad/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthLayout } from './-components/layout'
import { $api } from '@beta-lyfe/webapp/lib/backend'
import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { defaultValues } from './-components/credentials'
import {
  ArrowLeft,
  ArrowLeftFromLine,
  ArrowLeftIcon,
  ArrowRight,
  Lock,
  Stethoscope,
  User
} from 'lucide-react'
import { capitalize } from 'lodash'
import { cn } from '@beta-lyfe/ui/components/shad/lib/utils'

export const Route = createFileRoute('/_app/auth/sign-up')({
  component: SignInPage
})

const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type FormSchema = z.infer<typeof formSchema>

type MultiStepFormBarProps = {
  bars: number
  index: number
}

type MultiFormState = {
  index: number
  setIndex: (index: number) => void
}

function SignInPage() {
  const router = useRouter()
  const goBack = () => router.history.back()
  const [indexedMultiform, setIndexedMultiform] = useState(0)
  const steps = [
    SignupLetGetStartedForm,
    WhatDoYouLikeToBe,
    HowToBeContacted,
    JustOneMoreStep,
    SecureYourAccount,
    VerifyOtp
  ]

  return (
    <AuthLayout.Container>
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-end">
          <Button
            className="self-end border-2 relative border-black w-min flex text-white gap-2"
            type="submit"
          >
            Sign in
          </Button>
        </div>
        <div className="w-full overflow-clip">
          {indexedMultiform < steps.length - 1 && (
            <MultiStepFormBar
              bars={steps.length - 1}
              index={indexedMultiform}
            />
          )}
          <MultiStepForm
            steps={steps}
            index={indexedMultiform}
            setIndex={setIndexedMultiform}
          />
        </div>
        <div />
      </div>
    </AuthLayout.Container>
  )
}

const MultiStepFormBar = ({ bars, index }: MultiStepFormBarProps) => {
  const Bar = ({ coloured }: { coloured: boolean }) => (
    <div
      className={cn(
        'border border-black w-full h-[6px] p-[1px]',
        coloured ? 'bg-primary' : 'bg-transparent'
      )}
    />
  )

  return (
    <div className="max-w-md flex items-center justify-around gap-x-3 py-6">
      {[...Array(bars)].map((_, _index) => (
        <Bar coloured={_index <= index} key={_index} />
      ))}
    </div>
  )
}

const VerifyOtp: StepComponent = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col space-y-6">
      <h2 className="font-bold text-xl md:text-2xl">Verify your account</h2>
      <p className="text-center">
        Enter the 6 digit OTP code sent to joe@gmail.com
      </p>
      <InputOTPPattern />
      <div className="w-full p-6 flex justify-center items-center">
        <Button
          type="submit"
          className="flex items-center gap-2 justify-center w-[400px]
			border-black border-2
			text-white p-4"
        >
          <Lock color="white" /> Verify
        </Button>
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row">
        <p>Didn't receive the code ? </p>
        <span className="text-primary"> Re-send OTP in 10s</span>
      </div>
    </div>
  )
}

const InputOTPPattern = () => {
  const inputOtpSlot = 'border-black border-[2px] rounded-lg ring-0'
  return (
    <InputOTP maxLength={6} pattern={inputOtp.REGEXP_ONLY_DIGITS}>
      <InputOTPGroup className="select-none flex items-center justify-center gap-2 md:gap-5">
        <InputOTPSlot index={0} className={inputOtpSlot} />
        <InputOTPSlot index={1} className={inputOtpSlot} />
        <InputOTPSlot index={2} className={inputOtpSlot} />
        <InputOTPSlot index={3} className={inputOtpSlot} />
        <InputOTPSlot index={4} className={inputOtpSlot} />
        <InputOTPSlot index={5} className={inputOtpSlot} />
      </InputOTPGroup>
    </InputOTP>
  )
}

const SignupForm: StepComponent = () => {
  const toastId = useRef<string | number>()

  const router = useRouter()
  const goBack = () => router.history.back()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues.signIn
  })

  const { mutate } = $api.useMutation('post', '/api/auth/sign-in', {
    onSuccess: (data) => {
      toast.dismiss(toastId.current)
      toast.success('Sign in successful')
    },
    onError: (error) => {
      toast.dismiss(toastId.current)
      toast.error(error.message)
    }
  })

  const onSubmit = (data: FormSchema) => {
    toastId.current = toast.loading('Signing in...')
    mutate({ body: data })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <header className="text-xl font-semibold text-left w-full">
          Sign up
        </header>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/*<Link href="">Forgot password?</Link>*/}
          Alreadh have an account?{' '}
          <Link href="/auth/sign-in" className="text-primary">
            Sign in
          </Link>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const WhatDoYouLikeToBe: StepComponent = ({ next, prev }) => {
  return (
    <div className="md:max-w-md">
      <h2 className="text-xl font-bold">What would you like to be?</h2>
      <div className="flex space-x-5 items-center justify-center p-9">
        <UserOrDoctor who="user" />
        <UserOrDoctor who="doctor" />
      </div>
      <div className="flex justify-between">
        <Button
          className="self-end border-2 border-black w-min flex text-white gap-2"
          type="submit"
          onClick={prev}
        >
          <ArrowLeft /> Back
        </Button>
        <Button
          className="self-end border-2 border-black w-min flex text-white gap-2"
          type="submit"
          onClick={next}
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

function UserOrDoctor({ who }: { who: 'user' | 'doctor' }) {
  return (
    <div className="border-2 border-black flex items-center justify-center space-y-2 flex-col rounded-xl w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
      {who === 'user' ? (
        <User size={35} className="font-thin" />
      ) : (
        <Stethoscope size={35} />
      )}
      <p>{capitalize(who)}</p>
    </div>
  )
}

const HowToBeContacted: StepComponent = ({ next, prev }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues.signIn
  })

  return (
    <div className="md:max-w-md">
      <h2 className="text-xl font-bold">How would you like to be contacted?</h2>
      <div className="flex flex-col gap-4 py-4">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <div className="flex justify-between mt-2">
        <Button
          className="self-end border-2 border-black w-min flex text-white gap-2"
          type="submit"
          onClick={prev}
        >
          <ArrowLeft /> Back
        </Button>
        <Button
          className="self-end border-2 border-black w-min flex text-white gap-2"
          type="submit"
          onClick={next}
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

const SecureYourAccount: StepComponent = ({ next, prev }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues.signIn
  })

  return (
    <div className="md:max-w-md">
      <h2 className="text-xl font-bold">Secure your account</h2>
      <div className="flex flex-col gap-4 py-4">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <div className="flex justify-between mt-2">
        <Button
          className="self-end border-2 border-black w-min flex text-white gap-2"
          type="submit"
          onClick={prev}
        >
          <ArrowLeft /> Back
        </Button>
        <Button
          className="self-end border-2 border-black w-min flex text-white gap-2"
          type="submit"
          onClick={next}
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

const JustOneMoreStep: StepComponent = ({ next, prev }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues.signIn
  })

  return (
    <div className="md:max-w-md">
      <h2 className="text-xl font-bold">Just one more step</h2>
      <div className="flex flex-col gap-4 py-4">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <div className="flex justify-between mt-2">
        <Button
          className="self-end border-2 border-black w-min flex text-white gap-2"
          type="submit"
          onClick={prev}
        >
          <ArrowLeft /> Back
        </Button>
        <Button
          className="self-end border-2 border-black w-min flex text-white gap-2"
          type="submit"
          onClick={next}
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

const SignupLetGetStartedForm: StepComponent = ({ next }) => {
  const toastId = useRef<string | number>()

  const router = useRouter()
  const goBack = () => router.history.back()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues.signIn
  })

  const { mutate } = $api.useMutation('post', '/api/auth/sign-in', {
    onSuccess: (data) => {
      toast.dismiss(toastId.current)
      toast.success('Sign in successful')
    },
    onError: (error) => {
      toast.dismiss(toastId.current)
      toast.error(error.message)
    }
  })

  const onSubmit = (data: FormSchema) => {
    toastId.current = toast.loading('Signing in...')
    mutate({ body: data })
  }

  return (
    <Form {...form}>
      <form onSubmit={() => next()} className="max-w-md  flex flex-col gap-4">
        <header className="text-xl font-semibold text-left">
          Let's get you all setup
        </header>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="self-end border-2 border-black w-min flex mt-2 text-white gap-2"
          type="submit"
        >
          Next <ArrowRight />
        </Button>
      </form>
    </Form>
  )
}
