import type { User } from '../../../auth/types'
import { PharmacyRepository } from '../..'
import type { Schema } from './schema'
import { Storage } from '../../../storage'
import { Result } from 'true-myth'
import type { PharmacyStore } from '../../../database/schema'

export type Error = 'IMAGE_UPLOAD_FAILED'

type Payload = Schema

export default async (
  user: User,
  payload: Payload
): Promise<Result<PharmacyStore, Error>> => {
  const { cover_image, ..._payload } = payload
  const uploadResult = await Storage.service.upload(cover_image)

  if (uploadResult.isErr) {
    return Result.err('IMAGE_UPLOAD_FAILED')
  }

  const uploadedCoverImage = uploadResult.value

  const store = await PharmacyRepository.createStore({
    ..._payload,
    cover_image: uploadedCoverImage,
    owner_id: user.data.id
  })

  return Result.ok(store)
}
