import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  User,
  Stethoscope,
  Calendar,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  EyeIcon,
  EyeOff
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@beta-lyfe/ui/components/button'
import { Input } from '@beta-lyfe/ui/components/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@beta-lyfe/ui/components/shad/ui/form'
import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
import { cn } from '@beta-lyfe/ui/components/shad/lib/utils'
import { $api } from '../../../lib/backend'
import { toast } from 'sonner'
import { Toaster } from '@beta-lyfe/ui/components/shad/ui/sonner'

export const Route = createFileRoute('/_app/auth/sign-up')({
  component: SignUpPage
})

// Form schemas for each step
const step1Schema = z.object({
  firstname: z.string().min(2, 'First name must be at least 2 characters'),
  lastname: z.string().min(2, 'Last name must be at least 2 characters')
})

const step2Schema = z.object({
  role: z.enum(['patient', 'doctor'])
})

const step3Schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number')
})

const step4Schema = z.object({
  dob: z.string().min(1, 'Please select your date of birth')
})

const step5Schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

// Combined schema for the entire form
const formSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(
    z.object({
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string().min(8, 'Please confirm your password')
    })
  )

type FormData = z.infer<typeof formSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate } = $api.useMutation('post', '/api/auth/sign-up', {
    onSuccess: () =>
      router.navigate({
        to: '/auth/verify',
        search: { email: formData.email as string }
      }),
    onError: (err) => {
      setIsSubmitting(false)
      err.code ? toast.error(
        err.code.replace("_"," ").toLowerCase()
      ) : toast.error('Network error. Please try again.')

    }
  })

  const steps = [
    { title: 'Personal Information', description: "Let's get to know you" },
    { title: 'Select Role', description: 'Are you a doctor or a patient?' },
    { title: 'Contact Information', description: 'How can we reach you?' },
    { title: 'Create Password', description: 'Secure your account' }
  ]

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (password: string) => {
    setIsSubmitting(true)

    try {
      const _formData = formData as FormData

      await new Promise((resolve) =>
        mutate({
          body: {
            email: _formData.email,
            first_name: _formData.firstname,
            last_name: _formData.lastname,
            is_doctor: _formData.role === 'doctor',
            password: password,
            phone_number: _formData.phone
          }
        })
      )
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-50 to-background">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full">
              <img
                src="/images/betalyfe-icon.svg"
                className="w-14 h-14 rounded-full"
              />
            </div>
            <h1 className="text-xl font-bold ml-2">Beta-Lyfe</h1>
          </div>
          <Link to="/auth/sign-in">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
        </div>

        <Card className="border-none">
          <CardContent className="p-6">
            {/* Progress bar and step title */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <div>
                  <h2 className="text-lg font-semibold">{steps[step].title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {steps[step].description}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  Step {step + 1} of {steps.length}
                </span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden mt-4">
                <div
                  className="bg-primary h-full transition-all duration-300 ease-in-out"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Form steps */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <Step1Form
                    data={formData}
                    updateData={updateFormData}
                    onNext={nextStep}
                  />
                )}
                {step === 1 && (
                  <Step2Form
                    data={formData}
                    updateData={updateFormData}
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                {step === 2 && (
                  <Step3Form
                    data={formData}
                    updateData={updateFormData}
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                {step === 3 && (
                  <Step5Form
                    data={formData}
                    updateData={updateFormData}
                    onPrev={prevStep}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account?{' '}
          <Link to="/auth/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

// Step 1: Name Information (First Name and Last Name)
function Step1Form({
  data,
  updateData,
  onNext
}: {
  data: Partial<FormData>
  updateData: (data: Partial<FormData>) => void
  onNext: () => void
}) {
  const form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstname: data.firstname || '',
      lastname: data.lastname || ''
    }
  })

  function onSubmit(values: z.infer<typeof step1Schema>) {
    updateData(values)
    onNext()
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" className="text-white">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

// Step 2: Role Selection (Doctor or Patient) with Icons
function Step2Form({
  data,
  updateData,
  onNext,
  onPrev
}: {
  data: Partial<FormData>
  updateData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  const [selected, setSelected] = useState<'patient' | 'doctor' | null>(
    data.role || null
  )

  function onSubmit() {
    if (selected) {
      updateData({ role: selected })
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Please select your role in the Beta-Lyfe platform
      </p>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setSelected('patient')}
          className={cn(
            'flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all',
            selected === 'patient'
              ? 'border-primary bg-primary/10'
              : 'border-muted hover:border-primary/50'
          )}
        >
          <User
            className={cn(
              'h-16 w-16 mb-4',
              selected === 'patient' ? 'text-primary' : 'text-muted-foreground'
            )}
          />
          <span
            className={cn(
              'font-medium text-lg',
              selected === 'patient' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Patient
          </span>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            I'm seeking healthcare services
          </p>
        </button>

        <button
          type="button"
          onClick={() => setSelected('doctor')}
          className={cn(
            'flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all',
            selected === 'doctor'
              ? 'border-primary bg-primary/10'
              : 'border-muted hover:border-primary/50'
          )}
        >
          <Stethoscope
            className={cn(
              'h-16 w-16 mb-4',
              selected === 'doctor' ? 'text-primary' : 'text-muted-foreground'
            )}
          />
          <span
            className={cn(
              'font-medium text-lg',
              selected === 'doctor' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Doctor
          </span>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            I'm a healthcare provider
          </p>
        </button>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          type="button"
          className="text-white"
          onClick={onSubmit}
          disabled={!selected}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Step 3: Contact Information (Email and Phone)
function Step3Form({
  data,
  updateData,
  onNext,
  onPrev
}: {
  data: Partial<FormData>
  updateData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}) {
  const form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      email: data.email || '',
      phone: data.phone || ''
    }
  })

  function onSubmit(values: z.infer<typeof step3Schema>) {
    updateData(values)
    onNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Mail className="h-4 w-4 mr-2" /> Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Phone className="h-4 w-4 mr-2" /> Phone Number
              </FormLabel>
              <FormControl>
                <Input placeholder="+234 123-4567-892" {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                We'll use this to send you appointment reminders and important
                notifications
              </p>
            </FormItem>
          )}
        />
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="text-white">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

// Step 5: Security (Password and Confirm Password)
function Step5Form({
  data,
  updateData,
  onPrev,
  onSubmit,
  isSubmitting
}: {
  data: Partial<FormData>
  updateData: (data: Partial<FormData>) => void
  onPrev: () => void
  onSubmit: (password: string) => void
  isSubmitting: boolean
}) {
  const form = useForm<z.infer<typeof step5Schema>>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      password: data.password || '',
      confirmPassword: data.confirmPassword || ''
    }
  })

  const [passwordStrengthState,setPasswordstrength] = useState({
    length: false,
    uppercase: false,
    number: false
  })

  const passwordStrongness = (password: string) => {
    const passwordStrengthStates = {
      length: false,
      uppercase: false,
      number: false
    }

    if (password.length >= 8) {
      passwordStrengthStates.length = true
    }
    if (/[A-Z]/.test(password)) {
      passwordStrengthStates.uppercase = true
    }
    if (/\d/.test(password)) {
      passwordStrengthStates.number = true
    }
    return passwordStrengthStates
  }

  function checkStrength(password:string){
    const passwordStrength=passwordStrongness(password)
    setPasswordstrength(passwordStrength)
  }

  function handleSubmit(values: z.infer<typeof step5Schema>) {
    if (!passwordStrengthState.length || !passwordStrengthState.uppercase || !passwordStrengthState.number) {
      toast.error('Password must be at least 8 characters long, contain at least one uppercase letter and one number.')
      return
    }
    updateData(values)
    onSubmit(form.getValues('password'))
  }

  const [showPassword,setShowPassword]=useState(false)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex justify-center mb-4">
          <Lock className="h-16 w-16 text-primary" />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <div onClick={()=>setShowPassword(!showPassword)}>
                    {
                    showPassword ? 
                     <EyeIcon className='absolute top-1/2 right-1 mr-2 -translate-y-1/2' size={20}/>
                    :
                     <EyeOff className='absolute top-1/2 right-1 mr-2 -translate-y-1/2' size={20}/>
                  }
                  </div>
                  
                 
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...form.register('password', {
                    pattern: {
                      value: passwordRegex,
                      message: 'Password must contain at least one uppercase letter and one number.'
                    },
                    onChange: (e) => {
                      checkStrength(e.target.value)
                      form.setValue('password', e.target.value)
                    }
                  })}
                />
                </div>
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>  
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type={showPassword ? "text":"password" } placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 space-y-2">
          <p className="text-sm font-medium">Password requirements:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className={cn("flex items-center", passwordStrengthState.length ? 'text-green-500' : 'text-red-500')} >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              At least 8 characters long
            </li>
            <li className={cn("flex items-center", passwordStrengthState.uppercase ? 'text-green-500' : 'text-red-500')}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Contains at least one uppercase letter
            </li>
            <li className={cn("flex items-center",  passwordStrengthState.number ? 'text-green-500' : 'text-red-500')}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Contains at least one number
            </li>
          </ul>
        </div>
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                Account
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
