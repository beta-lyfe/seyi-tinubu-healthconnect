import type { z } from 'zod'
import type { User } from '../../../auth/types'
import Repository from '../../repository'
import type schema from './schema'
import { Storage } from '../../../storage'
import { Result } from 'true-myth'
import type { PharmacyStore } from '../../../database/schema'

export type Error = 'IMAGE_UPLOAD_FAILED'

type PayloadSchema = z.infer<typeof schema>

export default async (
  user: User,
  payload: PayloadSchema
): Promise<Result<PharmacyStore, Error>> => {
  const { coverImage, ..._payload } = payload
  const uploadResult = await Storage.service.upload(coverImage)

  if (uploadResult.isErr) {
    return Result.err('IMAGE_UPLOAD_FAILED')
  }

  const uploadedCoverImage = uploadResult.value

  const store = await Repository.create({
    ..._payload,
    coverImage: uploadedCoverImage,
    ownerId: user.data.id
  })

  return Result.ok(store)
}
