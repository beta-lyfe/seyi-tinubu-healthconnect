import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

import { useState } from "react"
import { Button } from "@beta-lyfe/ui/components/shad/ui/button"
import { Card, CardContent } from "@beta-lyfe/ui/components/shad/ui/card"
import { Input } from "@beta-lyfe/ui/components/shad/ui/input"
import { Label } from "@beta-lyfe/ui/components/shad/ui/label"
import { Textarea } from "@beta-lyfe/ui/components/shad/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@beta-lyfe/ui/components/shad/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@beta-lyfe/ui/components/shad/ui/avatar"
import { Badge } from "@beta-lyfe/ui/components/shad/ui/badge"
import { Progress } from "@beta-lyfe/ui/components/shad/ui/progress"
import {
  User,
  Briefcase,
  DollarSign,
  GraduationCap,
  MapPin,
  Upload,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  Stethoscope,
} from "lucide-react"
import { $api } from '../../../../../lib/backend'
import { z } from 'zod'
import { toast } from 'sonner'

export const Route = createFileRoute('/_app/auth/set-profile/doctor/')({
  component: DoctorProfileSetup,
   validateSearch:z.object({
        token:z.string()
      })
})




interface FormData {
  // Personal Information
  first_name: string
  last_name: string
  other_names: string
  email: string
  phone_number: string
  date_of_birth: string
  profile_picture: string

  // Professional Information
  specialization: string
  years_of_experience: number
  description: string

  // Consultation Charges
  home_consultation_charge: string
  video_consultation_charge: string
  clinic_consultation_charge: string

  // Certifications
  certifications: Array<{
    name: string
    issued_by: string
    year: string
  }>

  // Experiences
  experiences: Array<{
    title: string
    institution: string
    start_date: string
    end_date: string
  }>

  // Working Hours
  working_hours: Array<{
    day: string
    start_time: string
    end_time: string
  }>

  // Location
  location: {
    landmark: string
    street: string
    coordinates: string
    address: string
    city: string
    state: string
    country: string
    zip_code: string
  }
}

interface ValidationErrors {
  [key: string]: string
}

