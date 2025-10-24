import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/auth/forgot-password/')({
  component: ForgotPasswordPage
})

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Stethoscope, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
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
import { $api } from '../../../../lib/backend'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address')
})

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router=useRouter()
  const {mutate}=$api.useMutation('post','/api/auth/reset-password',{
    onSuccess:res=>{
      toast.success(res.code)
      setIsSubmitted(true)
    },onError:err=>{
      setIsSubmitted(false)
      if(err.code==='PASSWORD_RESET_MAIL_ALREADY_SENT_ERROR'){
        router.navigate({
          to:'/auth/forgot-password/token',
        })
      }
      
      toast.error(err.code)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    await new Promise((res) => setTimeout(res, 700));

    try {
       
        mutate({
        body:{
          email:values.email
        }})

      
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
            <h1 className="text-lg font-bold ml-2">ST connect</h1>
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
                  <CardTitle>Check your email</CardTitle>
                  <CardDescription>
                    We've sent a password reset link to your email address.
                    Please check your inbox.
                  </CardDescription>
                  <CardDescription className='font-bold text-black'>
                    If you have a token, you can use it to reset your password.<br ></br>
                   <Link to='/auth/forgot-password/token' className='font-bold text-primary'>To Use token click here</Link> 
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary hover:underline"
                    >
                      try again
                    </button>
                  </p>
                </CardContent>
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
                    Enter your email address and we'll send you a link to reset
                    your password.
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="name@example.com"
                                {...field}
                              />
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
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                            Sending
                          </>
                        ) : (
                          'Send Reset Link'
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
