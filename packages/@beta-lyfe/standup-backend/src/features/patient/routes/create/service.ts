import type { User } from '../../../auth/types'
import { PatientRepository } from '../..'
import type { Schema } from './schema'

export type Payload = {
  body: Schema
  user: User
}

export default async (payload: Payload) =>
  PatientRepository.createProfile({
    date_of_birth: payload.body.date_of_birth,
    email: payload.user.data.email,
    user_id: payload.user.data.id,
    first_name: payload.user.data.first_name,
    last_name: payload.user.data.last_name,
    phone_number: payload.user.data.phone_number,
    other_names: null,
    profile_picture: null
  })
