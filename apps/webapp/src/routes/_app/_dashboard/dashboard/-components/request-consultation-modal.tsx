"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import {
  CalendarIcon,
  Clock,
  Video,
  MessageSquare,
  User,
  CreditCard,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@beta-lyfe/ui/components/shad/ui/button"
import { Calendar } from "@beta-lyfe/ui/components/shad/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@beta-lyfe/ui/components/shad/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@beta-lyfe/ui/components/shad/ui/form"
import { Input } from "@beta-lyfe/ui/components/shad/ui/input"
import { Label } from "@beta-lyfe/ui/components/shad/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@beta-lyfe/ui/components/shad/ui/popover"
import { RadioGroup, RadioGroupItem } from "@beta-lyfe/ui/components/shad/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@beta-lyfe/ui/components/shad/ui/select"
import { Textarea } from "@beta-lyfe/ui/components/shad/ui/textarea"
import { cn } from "@beta-lyfe/ui/components/shad/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@beta-lyfe/ui/components/shad/ui/avatar"
import { Card, CardContent } from "@beta-lyfe/ui/components/shad/ui/card"
import { Badge } from "@beta-lyfe/ui/components/shad/ui/badge"
import { toast } from "sonner"
import { $api } from "../../../../../lib/backend"
import { useAuth } from "../../../../../hooks/auth"

// Mock data for available time slots
const availableSlots = {
  "2025-04-05": ["09:00", "10:00", "14:00", "15:00"],
  "2025-04-06": ["11:00", "13:00", "16:00"],
  "2025-04-07": ["09:30", "10:30", "14:30"],
  "2025-04-08": ["08:00", "12:00", "17:00"],
  "2025-04-09": ["10:00", "13:00", "15:30"],
}

