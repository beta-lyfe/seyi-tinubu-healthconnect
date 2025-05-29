import type { User } from '../../../../auth/types'
import Repository from '../../../repository'
import type { Schema } from './schema'
import { Result } from 'true-myth'

export type Error = 'FAILED_TO_UPDATE_PROFILE'

export default async (
  user: User,
  payload: Schema
): Promise<Result<null, Error>> => {
  const updateResult = await Repository.updateByUserId(user.data.id, payload)

  if (updateResult.isErr) return Result.err('FAILED_TO_UPDATE_PROFILE')

  return Result.ok(null)
}
