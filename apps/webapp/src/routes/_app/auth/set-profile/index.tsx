import { createFileRoute ,useRouter, useSearch} from '@tanstack/react-router'
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar, CheckCircle2, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@beta-lyfe/ui/components/button"
import { Input } from "@beta-lyfe/ui/components/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@beta-lyfe/ui/components/shad/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@beta-lyfe/ui/components/shad/ui/card"
import { $api } from '../../../../lib/backend'
import { toast } from 'sonner'
import { useAuth } from '../../../../hooks/auth'
import { access } from 'fs'


export const Route = createFileRoute('/_app/auth/set-profile/')({
  component: PatientDobPage,
  validateSearch:z.object({
    token:z.string()
  })
})



// Form schema - only requiring date of birth
const formSchema = z.object({
  dob: z.string().min(1, "Date of birth is required"),
})

type FormData = z.infer<typeof formSchema>

export default function PatientDobPage() {
  const access_token=Route.useSearch().token
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {mutate}=$api.useMutation('post','/api/patients',{
    onSuccess:(res)=>{
      console.log(res.code)
      toast.success(res.code)
      router.navigate({
         to:'/dashboard'
       })
    },
    onError:(error)=>{
      console.error("Error updating profile:", error.code)
    }
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call to save user DOB
      await new Promise((resolve) => setTimeout(resolve, 700))
     mutate({
      body:{
       date_of_birth:data.dob  
      },
      headers:{
        'Authorization':`Bearer ${access_token}`
      }
     })

     
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary-50 to-background">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-2 w-fit">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">When were you born?</CardTitle>
              <CardDescription className='text-sm py-1'>
                We need your date of birth to provide personalized healthcare recommendations
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="text-md p-6" />
                        </FormControl>
                        <FormDescription>
                          Your date of birth helps us provide age-appropriate care and recommendations.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
                    <p className="text-sm text-blue-700">
                      This information is required to continue using Beta-Lyfe services.
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full text-sm text-white">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Your information is secure and encrypted</span>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

