import { Result } from 'true-myth'
import { hashPassword } from '../../utils/password-utils'
import Repository from '../../repository'
import type { Schema } from './schema'
import type { User } from '../../types'

export type Payload = Schema

type Error = 'EMAIL_ALREADY_IN_USE' | 'UNEXPECTED_ERROR'
export default async (
  payload: Payload
): Promise<Result<User['data'], Error>> => {
  const existingUserResult = await Repository.findByEmail(payload.email)
  if (existingUserResult.isErr) {
    return Result.err('UNEXPECTED_ERROR')
  }

  const existingUser = existingUserResult.value
  if (existingUser) return Result.err('EMAIL_ALREADY_IN_USE')

  const hashedPassword = await hashPassword(payload.password)

  const userCreationResult = await Repository.createUser({
    ...payload,
    role: payload.is_doctor ? 'doctor' : 'patient'
  })

  if (userCreationResult.isErr) return Result.err('UNEXPECTED_ERROR')

  const user = userCreationResult.value

  const authenticationMethodCreationResult =
    await Repository.createAuthenticationMethod({
      user_id: user.id,
      meta: {
        data: hashedPassword,
        provider: 'credentials'
      }
    })

  if (authenticationMethodCreationResult.isErr)
    return Result.err('UNEXPECTED_ERROR')

  return Result.ok(user)
}
