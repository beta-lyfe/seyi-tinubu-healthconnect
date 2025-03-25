import type { schema } from '@beta-lyfe/api'

export type Doctor = schema.components['schemas']['Api.Doctor.Doctor']
export type Patient = schema.components['schemas']['Api.Patient.Patient']

export type User =
  | {
      role: 'doctor'
      data: Doctor
    }
  | {
      role: 'patient'
      data: Patient
    }
