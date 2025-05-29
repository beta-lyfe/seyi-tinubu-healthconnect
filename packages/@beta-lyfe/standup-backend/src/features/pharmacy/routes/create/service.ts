import type { User } from '../../../auth/types'
import { PharmacyRepository } from '../..'
import type { Schema } from './schema'
import { Result } from 'true-myth'
import type { PharmacyStore } from '../../../database/schema'

export type Error = 'IMAGE_UPLOAD_FAILED'

type Payload = Schema

export default async (
  user: User,
  payload: Payload
): Promise<Result<PharmacyStore, Error>> => {
  const store = await PharmacyRepository.createStore({
    ...payload,
    owner_id: user.data.id
  })

  return Result.ok(store)
}
