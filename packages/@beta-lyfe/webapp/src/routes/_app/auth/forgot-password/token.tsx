import { createFileRoute, useRouter } from '@tanstack/react-router'

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Stethoscope, ArrowLeft, Loader2, CheckCircle, Eye, EyeOff, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@beta-lyfe/ui/components/button"
import { Input } from "@beta-lyfe/ui/components/shad/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@beta-lyfe/ui/components/shad/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@beta-lyfe/ui/components/shad/ui/card"
import { Link } from '@tanstack/react-router'


export const Route = createFileRoute('/_app/auth/forgot-password/token')({
  component: ResetPasswordPage,
})

const formSchema = z
  .object({
    token: z.string().min(20, "Token must be at least 20 characters").max(100, "Invalid token format"),
  })

export default function ResetPasswordPage() {
  const router=useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    }
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    router.navigate({
      to:'/auth/forgot-password/$token',
      params:{
        token:form.getValues().token
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-50 to-background">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold ml-2">Beta-Lyfe</h1>
          </div>
          <Link to="/auth/sign-in">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sign In
            </Button>
          </Link>
        </div>

        <Card className="border-none shadow-lg">
          <AnimatePresence mode="wait">
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CardHeader>
                  <CardTitle>Reset Your Password</CardTitle>
                  <CardDescription>Enter your reset token and create a new password for your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reset Token</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Paste your reset token here"
                                {...field}
                                className="font-mono text-sm"
                              />
                              
                            </FormControl>
                           
                            <FormMessage />
                            <p className="text-xs text-muted-foreground">
                              Enter the token from your password reset email
                            </p>
                            
                          </FormItem>
                        
                        )}
                        
                      />
                      <div className='flex justify-end'>
                         <Button type='submit'>
                        <ArrowRight className='text-white'/>
                      </Button>
                      </div>
                      
                      </form>
                      </Form>
                      </CardContent>
                      </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </div>
  )
}

