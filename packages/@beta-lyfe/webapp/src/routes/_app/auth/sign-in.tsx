import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
import { createFileRoute, useRouter, Link, useNavigate } from '@tanstack/react-router'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'
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
import { ArrowLeftIcon, Loader, Loader2 } from 'lucide-react'
import { useSignUpForm } from './sign-up/-components/context'
import { useAuth } from '../../../hooks/auth'

export const Route = createFileRoute('/_app/auth/sign-in')({
  component: SignInPage
})

const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type FormSchema = z.infer<typeof formSchema>

function SignInPage() {
  const toastId = useRef<string | number>()
  const navigate=useNavigate()
  const auth=useAuth()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues.signIn
  })

  const resender=$api.useMutation('post','/api/auth/resend-verify-email',{
    onError:(error)=>{
      toast.dismiss(toastId.current)
      toast.error(error.message)
    },
    onSuccess:(_data)=>{
      toast.message("otp sent to email")
      return navigate({
        to:'/auth/verify',
        search:{
          email: form.getValues('email')
        }
      })
    }
  })


  const { mutate } = $api.useMutation('post', '/api/auth/sign-in', {
    onError: (error) => {
      if(error.message.startsWith("Email is not verified ")){
        toast.dismiss(toastId.current)
        toast.error('Email is not verified')
        console.log(form.getValues('email'))
        resender.mutate({body:{email:form.getValues('email')}})
      }
      toast.dismiss(toastId.current)
      toast.error(error.message)
    }
  })

  const onSubmit = (data: FormSchema) => {
    toastId.current = toast.loading('Signing in...')
    mutate({ body: data }, {
      onSuccess: (_data) => {
        auth.update(
          {status:"authenticated",
            data:{
              token:{access_token:_data.access,refresh_token:_data.refresh},
              user:_data.user.is_doctor?{type:'doctor',data:_data.user}:{type:'patient',data:_data.user}
            }
          }
        )
        toast.dismiss(toastId.current)
        toast.success('Sign in successful')
        navigate({
          to:'/dashboard'
        })
      },  
    })
  }

  const isSubmitting = form.formState.isSubmitting || status === "pending"

  const router = useRouter()
  const goBack = () => router.history.back()

  return (
    <AuthLayout.Container>
      <div className="h-full flex flex-col justify-between items-center p-6 lg:items-start lg:p-12">
        <div className="max-w-md w-full">
          <button type="button" onClick={goBack}>
            <ArrowLeftIcon className="size-6" />
          </button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md flex flex-col gap-4"
          >
            <header className="text-xl font-semibold text-center">
              Sign in
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
              Don't have an account?{' '}
              <Link href="/auth/sign-up" className="text-primary">
                Sign up
              </Link>
            </div>
            <Button type="submit" className='text-white' disabled={isSubmitting}>
              {
                isSubmitting? <Loader2 className="animate-spin" /> : 'Submit'
              }
              </Button>
          </form>
        </Form>
        <div />
      </div>
    </AuthLayout.Container>
  )
}
