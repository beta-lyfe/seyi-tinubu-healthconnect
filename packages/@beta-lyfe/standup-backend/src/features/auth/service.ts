import { Result, Maybe } from 'true-myth'
import type { AuthService } from './interface'
import type { User } from './types'
import { client } from './lib'
import { Logger } from '../logger'

class AuthServiceImpl implements AuthService {
  logger = Logger.getSubLogger({ name: 'AuthServiceImplLogger' })

  async getUserProfile(
    token: string
  ): Promise<Result<Maybe<User>, 'NETWORK_ERR'>> {
    try {
      const doctor = await client.GET('/api/doctors/profile', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      if (doctor.data) {
        return Result.ok(Maybe.just({ role: 'doctor', data: doctor.data }))
      }

      const patient = await client.GET('/api/patients/profile/', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      if (patient.data) {
        return Result.ok(Maybe.just({ role: 'patient', data: patient.data }))
      }

      return Result.ok(Maybe.nothing())
    } catch (err) {
      this.logger.error('Error occurred while trying to get user profile:', err)
      return Result.err('NETWORK_ERR')
    }
  }
}

export { AuthServiceImpl }
