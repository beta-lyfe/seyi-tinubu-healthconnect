import { Result } from 'true-myth'
import { hashPassword } from '../../utils/password-utils'
import Repository from '../../repository'
import type { Schema } from './schema'
import type { User } from '../../types'
import { Mailer } from '../../../mailer/lib'
import GreetingEmail from './email/Greetings'

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

  try {
    await Mailer.send({
      email: <GreetingEmail user={user} />,
      recipients: [user.email],
      subject: 'Welcome '
    })
  } catch (err) {
    console.error('Failed to send welcome email:', err)
  }
  return Result.ok(user)
}
