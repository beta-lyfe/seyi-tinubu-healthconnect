import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
import {
  MultiStepForm,
  type StepComponent
} from '@beta-lyfe/ui/components/multi-step-form'
import { createFileRoute, useRouter, Link, useNavigate } from '@tanstack/react-router'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  inputOtp
} from '@beta-lyfe/ui/components/shad/ui/input-otp'
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
import { AuthLayout } from '../-components/layout'
import { $api } from '@beta-lyfe/webapp/lib/backend'
import { toast, Toaster } from 'sonner'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import { defaultValues } from '../-components/credentials'
import {
  ArrowLeft,
  ArrowLeftFromLine,
  ArrowLeftIcon,
  ArrowRight,
  Loader2Icon,
  Lock,
  Stethoscope,
  User
} from 'lucide-react'
import { capitalize, replace } from 'lodash'
import { cn } from '@beta-lyfe/ui/components/shad/lib/utils'
import {
  SignUpFormProvider,
  type Step5FullSchema,
  useSignUpForm
} from './-components/context'
import {
  step1Schema,
  type Step1Schema,
  type Step2Schema,
  step3Schema,
  type Step3Schema,
  step4Schema,
  type Step4Schema,
  step5Schema,
  type Step5Schema
} from './-components/schema'
import { assert } from 'assertate'

export const Route = createFileRoute('/_app/auth/sign-up/')({
  component: SignInPage
})

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
  const [indexedMultiform, setIndexedMultiform] = useState(0)
  const steps = [Step1, Step2, Step3, Step4, Step5]

  return (
    <AuthLayout.Container>
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-end">
          <Link to="/auth/sign-in">
            <Button
              className="self-end border-2 relative border-black w-min flex text-white gap-2"
              type="button"
            >
              Sign in
            </Button>
          </Link>
        </div>
        <div className="w-full overflow-clip">
          {indexedMultiform < steps.length && (
            <MultiStepFormBar
              bars={steps.length}
              index={indexedMultiform}
            />
          )}
          <SignUpFormProvider>
            <MultiStepForm
              steps={steps}
              index={indexedMultiform}
              setIndex={setIndexedMultiform}
            />
          </SignUpFormProvider>
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
      {[...Array(bars)].map((bar, _index) => (
        <Bar coloured={_index <= index} key={bar} />
      ))}
    </div>
  )
}

