import Repository from '../../../repository'
import { Result } from 'true-myth'
import type { Schema } from './schema'
import { hashPassword } from '../../../utils/password-utils'

export type Error = 'UNEXPECTED_ERROR' | 'INVALID_OR_EXPIRED_TOKEN'

export type Payload = Schema

export default async (payload: Payload): Promise<Result<null, Error>> => {
  const findTokenResult = await Repository.findPasswordResetTokenByToken(
    payload.token
  )
  if (findTokenResult.isErr) return Result.err('UNEXPECTED_ERROR')

  const token = findTokenResult.value

  if (!token) return Result.err('INVALID_OR_EXPIRED_TOKEN')

  const newHashedPassword = await hashPassword(payload.password)

  const findAuthMethodResult =
    await Repository.findAuthenticationMethodByUserId(token.userId)

  if (findAuthMethodResult.isErr) return Result.err('UNEXPECTED_ERROR')

  const authMethod = findAuthMethodResult.value

  if (!authMethod) {
    const createAuthMethodResult = await Repository.createAuthenticationMethod({
      userId: token.userId,
      meta: {
        provider: 'credentials',
        data: newHashedPassword
      }
    })

    if (createAuthMethodResult.isErr) return Result.err('UNEXPECTED_ERROR')
  } else {
    const updateAuthMethodResult =
      await Repository.updateAuthenticationMethodById(authMethod.id, {
        meta: {
          provider: 'credentials',
          data: newHashedPassword
        }
      })

    if (updateAuthMethodResult.isErr) return Result.err('UNEXPECTED_ERROR')
  }

  return Result.ok(null)
}
