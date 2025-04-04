import Repository from '../../repository'
import { addMinutes, compareAsc } from 'date-fns'
import { Result } from 'true-myth'
import { Mailer } from '../../../mailer/lib'
import VerificationEmail from './emails/verification'
import type { Schema } from './schema'
import type { Token } from '../../../database/schema'

export type Error =
  | { code: 'UNEXPECTED_ERROR' }
  | { code: 'USER_NOT_FOUND_ERROR' }
  | { code: 'TOKEN_NOT_EXPIRED'; data: { token: Token } }

const generateOtp = (length: number) =>
  Math.floor(1 * 10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1))

export type Payload = Schema

export default async (payload: Payload): Promise<Result<null, Error>> => {
  const findUserResult = await Repository.findByEmail(payload.email)
  if (findUserResult.isErr) return Result.err({ code: 'UNEXPECTED_ERROR' })

  const user = findUserResult.value

  if (!user) return Result.err({ code: 'USER_NOT_FOUND_ERROR' })

  const findExistingTokenResult =
    await Repository.findVerificationTokenByUserId(user.id)

  if (findExistingTokenResult.isErr)
    return Result.err({ code: 'UNEXPECTED_ERROR' })

  const existingToken = findExistingTokenResult.value
  if (existingToken) {
    const hasTokenExpired =
      compareAsc(existingToken.expiresAt, Date.now()) === -1
    if (!hasTokenExpired) {
      return Result.err({
        code: 'TOKEN_NOT_EXPIRED',
        data: { token: existingToken }
      })
    }

    const existingTokenDeletionResult =
      await Repository.deleteVerificationTokenById(existingToken.id)
    if (existingTokenDeletionResult.isErr)
      return Result.err({ code: 'UNEXPECTED_ERROR' })
  }

  const result = await Repository.createVerificationToken({
    userId: user.id,
    token: generateOtp(6).toString(),
    expiresAt: addMinutes(Date.now(), 30)
  })

  if (result.isErr) return Result.err({ code: 'UNEXPECTED_ERROR' })

  const token = result.value

  Mailer.send({
    recipients: [user.email],
    subject: 'Verify Account',
    email: <VerificationEmail user={user} token={token} />
  })

  return Result.ok(null)
}
