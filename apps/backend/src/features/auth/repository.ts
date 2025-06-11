import { db } from '../database'
import { eq, and } from 'drizzle-orm'
import {
  users,
  authenticationMethods,
  type AuthenticationMethod,
  type User,
  type Token,
  tokens
} from '../database/schema'
import { Result } from 'true-myth'

namespace Repository {
  export type Error = 'UNEXPECTED_ERROR'

  export const findByEmail = async (
    email: string
  ): Promise<Result<User | null, Error>> => {
    const user =
      (await db.select().from(users).where(eq(users.email, email)))[0] ?? null
    return Result.ok(user)
  }

  export type CreateUserPayload = Omit<typeof users.$inferInsert, 'id'>

  export const createUser = async (
    payload: CreateUserPayload
  ): Promise<Result<User, Error>> => {
    const user = (await db.insert(users).values(payload).returning())[0]
    return Result.ok(user)
  }

  export const findUserById = async (payload: { id: string }): Promise<
    Result<User | null, Error>
  > => {
    const user =
      (await db.select().from(users).where(eq(users.id, payload.id)))[0] ?? null
    return Result.ok(user)
  }

  export type CreateAuthenticationMethodPayload = Omit<
    typeof authenticationMethods.$inferInsert,
    'id' | 'created_at' | 'updated_at'
  >

  export const createAuthenticationMethod = async (
    payload: CreateAuthenticationMethodPayload
  ): Promise<Result<AuthenticationMethod, Error>> => {
    const authenticationMethod = (
      await db.insert(authenticationMethods).values(payload).returning()
    )[0]
    return Result.ok(authenticationMethod)
  }

  export const findAuthenticationMethodByUserId = async (
    userId: string
  ): Promise<Result<AuthenticationMethod | null, Error>> => {
    const authMethod =
      (
        await db
          .select()
          .from(authenticationMethods)
          .where(eq(authenticationMethods.user_id, userId))
      )[0] ?? null

    return Result.ok(authMethod)
  }

  export type UpdateAuthenticationMethodByIdPayload =
    Partial<CreateAuthenticationMethodPayload>

  export const updateAuthenticationMethodById = async (
    id: string,
    payload: UpdateAuthenticationMethodByIdPayload
  ): Promise<Result<null, Error>> => {
    await db
      .update(authenticationMethods)
      .set(payload)
      .where(eq(authenticationMethods.id, id))

    return Result.ok(null)
  }

  export type CreateVerificationTokenPayload = Omit<
    Token,
    'id' | 'created_at' | 'updated_at'
  >

  export const createVerificationToken = async (
    payload: CreateVerificationTokenPayload
  ): Promise<Result<Token, Error>> => {
    const token = (
      await db
        .insert(tokens)
        .values({ ...payload })
        .returning()
    )[0]
    return Result.ok(token)
  }

  export const findVerificationTokenByUserId = async (
    userId: string
  ): Promise<Result<Token | null, Error>> => {
    const token =
      (
        await db
          .select()
          .from(tokens)
          .where(
            and(eq(tokens.user_id, userId), eq(tokens.purpose, 'verification'))
          )
      )[0] ?? null

    return Result.ok(token)
  }

  export const deleteVerificationTokenById = async (
    tokenId: string
  ): Promise<Result<null, Error>> => {
    await db
      .delete(tokens)
      .where(and(eq(tokens.id, tokenId), eq(tokens.purpose, 'verification')))
    return Result.ok(null)
  }

  export type CreatePasswordResetTokenPayload = Omit<
    Token,
    'id' | 'purpose' | 'created_at' | 'updated_at'
  >

  export const createPasswordResetToken = async (
    payload: CreatePasswordResetTokenPayload
  ): Promise<Result<Token, Error>> => {
    const token = (
      await db
        .insert(tokens)
        .values({ ...payload, purpose: 'password_reset' })
        .returning()
    )[0]
    return Result.ok(token)
  }

  export const findPasswordResetTokenByUserId = async (
    userId: string
  ): Promise<Result<Token | null, Error>> => {
    const token =
      (
        await db
          .select()
          .from(tokens)
          .where(
            and(
              eq(tokens.user_id, userId),
              eq(tokens.purpose, 'password_reset')
            )
          )
      )[0] ?? null

    return Result.ok(token)
  }

  export const findPasswordResetTokenByToken = async (
    token: string
  ): Promise<Result<Token | null, Error>> => {
    const _token =
      (
        await db
          .select()
          .from(tokens)
          .where(
            and(eq(tokens.token, token), eq(tokens.purpose, 'password_reset'))
          )
          .limit(1)
      )[0] ?? null

    return Result.ok(_token)
  }

  export const deletePasswordResetTokenById = async (
    tokenId: string
  ): Promise<Result<null, Error>> => {
    await db
      .delete(tokens)
      .where(and(eq(tokens.id, tokenId), eq(tokens.purpose, 'password_reset')))
    return Result.ok(null)
  }


  export const verifyUserById = async (
    userId: string
  ): Promise<Result<null, Error>> => {
    await db
      .update(users)
      .set({
        is_verified: true
      })
      .where(eq(users.id, userId))
    return Result.ok(null)
  }
}

export default Repository
