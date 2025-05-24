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

  // const updateResult = await Repository.updateByUserId(user.data.id, {
  //   ..._payload as any,
  //   profile_picture: profilePictureUpdate
  // })

  const updateResult=await Repository.createProfile({
    user_id:user.data.id,
    date_of_birth:payload.date_of_birth!,
    email:user.data.email,
    first_name:user.data.first_name,
    last_name:user.data.last_name,
    other_names:null,
    phone_number:user.data.phone_number,
    profile_picture:null,
  })

  
  if (updateResult.isErr) return Result.err('FAILED_TO_UPDATE_PROFILE')

  return Result.ok(null)
}