{const Step6: StepComponent = () => {
  const signupForm = useSignUpForm()

  assert(signupForm.step === 'step5')

  return (
    <div className="w-full flex items-center justify-center flex-col space-y-6">
      <h2 className="font-bold text-xl md:text-2xl">Verify your account</h2>
      <p className="text-center">
        Enter the 6 digit OTP code sent to {signupForm.data.email}
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
}}

export const InputOTPPattern = ({otp,setOtp}:{otp:string,setOtp:Dispatch<SetStateAction<number>>}) => {
  const inputOtpSlot = 'border-black border-[2px] rounded-lg ring-0'
  return (
    <InputOTP maxLength={6} pattern={inputOtp.REGEXP_ONLY_DIGITS} defaultValue={otp} onChange={(value)=>{
      setOtp(value)
    }}>
      <InputOTPGroup className="select-none flex items-center justify-center gap-2 md:gap-5">
        <InputOTPSlot index={0} className={inputOtpSlot} />
        <InputOTPSlot index={1} className={inputOtpSlot} />
        <InputOTPSlot index={2} className={inputOtpSlot} />
        <InputOTPSlot index={3} className={inputOtpSlot} />
        {/* <InputOTPSlot index={4} className={inputOtpSlot} />
        <InputOTPSlot index={5} className={inputOtpSlot} /> */}
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

const Step2: StepComponent = ({ next, prev }) => {
  const signupForm = useSignUpForm()

  const [currentwho, setCurrentWho] = useState<Step2Schema['who']>(
   signupForm.data?.who as any
  )

  const submit = (data: Step2Schema) => {
    if(!data.who){
      return
    }
    if (signupForm.step !== 'step0') {
      signupForm.update({
        step: 'step2',
        data: { ...signupForm.data, ...data }
      })
      next()
    }
  }

  return (
    <div className="md:max-w-md">
      <h2 className="text-xl font-bold">What would you like to be?</h2>
      <div className="flex space-x-5 items-center justify-center p-9">
        <UserOrDoctor
          who="patient"
          select={() => setCurrentWho('patient')}
          selected={currentwho === 'patient'}
        />
        <UserOrDoctor
          who="doctor"
          select={() => setCurrentWho('doctor')}
          selected={currentwho === 'doctor'}
        />
      </div>
      <p className={cn('text-red-600 px-4 py-2 text-center',currentwho && "hidden")}>Please select who you are</p>
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
          onClick={() => submit({ who: currentwho })}
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
function UserOrDoctor({
  who,
  select,
  selected
}: { who: 'patient' | 'doctor'; select: () => void; selected?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'border-2 group hover:bg-primary border-black flex items-center justify-center space-y-2 flex-col rounded-xl w-[100px] h-[100px] md:w-[120px] md:h-[120px]',
        selected && 'bg-primary'
      )}
      onClick={select}
    >
      {who === 'patient' ? (
        <User
          size={35}
          className={cn(
            'group-hover:text-white font-thin',
            selected && 'text-white'
          )}
        />
      ) : (
        <Stethoscope
          size={35}
          className={cn(
            'group-hover:text-white font-thin',
            selected && 'text-white'
          )}
        />
      )}
      <span className={cn('group-hover:text-white', selected && 'text-white')}>
        {capitalize(who)}
      </span>
    </button>
  )
}

const Step3: StepComponent = ({ next, prev }) => {
  const signupForm = useSignUpForm()

  const submit = (data: Step3Schema) => {
    signupForm.update({ step: 'step3', data: { ...signupForm.data, ...data } })
    next()
  }
  const form = useForm<Step3Schema>({
    resolver: zodResolver(step3Schema),
    defaultValues: signupForm.data as any
  })

  return (
    <div className="md:max-w-md">
      <h2 className="text-xl font-bold">How would you like to be contacted?</h2>
      <div className="flex flex-col py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      type="phone"
                      {...field}
                      placeholder="+2343256789532"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

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
              >
                Next <ArrowRight />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

const Step5: StepComponent = ({ next, prev }) => {
  const navigate=useNavigate();
  const signupForm = useSignUpForm()
  const toastId = useRef<string | number>()

  const { mutate, status } = $api.useMutation('post', '/api/auth/sign-up', {
    onSuccess: (data) => {
      toast.dismiss(toastId.current)
      toast.success('Sign up successful')
      navigate({
        to:'/auth/verify',
        search:{
          email:signupForm.data.email
        }
      })
      next()
    },
    onError: (error) => {
      toast.dismiss(toastId.current)
      toast.error(error.message)
    }
  })

  const onSubmit = (data: Step5Schema) => {
    const newStepData: Step5FullSchema = {
      step: 'step5',
      data: { ...signupForm.data, ...data }
    }

    signupForm.update(newStepData)

    toastId.current = toast.loading("Signing up")

    mutate({
      body: {
        email: newStepData.data.email,
        first_name: newStepData.data.firstname,
        last_name: newStepData.data.lastname,
        is_doctor: newStepData.data.who === 'doctor',
        phone_number: newStepData.data.phone,
        date_of_birth: newStepData.data.dob,
        password: newStepData.data.password,
        password2: newStepData.data.confirmpassword
      }
    })
  }

  const form = useForm<Step5Schema>({
    resolver: zodResolver(step5Schema),
    defaultValues: signupForm.data as any
  })

  const isSubmitting = form.formState.isSubmitting || status === "pending"

  return (
    <div className="md:max-w-md">
      <h2 className="text-xl font-bold">Secure your account</h2>
      <div className="flex flex-col gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Create a password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <div className="flex justify-between mt-2">
              <Button
                className="self-end border-2 border-black w-min flex text-white gap-2"
                type="submit"
                onClick={prev}
                disabled={isSubmitting}
              >
                <ArrowLeft /> Back
              </Button>
              <Button
                className="self-end border-2 border-black w-min flex text-white gap-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                <Loader2Icon className="size-5 animate-spin" /> : "Sign up"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

const Step4: StepComponent = ({ next, prev }) => {
  const signupForm = useSignUpForm()

  const submit = (data: Step4Schema) => {
    signupForm.update({ step: 'step4', data: { ...signupForm.data, ...data } })
    next()
  }
  const form = useForm<Step4Schema>({
    resolver: zodResolver(step4Schema),
    defaultValues: signupForm.data as any
  })

  return (
    <div className="md:max-w-md">
      <h2 className="text-xl font-bold">Just one more step</h2>
      <div className="flex flex-col gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} placeholder="2000-12-31" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </form>
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
          onClick={form.handleSubmit(submit)}
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

const Step1: StepComponent = ({ next }) => {
  const toastId = useRef<string | number>()
  const signupForm = useSignUpForm()

  const form = useForm<Step1Schema>({
    resolver: zodResolver(step1Schema),
    defaultValues: signupForm.step !== 'step0' ? signupForm.data : {}
  })

  const onSubmit = (data: Step1Schema) => {
    signupForm.update({ step: 'step1', data: { ...signupForm.data, ...data } })
    next()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md  flex flex-col gap-4"
      >
        <header className="text-xl font-semibold text-left">
          Let's get you all setup
        </header>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="John" />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="Doe" />
                </FormControl>
                <FormMessage className="text-red-600" />
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
