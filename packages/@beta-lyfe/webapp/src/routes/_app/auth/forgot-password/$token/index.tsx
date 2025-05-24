
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/auth/forgot-password/$token/')({
  component: ForgotPasswordPage
})

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Stethoscope, ArrowLeft, Loader2, CheckCircle, EyeOff, Eye } from 'lucide-react'
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@beta-lyfe/ui/components/shad/ui/card'
import { useRouter } from '@tanstack/react-router'
import { $api } from '../../../../../lib/backend'
import { toast } from 'sonner'

const formSchema = z.object({
  password:z.string().min(8),
  confirmPassword:z.string().min(8)
})

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword,setShowPassword]=useState(false)
  const router=useRouter()
  const {token}=useParams({strict:false})
  const {mutate}=$api.useMutation('post','/api/auth/reset-password/{token}',{
    onSuccess:res=>{
      toast.success(res.code)
      setIsSubmitted(true)
    },onError:err=>{
      setIsSubmitted(false)
      toast.error(err.code)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword:''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      mutate({
        body:{
          password:values.password
        },
        params:{
          path:{
            token:token!
          }
        }
      })
    } catch (error) {
      console.error('Error:', error)
      form.setError('root', {
        message: 'Something went wrong. Please try again.'
      })
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
              onClick={()=>router.navigate({to:'/testcall'})}
                src="/images/betalyfe-icon.svg"
                className="w-14 h-14 rounded-full"
              />
            </div>
            <h1 className="text-xl font-bold ml-2">Beta-Lyfe</h1>
          </div>
          <Link to="/auth/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
        </div>

        <Card className="border-none">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 p-3 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>New Password set successfully</CardTitle>
                  <CardDescription>
                    You have successfully reset your password 
                  </CardDescription>
                </CardHeader>
                {/* <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary hover:underline"
                    >
                      try again
                    </button>
                  </p>
                </CardContent> */}
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to="/auth/sign-in">Return to Sign In</Link>
                  </Button>
                </CardFooter>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CardHeader>
                  <CardTitle className='text-md py-4'>Forgot your password?</CardTitle>
                  <CardDescription>
                    Enter your new and secure password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New password</FormLabel>
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

                  <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm new Password</FormLabel>
                            <FormControl>
                             <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...field}
                          />
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
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                            Sending
                          </>
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  )
}
