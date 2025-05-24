import type { User } from '../../../../auth/types'
import type { Media } from '../../../../database/schema'
import { Storage } from '../../../../storage'
import Repository from '../../../repository'
import type { Schema } from './schema'
import { Result } from 'true-myth'

export type Error = 'FAILED_TO_UPDATE_PROFILE'

export default async (
  user: User,
  payload: Schema
): Promise<Result<null, Error>> => {
  const { profile_picture, ..._payload } = payload
  let profilePictureUpdate: Media | undefined

  if (profile_picture) {
    const uploadResult = await Storage.service.upload(profile_picture)
    if (uploadResult.isErr) return Result.err('FAILED_TO_UPDATE_PROFILE')
    const uploadedMedia = uploadResult.value
    profilePictureUpdate = uploadedMedia
  }

  const updateResult = await Repository.updateByUserId(user.data.id, {
    ..._payload,
    profile_picture: profilePictureUpdate
  })

  if (updateResult.isErr) return Result.err('FAILED_TO_UPDATE_PROFILE')

  return Result.ok(null)
}