export default function DoctorProfileSetup() {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const token = Route.useSearch().token
  const {mutate}=$api.useMutation('post', '/api/doctors', {
      onSuccess: (res) => {
        console.log("Profile updated successfully:", res)
        toast.success(res.code)
        router.navigate({
          to: '/auth/sign-in',
        })
    
      },
      onError: (error) => {
        console.error("Error updating profile:", error)
        toast.error("Failed to update profile. Please try again.")
      },
    })
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    other_names: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    profile_picture: "",
    specialization: "",
    years_of_experience: 0,
    description: "",
    home_consultation_charge: "",
    video_consultation_charge: "",
    clinic_consultation_charge: "",
    certifications: [],
    experiences: [],
    working_hours: [],
    location: {
      landmark: "",
      street: "",
      coordinates: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip_code: "",
    },
  })

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Family Medicine",
    "Internal Medicine",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology",
  ]

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof FormData] as Record<string, any>),
        [field]: value,
      },
    }))
  }

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", issued_by: "", year: "" }],
    }))
  }

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  const updateCertification = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert)),
    }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { title: "", institution: "", start_date: "", end_date: "" }],
    }))
  }

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    }))
  }

  const addWorkingHour = () => {
    setFormData((prev) => ({
      ...prev,
      working_hours: [...prev.working_hours, { day: "", start_time: "", end_time: "" }],
    }))
  }

  const removeWorkingHour = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      working_hours: prev.working_hours.filter((_, i) => i !== index),
    }))
  }

  const updateWorkingHour = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      working_hours: prev.working_hours.map((hour, i) => (i === index ? { ...hour, [field]: value } : hour)),
    }))
  }

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null
    return <p className="text-sm text-destructive mt-1">{error}</p>
  }

  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required"
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required"
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!formData.specialization) newErrors.specialization = "Specialization is required"
    if (formData.years_of_experience < 0) newErrors.years_of_experience = "Years of experience must be 0 or greater"
    if (!formData.description.trim()) newErrors.description = "Professional description is required"
    else if (formData.description.trim().length < 50)
      newErrors.description = "Description must be at least 50 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!formData.video_consultation_charge.trim())
      newErrors.video_consultation_charge = "Video consultation charge is required"
    else if (isNaN(Number(formData.video_consultation_charge)) || Number(formData.video_consultation_charge) <= 0) {
      newErrors.video_consultation_charge = "Must be a valid positive number"
    }

    if (!formData.clinic_consultation_charge.trim())
      newErrors.clinic_consultation_charge = "Clinic consultation charge is required"
    else if (isNaN(Number(formData.clinic_consultation_charge)) || Number(formData.clinic_consultation_charge) <= 0) {
      newErrors.clinic_consultation_charge = "Must be a valid positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep4 = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (formData.certifications.length === 0) {
      newErrors.certifications = "At least one certification is required"
    } else {
      formData.certifications.forEach((cert, index) => {
        if (!cert.name.trim()) newErrors[`cert_name_${index}`] = "Certification name is required"
        if (!cert.issued_by.trim()) newErrors[`cert_issued_${index}`] = "Issuing institution is required"
        if (!cert.year.trim()) newErrors[`cert_year_${index}`] = "Year is required"
      })
    }

    if (formData.experiences.length === 0) {
      newErrors.experiences = "At least one work experience is required"
    } else {
      formData.experiences.forEach((exp, index) => {
        if (!exp.title.trim()) newErrors[`exp_title_${index}`] = "Job title is required"
        if (!exp.institution.trim()) newErrors[`exp_institution_${index}`] = "Institution is required"
        if (!exp.start_date) newErrors[`exp_start_${index}`] = "Start date is required"
        if (!exp.end_date) newErrors[`exp_end_${index}`] = "End date is required"
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep5 = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (formData.working_hours.length === 0) {
      newErrors.working_hours = "At least one working day is required"
    } else {
      formData.working_hours.forEach((hour, index) => {
        if (!hour.day) newErrors[`hour_day_${index}`] = "Day is required"
        if (!hour.start_time) newErrors[`hour_start_${index}`] = "Start time is required"
        if (!hour.end_time) newErrors[`hour_end_${index}`] = "End time is required"
      })
    }

    if (!formData.location.address.trim()) newErrors.location_address = "Address is required"
    if (!formData.location.city.trim()) newErrors.location_city = "City is required"
    if (!formData.location.state.trim()) newErrors.location_state = "State is required"
    if (!formData.location.country.trim()) newErrors.location_country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
      case 3:
        isValid = validateStep3()
        break
      case 4:
        isValid = validateStep4()
        break
      case 5:
        isValid = validateStep5()
        break
      default:
        isValid = true
    }

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setErrors({}) // Clear errors when moving to next step
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep5()) return

    setIsSubmitting(true)
    try {
      // Here you would submit the form data to your API
      console.log("Submitting form data:", formData)
      mutate({
      body:formData as any,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ submit: "Failed to save profile. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {Object.keys(errors).length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-destructive mb-2">Please fix the following errors:</h4>
                <ul className="text-sm text-destructive space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-bold">Personal Information</h2>
              <p className="text-muted-foreground">Let's start with your basic details</p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.profile_picture || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="text-2xl">
                    {formData.first_name[0]}
                    {formData.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => updateFormData("first_name", e.target.value)}
                  placeholder="Enter your first name"
                  className={errors.first_name ? "border-destructive" : ""}
                />
                <ErrorMessage error={errors.first_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => updateFormData("last_name", e.target.value)}
                  placeholder="Enter your last name"
                  className={errors.last_name ? "border-destructive" : ""}
                />
                <ErrorMessage error={errors.last_name} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="other_names">Other Names</Label>
              <Input
                id="other_names"
                value={formData.other_names}
                onChange={(e) => updateFormData("other_names", e.target.value)}
                placeholder="Enter your other names (optional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="Enter your email"
                  className={errors.email ? "border-destructive" : ""}
                />
                <ErrorMessage error={errors.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number *</Label>
                <Input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => updateFormData("phone_number", e.target.value)}
                  placeholder="Enter your phone number"
                  className={errors.phone_number ? "border-destructive" : ""}
                />
                <ErrorMessage error={errors.phone_number} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth *</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => updateFormData("date_of_birth", e.target.value)}
                className={errors.date_of_birth ? "border-destructive" : ""}
              />
              <ErrorMessage error={errors.date_of_birth} />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            {Object.keys(errors).length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-destructive mb-2">Please fix the following errors:</h4>
                <ul className="text-sm text-destructive space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-bold">Professional Information</h2>
              <p className="text-muted-foreground">Tell us about your medical expertise</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization *</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => updateFormData("specialization", value)}
              >
                <SelectTrigger className={errors.specialization ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select your specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage error={errors.specialization} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years_of_experience">Years of Experience *</Label>
              <Input
                id="years_of_experience"
                type="number"
                min="0"
                value={formData.years_of_experience}
                onChange={(e) => updateFormData("years_of_experience", Number.parseInt(e.target.value))}
                placeholder="Enter years of experience"
                className={errors.years_of_experience ? "border-destructive" : ""}
              />
              <ErrorMessage error={errors.years_of_experience} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Professional Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Describe your expertise, approach to patient care, and what makes you unique..."
                rows={4}
                className={errors.description ? "border-destructive" : ""}
              />
              <ErrorMessage error={errors.description} />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {Object.keys(errors).length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-destructive mb-2">Please fix the following errors:</h4>
                <ul className="text-sm text-destructive space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-bold">Consultation Fees</h2>
              <p className="text-muted-foreground">Set your consultation charges</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="video_consultation_charge">Video Consultation *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₦</span>
                  <Input
                    id="video_consultation_charge"
                    value={formData.video_consultation_charge}
                    onChange={(e) => updateFormData("video_consultation_charge", e.target.value)}
                    placeholder="0.00"
                    className={`pl-8 ${errors.video_consultation_charge ? "border-destructive" : ""}`}
                  />
                </div>
                <ErrorMessage error={errors.video_consultation_charge} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinic_consultation_charge">Clinic Consultation *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₦</span>
                  <Input
                    id="clinic_consultation_charge"
                    value={formData.clinic_consultation_charge}
                    onChange={(e) => updateFormData("clinic_consultation_charge", e.target.value)}
                    placeholder="0.00"
                    className={`pl-8 ${errors.clinic_consultation_charge ? "border-destructive" : ""}`}
                  />
                </div>
                <ErrorMessage error={errors.clinic_consultation_charge} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home_consultation_charge">Home Consultation</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₦</span>
                  <Input
                    id="home_consultation_charge"
                    value={formData.home_consultation_charge}
                    onChange={(e) => updateFormData("home_consultation_charge", e.target.value)}
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Pricing Guidelines</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Video consultations are typically 20-30% less than clinic visits</li>
                <li>• Home consultations usually include travel time and costs</li>
                <li>• Consider your experience level and local market rates</li>
                <li>• You can always adjust these rates later</li>
              </ul>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            {Object.keys(errors).length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-destructive mb-2">Please fix the following errors:</h4>
                <ul className="text-sm text-destructive space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-center">
              <h2 className="md:text-xl font-bold">Experience & Certifications</h2>
              <p className="text-muted-foreground">Add your professional background</p>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm md:text-lg font-medium">Certifications</h3>
                <Button variant="outline" size="sm" onClick={addCertification}>
                  <Plus className="h-4 w-4 mr-2" /> Add Certification
                </Button>
              </div>
              {errors.certifications && <ErrorMessage error={errors.certifications} />}

              {formData.certifications.map((cert, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-medium">Certification {index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => removeCertification(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Certification Name</Label>
                        <Input
                          value={cert.name}
                          onChange={(e) => updateCertification(index, "name", e.target.value)}
                          placeholder="e.g., MBBS"
                          className={errors[`cert_name_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`cert_name_${index}`]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Issued By</Label>
                        <Input
                          value={cert.issued_by}
                          onChange={(e) => updateCertification(index, "issued_by", e.target.value)}
                          placeholder="e.g., University of Lagos"
                          className={errors[`cert_issued_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`cert_issued_${index}`]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                          value={cert.year}
                          onChange={(e) => updateCertification(index, "year", e.target.value)}
                          placeholder="e.g., 2020"
                          className={errors[`cert_year_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`cert_year_${index}`]} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Experiences */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm md:text-lg ">Work Experience</h3>
                <Button variant="outline" size="sm" onClick={addExperience}>
                  <Plus className="h-4 w-4 mr-2" /> Add Experience
                </Button>
              </div>
              {errors.experiences && <ErrorMessage error={errors.experiences} />}

              {formData.experiences.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          value={exp.title}
                          onChange={(e) => updateExperience(index, "title", e.target.value)}
                          placeholder="e.g., Resident Doctor"
                          className={errors[`exp_title_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`exp_title_${index}`]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          value={exp.institution}
                          onChange={(e) => updateExperience(index, "institution", e.target.value)}
                          placeholder="e.g., General Hospital"
                          className={errors[`exp_institution_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`exp_institution_${index}`]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={exp.start_date}
                          onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                          className={errors[`exp_start_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`exp_start_${index}`]} />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={exp.end_date}
                          onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                          className={errors[`exp_end_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`exp_end_${index}`]} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            {Object.keys(errors).length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-destructive mb-2">Please fix the following errors:</h4>
                <ul className="text-sm text-destructive space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-center">
              <h2 className="text-lg md:text-2xl font-bold">Schedule & Location</h2>
              <p className="text-muted-foreground">Set your availability and practice location</p>
            </div>

            {/* Working Hours */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md md:text-lg">Work Hours</h3>
                <Button variant="outline" size="sm" onClick={addWorkingHour}>
                  <Plus className="h-4 w-4 mr-2" /> Add Working Day
                </Button>
              </div>
              {errors.working_hours && <ErrorMessage error={errors.working_hours} />}

              {formData.working_hours.map((hour, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-medium">Working Day {index + 1}</h4>
                      <Button variant="ghost" size="sm" onClick={() => removeWorkingHour(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Day</Label>
                        <Select value={hour.day} onValueChange={(value) => updateWorkingHour(index, "day", value)}>
                          <SelectTrigger className={errors[`hour_day_${index}`] ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            {daysOfWeek.map((day) => (
                              <SelectItem key={day} value={day.toLowerCase()}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ErrorMessage error={errors[`hour_day_${index}`]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={hour.start_time}
                          onChange={(e) => updateWorkingHour(index, "start_time", e.target.value)}
                          className={errors[`hour_start_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`hour_start_${index}`]} />
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={hour.end_time}
                          onChange={(e) => updateWorkingHour(index, "end_time", e.target.value)}
                          className={errors[`hour_end_${index}`] ? "border-destructive" : ""}
                        />
                        <ErrorMessage error={errors[`hour_end_${index}`]} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Practice Location</h3>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input
                        value={formData.location.address}
                        onChange={(e) => updateNestedFormData("location", "address", e.target.value)}
                        placeholder="Street address"
                        className={errors.location_address ? "border-destructive" : ""}
                      />
                      <ErrorMessage error={errors.location_address} />
                    </div>
                    <div className="space-y-2">
                      <Label>Street</Label>
                      <Input
                        value={formData.location.street}
                        onChange={(e) => updateNestedFormData("location", "street", e.target.value)}
                        placeholder="Street name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={formData.location.city}
                        onChange={(e) => updateNestedFormData("location", "city", e.target.value)}
                        placeholder="City"
                        className={errors.location_city ? "border-destructive" : ""}
                      />
                      <ErrorMessage error={errors.location_city} />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        value={formData.location.state}
                        onChange={(e) => updateNestedFormData("location", "state", e.target.value)}
                        placeholder="State"
                        className={errors.location_state ? "border-destructive" : ""}
                      />
                      <ErrorMessage error={errors.location_state} />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input
                        value={formData.location.country}
                        onChange={(e) => updateNestedFormData("location", "country", e.target.value)}
                        placeholder="Country"
                        className={errors.location_country ? "border-destructive" : ""}
                      />
                      <ErrorMessage error={errors.location_country} />
                    </div>
                    <div className="space-y-2">
                      <Label>ZIP Code</Label>
                      <Input
                        value={formData.location.zip_code}
                        onChange={(e) => updateNestedFormData("location", "zip_code", e.target.value)}
                        placeholder="ZIP/Postal code"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Landmark</Label>
                    <Input
                      value={formData.location.landmark}
                      onChange={(e) => updateNestedFormData("location", "landmark", e.target.value)}
                      placeholder="Nearby landmark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Coordinates (Optional)</Label>
                    <Input
                      value={formData.location.coordinates}
                      onChange={(e) => updateNestedFormData("location", "coordinates", e.target.value)}
                      placeholder="Latitude, Longitude"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link to="/doctor/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-1 rounded-md">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-lg">ST connect MD</span>
          </Link>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg md:text-xl font-bold">Complete Your Profile</h1>
              <p className="text-muted-foreground">
                Step {currentStep} of {totalSteps}: Fill in your professional details
              </p>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8">
          {[
            { step: 1, title: "Personal", icon: User },
            { step: 2, title: "Professional", icon: Briefcase },
            { step: 3, title: "Fees", icon: DollarSign },
            { step: 4, title: "Experience", icon: GraduationCap },
            { step: 5, title: "Schedule", icon: MapPin },
          ].map(({ step, title, icon: Icon }) => (
            <div key={step} className="flex flex-col justify-between items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step <= currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {step < currentStep ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <p className="text-xs mt-2 text-center max-w-20">{title}</p>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <Card>
          <CardContent className="p-6">{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
           

            {currentStep === totalSteps ? (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving Profile...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Complete Profile
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
