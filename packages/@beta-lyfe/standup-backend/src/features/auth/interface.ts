import type { Result, Maybe } from 'true-myth'
import type { User } from './types'

export interface AuthService {
  getUserProfile(token: string): Promise<Result<Maybe<User>, 'NETWORK_ERR'>>
}
