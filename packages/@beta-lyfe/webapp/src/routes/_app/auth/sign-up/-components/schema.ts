import { z } from 'zod'

export const step1Schema = z.object({
  firstname: z.string().min(4),
  lastname: z.string().min(4)
})

export type Step1Schema = z.infer<typeof step1Schema>

export const step2Schema = z.object({
  who: z.enum(['patient', 'doctor'])
})

export type Step2Schema = z.infer<typeof step2Schema>

export const step3Schema = z.object({
  phone: z.string().min(11),
  email: z.string().email()
})

export type Step3Schema = z.infer<typeof step3Schema>

export const step4Schema = z.object({
  dob: z.string().date()
})

export type Step4Schema = z.infer<typeof step4Schema>

export const step5Schema = z.object({
  password: z.string().min(8),
  confirmpassword: z.string().min(8)
})

export type Step5Schema = z.infer<typeof step5Schema>

export const formSchema = z.object({})

//   const FormGlobalStateSchema = z.union([
//     letsGetStartedForm,
//     whoWouldYouLikeToBe,
//     howWouldYoubeContactedForm,
//     justOneMoreStep,
//     secureAccountForm,
//   ])

//   type FormGlobalStateType = z.infer<typeof FormGlobalStateSchema>

//   type FormSchema = z.infer<typeof formSchema>
//   type LetsGetStartedFormSchema = z.infer<typeof letsGetStartedForm>