// Form schema
const formSchema = z.object({
  consultationType: z.enum(["video", "chat", "inPerson"], {
    required_error: "Please select a consultation type",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot",
  }),
  symptoms: z.string().min(10, "Please describe your symptoms in at least 10 characters").max(500),
  isUrgent: z.boolean().default(false),
  paymentMethod: z.enum(["wallet", "card", "insurance"], {
    required_error: "Please select a payment method",
  }),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface ConsultationRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  doctorId: string
  doctorData: {
    id: string
    name: string
    specialty: string
    image?: string
    consultationFees: {
      video: number
      chat: number
      inPerson: number
    }
  }
}

export function ConsultationRequestModal({ open, onOpenChange, doctorId, doctorData }: ConsultationRequestModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const totalSteps = 3
  const auth=useAuth(true)
  const token=auth.data.data.token.access_token

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consultationType: undefined,
      date: undefined,
      timeSlot: "",
      symptoms: "",
      isUrgent: false,
      paymentMethod: undefined,
      insuranceProvider: "",
      insuranceNumber: "",
    },
  })
  

  const {mutate} = $api.useMutation('post','/api/consultation/request',{
    onSuccess:response=>{
      if(response.code==='CONSULTATION_REQUEST_CREATED_SUCCESSFULLY'){
        setIsSuccess(true)
      }

      onOpenChange(false)
      toast.success("Consultation request successfully created")
    },
    onError:err=>{
    
      onOpenChange(false)
      toast.error(err.code)
    }
  })

  const consultationType = form.watch("consultationType")
  const selectedDate = form.watch("date")
  const paymentMethod = form.watch("paymentMethod")

  const getAvailableTimeSlots = (date: Date | undefined) => {
    if (!date) return []
    const dateString = format(date, "yyyy-MM-dd")
    return availableSlots[dateString as keyof typeof availableSlots] || []
  }

  const nextStep = () => {
    if (step === 1) {
      form.trigger(["consultationType", "date", "timeSlot", "symptoms"])
      const isValid =
        form.getFieldState("consultationType").invalid === false &&
        form.getFieldState("date").invalid === false &&
        form.getFieldState("timeSlot").invalid === false &&
        form.getFieldState("symptoms").invalid === false

      if (isValid) {
        setStep(2)
      }
    } else if (step === 2) {
      form.trigger(["paymentMethod"])
      const isValid = form.getFieldState("paymentMethod").invalid === false

      if (isValid) {
        if (paymentMethod === "insurance") {
          form.trigger(["insuranceProvider", "insuranceNumber"])
          const isInsuranceValid =
            form.getFieldState("insuranceProvider").invalid === false &&
            form.getFieldState("insuranceNumber").invalid === false

          if (isInsuranceValid) {
            setStep(3)
          }
        } else {
          setStep(3)
        }
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    console.log("hello")
    try {
      // Combine date and time slot to create start_time and end_time
      const dateStr = format(data.date, "yyyy-MM-dd")
      const [hours, minutes] = data.timeSlot.split(":").map(Number)
      console.log(dateStr)

      // Create start time
      const startTime = new Date(dateStr)

      startTime.setHours(hours)
      startTime.setMinutes(minutes)

      // Create end time (assuming 1 hour consultation)
      const endTime = new Date(startTime)
      endTime.setHours(endTime.getHours() + 1)
      
      console.log(startTime,endTime)

      // Format the API request payload
      const requestPayload = {
        doctor_id: doctorId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        message: data.symptoms,
        // Additional fields that might be useful
        consultation_type: data.consultationType,
        is_urgent: data.isUrgent,
        payment_method: data.paymentMethod,
        insurance_details:
          data.paymentMethod === "insurance"
            ? {
                provider: data.insuranceProvider,
                policy_number: data.insuranceNumber,
              }
            : undefined,
      }

      console.log("Sending consultation request:", requestPayload)

     mutate({
      body:{
        doctor_id:requestPayload.doctor_id,
        end_time:requestPayload.end_time,
        start_time:requestPayload.start_time,
        message:requestPayload.message
      },
      headers:{
        Authorization:`Bearer ${token}`
      }
     } as any)

     form.reset() 
     setStep(1)
     setIsSuccess(false)
     onOpenChange(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit consultation request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getConsultationFee = () => {
    if (!consultationType) return 0
    return doctorData.consultationFees[consultationType as keyof typeof doctorData.consultationFees]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  const getConsultationTypeIcon = () => {
    switch (consultationType) {
      case "video":
        return <Video className="h-4 w-4" />
      case "inPerson":
        return <User className="h-4 w-4" />
      default:
        return null
    }
  }

  const getConsultationTypeName = () => {
    switch (consultationType) {
      case "video":
        return "Video Consultation"
      case "inPerson":
        return "In-Person Visit"
      default:
        return "Consultation"
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isSubmitting) {
          onOpenChange(newOpen)
          if (!newOpen) {
            // Reset form when closing the modal
            setTimeout(() => {
              form.reset()
              setStep(1)
              setIsSuccess(false)
            }, 300)
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {!isSuccess ? (
          <>
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle>Book Consultation</DialogTitle>
              <DialogDescription>Schedule a consultation with {doctorData.name}</DialogDescription>
            </DialogHeader>

            {/* Progress bar */}
            <div className="px-6">
              <div className="flex justify-between text-xs mb-1">
                <span>Consultation Details</span>
                <span>Payment</span>
                <span>Confirmation</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pt-4 space-y-4"
                    >
                      {/* Doctor info card */}
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={doctorData.image || "/placeholder.svg"} alt={doctorData.name} />
                          <AvatarFallback>
                            {doctorData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{doctorData.name}</h3>
                          <p className="text-sm text-muted-foreground">{doctorData.specialty}</p>
                        </div>
                      </div>

                      {/* Consultation type */}
                      <FormField
                        control={form.control}
                        name="consultationType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Consultation Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 gap-4"
                              >
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="video" id="video" className="peer sr-only" />
                                  </FormControl>
                                  <Label
                                    htmlFor="video"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <Video className="mb-2 h-6 w-6" />
                                    Video
                                    <span className="mt-1 text-xs">
                                      {formatCurrency(doctorData.consultationFees.video)}
                                    </span>
                                  </Label>
                                </FormItem>
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="chat" id="chat" className="peer sr-only" />
                                  </FormControl>
                                  <Label
                                    htmlFor="chat"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <MessageSquare className="mb-2 h-6 w-6" />
                                    Chat
                                    <span className="mt-1 text-xs">
                                      {formatCurrency(doctorData.consultationFees.chat)}
                                    </span>
                                  </Label>
                                </FormItem>
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="inPerson" id="inPerson" className="peer sr-only" />
                                  </FormControl>
                                  <Label
                                    htmlFor="inPerson"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <User className="mb-2 h-6 w-6" />
                                    In-Person
                                    <span className="mt-1 text-xs">
                                      {formatCurrency(doctorData.consultationFees.inPerson)}
                                    </span>
                                  </Label>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Date selection */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  // disabled={(date) => {
                                  //   // Disable dates in the past and dates with no available slots
                                  //   const dateString = format(date, "yyyy-MM-dd")
                                  //   return (
                                  //     date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                  //     !availableSlots[dateString as keyof typeof availableSlots]
                                  //   )
                                  // }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>Select from available dates</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Time slot selection */}
                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Slot</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                  {["12:00","10:00","1:00"].map(slot=>
                                   <SelectItem key={slot} value={slot}>
                                   <div className="flex items-center">
                                     <Clock className="mr-2 h-4 w-4" />
                                     {slot}
                                   </div>
                                 </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Symptoms */}
                      <FormField
                        control={form.control}
                        name="symptoms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Consultation</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe your symptoms or reason for consultation"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This information helps the doctor prepare for your consultation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Is urgent checkbox */}
                      <FormField
                        control={form.control}
                        name="isUrgent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hidden">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hidden"
                              />
                            </FormControl>
                            
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pt-4 space-y-4"
                    >
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <h3 className="font-medium mb-2">Consultation Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="font-medium flex items-center">
                              {getConsultationTypeIcon()}
                              <span className="ml-1">{getConsultationTypeName()}</span>
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">
                              {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time:</span>
                            <span className="font-medium">{form.getValues("timeSlot")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Fee:</span>
                            <span className="font-medium">{formatCurrency(getConsultationFee())}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment method */}
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-3"
                              >
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                                  </FormControl>
                                  <Label
                                    htmlFor="wallet"
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="bg-primary/10 p-2 rounded-full">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                      </div>
                                      <div>
                                        <p className="font-medium">Beta-Lyfe Wallet</p>
                                        <p className="text-xs text-muted-foreground">Pay from your wallet balance</p>
                                      </div>
                                    </div>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                      ₦12,500 available
                                    </span>
                                  </Label>
                                </FormItem>
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                  </FormControl>
                                  <Label
                                    htmlFor="card"
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="bg-primary/10 p-2 rounded-full">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                      </div>
                                      <div>
                                        <p className="font-medium">Credit/Debit Card</p>
                                        <p className="text-xs text-muted-foreground">Pay with your card</p>
                                      </div>
                                    </div>
                                  </Label>
                                </FormItem>
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem value="insurance" id="insurance" className="peer sr-only" />
                                  </FormControl>
                                  <Label
                                    htmlFor="insurance"
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="bg-primary/10 p-2 rounded-full">
                                        <Stethoscope className="h-5 w-5 text-primary" />
                                      </div>
                                      <div>
                                        <p className="font-medium">Health Insurance</p>
                                        <p className="text-xs text-muted-foreground">Pay with your insurance plan</p>
                                      </div>
                                    </div>
                                  </Label>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Insurance details (conditional) */}
                      {paymentMethod === "insurance" && (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="insuranceProvider"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Insurance Provider</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your insurance provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="nhis">NHIS</SelectItem>
                                      <SelectItem value="hygeia">Hygeia HMO</SelectItem>
                                      <SelectItem value="avon">Avon HMO</SelectItem>
                                      <SelectItem value="liberty">Liberty Health</SelectItem>
                                      <SelectItem value="axa">AXA Mansard</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="insuranceNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Insurance ID/Policy Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your insurance ID" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pt-4 space-y-4"
                    >
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                          <Check className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Confirm Your Booking</h3>
                        <p className="text-sm text-muted-foreground">
                          Please review your consultation details before confirming
                        </p>
                      </div>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4 mb-4 pb-4 border-b">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={doctorData.image || "/placeholder.svg"} alt={doctorData.name} />
                              <AvatarFallback>
                                {doctorData.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{doctorData.name}</h3>
                              <p className="text-sm text-muted-foreground">{doctorData.specialty}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Consultation Type:</span>
                              <span className="font-medium flex items-center">
                                {getConsultationTypeIcon()}
                                <span className="ml-1">{getConsultationTypeName()}</span>
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date & Time:</span>
                              <span className="font-medium">
                                {selectedDate ? format(selectedDate, "PPP") : "Not selected"} at{" "}
                                {form.getValues("timeSlot")}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Payment Method:</span>
                              <span className="font-medium capitalize">
                                {paymentMethod === "wallet"
                                  ? "Beta-Lyfe Wallet"
                                  : paymentMethod === "card"
                                    ? "Credit/Debit Card"
                                    : "Insurance - " + form.getValues("insuranceProvider")}
                              </span>
                            </div>
                            {form.getValues("isUrgent") && (
                              <Badge variant="destructive" className="mt-2">
                                Urgent
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span>Consultation Fee</span>
                          <span>{formatCurrency(getConsultationFee())}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Service Fee</span>
                          <span>{formatCurrency(500)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>Total</span>
                          <span>{formatCurrency(getConsultationFee() + 500)}</span>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <div className="flex gap-2">
                          <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-700">
                            By confirming this booking, you agree to Beta-Lyfe's terms of service and cancellation
                            policy.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <DialogFooter className="px-6 pb-6">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                  )}

                  {step < totalSteps ? (
                    <Button type="button" onClick={nextStep}>
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground mb-6">
              Your consultation has been successfully booked with {doctorData.name}
            </p>
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
