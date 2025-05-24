import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Stethoscope, Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@beta-lyfe/ui/components/button'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@beta-lyfe/ui/components/shad/ui/form'
import {
  Card,
  CardContent,
  CardFooter
} from '@beta-lyfe/ui/components/shad/ui/card'
import { Checkbox } from '@beta-lyfe/ui/components/shad/ui/checkbox'
import { Separator } from '@beta-lyfe/ui/components/shad/ui/separator'
import { $api, client } from '../../../lib/backend'
import { toast } from 'sonner'
import { useAuth, type Schema } from '../../../hooks/auth'
import { AdditionalInfoModal } from '../_dashboard/dashboard/-components/profilemodal'

export const Route = createFileRoute('/_app/auth/sign-in')({
  component: SignInPage
})

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
})

export default function SignInPage() {
  const router = useRouter()
  const auth = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showProfileModal,setShowProfileModal]=useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  
  const { mutate } = $api.useMutation('post', '/api/auth/sign-in', {
    onSuccess: async (res) => {
      // router.navigate({
      //   to: data.user.is_doctor ? '/doctor/dashboard' : '/dashboard'
      // })
      // TODO: probably fetch user profile here and store in auth along with access and refresh tokens

      
      const userProfile = await client.GET("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`
        }
      })

      if (userProfile.error) {
        if(userProfile.error.code==='USER_NOT_VERIFIED'){
          router.navigate({
            to:'/auth/verify', search:{
              email: form.getValues('email')
           }
          })
        }
        toast.error("Failed to fetch profile!")
        return
      }

      let doctorProfile: Schema.DoctorProfile| undefined=undefined
      let patientProfile:Schema.PatientProfile | undefined = undefined

      if (userProfile.data.data.role === 'doctor') {
        const result = await client.GET('/api/doctors/profile', {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`
          }
        })

   

        if (result.data){
          doctorProfile=result.data.data
        }
      }

      if (userProfile.data.data.role === 'patient') {
        const result = await client.GET('/api/patients/profile', {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`
          }
        })


        if(result.error?.code==='PATIENT_PROFILE_NOT_FOUND_ERROR' || result.error?.code==='UNAUTHORIZED_ERROR' || 
          result.error?.code==='UNEXPECTED_ERROR'
        ){
          router.navigate({
            to:'/auth/set-profile',
            search:{
              token:res.data.access_token
            }
          })
          return
        }

        if (result.data){
          patientProfile=result.data.data
        }
      }

      auth.update({
        status:'authenticated',
        data: {
          token: {
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token
          },
          user: {
            data: userProfile.data.data,
            profiles: {doctor: doctorProfile, patient: patientProfile}
          }
        }

      })

      router.navigate({
        to: patientProfile ? '/dashboard' : '/doctor/dashboard'
      })
    },
    onError: (err) => {
      toast.error(err.code)

      // if (err.code === 'Email is not verified') {
      //   mutateVerify.mutate({
      //     body: {
      //       email: form.getValues('email')
      //     }
      //   })
      // }

      setIsSubmitting(false)
    }
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(() => {
        mutate({
          body: {
            email: form.getValues('email'),
            password: form.getValues('password')
          }
        })
      })

      // Navigate to dashboard
      router.navigate({ to: '/dashboard' })
    } catch (error) {
      console.error('Login error:', error)
      form.setError('root', {
        message: 'Invalid email or password. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-50 to-background">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <img
              src="/images/betalyfe-icon.svg"
              className="w-14 h-14 rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold">Welcome back to Beta-Lyfe</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        <Card className="border-none">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/auth/forgot-password"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                      in
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center pt-0">
            <p className="text-center text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/auth/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <AdditionalInfoModal open={showProfileModal} onOpenChange={setShowProfileModal}/>
    </div>
  )
}
