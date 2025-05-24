import type { User } from '../../../auth/types'
import type { DoctorProfile } from '../../../database/schema'
import { Storage } from '../../../storage'
import Repository from '../../repository'
import { Result } from 'true-myth'
import type { Schema } from './schema'

export type Payload = {
  body: Schema
  user: User
}

export type Error = 'FAILED_TO_CREATE_PROFILE'

export default async (
  payload: Payload
): Promise<Result<DoctorProfile, Error>> => {
  const creationResult = await Repository.createProfile({
    ...payload.body,
    first_name: payload.user.data.first_name,
    last_name: payload.user.data.last_name,
    email: payload.user.data.email,
    phone_number: payload.user.data.phone_number,
    user_id: payload.user.data.id
  })

  return creationResult.mapErr(() => 'FAILED_TO_CREATE_PROFILE')
}
