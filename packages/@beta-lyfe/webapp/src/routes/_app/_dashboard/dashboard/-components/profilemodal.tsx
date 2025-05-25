import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar, CheckCircle2, Info, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@beta-lyfe/ui/components/button"
import { Input } from "@beta-lyfe/ui/components/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@beta-lyfe/ui/components/shad/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@beta-lyfe/ui/components/shad/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@beta-lyfe/ui/components/shad/ui/select"
import { RadioGroup, RadioGroupItem } from "@beta-lyfe/ui/components/shad/ui/radio-group"
import { Label } from "@beta-lyfe/ui/components/shad/ui/label"
import { useRouter } from "@tanstack/react-router"

// Form schema
const formSchema = z.object({
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender option",
  }),
  height: z.string().optional(),
  weight: z.string().optional(),
  bloodType: z.enum(["unknown", "a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"]).optional(),
})

type FormData = z.infer<typeof formSchema>

interface AdditionalInfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdditionalInfoModal({ open, onOpenChange }: AdditionalInfoModalProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: "",
      gender: undefined,
      height: "",
      weight: "",
      bloodType: "unknown",
    },
  })

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // Simulate API call to save user data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Close modal and navigate to dashboard
      onOpenChange(false)

    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-dvw max-h-[90vh] bg-white overflow-auto">
        <DialogHeader>
          <DialogTitle>We need more information</DialogTitle>
          <DialogDescription>
            Please provide these additional details to help us personalize your healthcare experience
          </DialogDescription>

          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-in-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-h-[70vh] overflow-auto"
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Step 1: Basic Information */}
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="bg-primary/10 p-4 rounded-full">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormDescription>
                            We need your date of birth to provide age-appropriate care recommendations.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="modal-male" />
                                <Label htmlFor="modal-male">Male</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="modal-female" />
                                <Label htmlFor="modal-female">Female</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="modal-other" />
                                <Label htmlFor="modal-other">Other</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="prefer-not-to-say" id="modal-prefer-not-to-say" />
                                <Label htmlFor="modal-prefer-not-to-say">Prefer not to say</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Step 2: Additional Health Information (Optional) */}
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="bg-primary/10 p-4 rounded-full">
                        <Info className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                      <p className="text-sm text-blue-700">
                        The following information is optional but helps us provide better health recommendations.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="175" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="70" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Type (if known)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your blood type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="unknown">Unknown</SelectItem>
                              <SelectItem value="a+">A+</SelectItem>
                              <SelectItem value="a-">A-</SelectItem>
                              <SelectItem value="b+">B+</SelectItem>
                              <SelectItem value="b-">B-</SelectItem>
                              <SelectItem value="ab+">AB+</SelectItem>
                              <SelectItem value="ab-">AB-</SelectItem>
                              <SelectItem value="o+">O+</SelectItem>
                              <SelectItem value="o-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                  Back
                </Button>
              ) : (
                <div></div> // Empty div to maintain layout with justify-between
              )}

              {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                    </>
                  ) : (
                    "Complete Profile"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
          <CheckCircle2 className="h-3 w-3 text-green-500" />
          <span>Your information is secure and encrypted</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
