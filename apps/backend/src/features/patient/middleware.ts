import type { MiddlewareHandler } from 'hono'
import type { User } from '../auth/types'
import { StatusCodes } from '../http'
import { Logger } from '../logger'
import type { types } from '@beta-lyfe/api'
import type { DoctorProfile, PatientProfile } from '../database/schema'

export type Response =
  | types.components['schemas']['Api.UnauthorizedError']
  | types.components['schemas']['Api.UserNotVerifiedError']
  | types.components['schemas']['Api.UnexpectedError']

export namespace PatientMiddleware {
  export const middleware: MiddlewareHandler<{
    Variables: {
      user: User
      patientProfile: PatientProfile
    }
  }> = async (c, next) => {
    const user = c.get('user')
    const response = {
      code: 'ONLY_PATIENT_ALLOWED'
    }
    if (!(user.data.role === 'patient'))
      return c.json(response, StatusCodes.UNAUTHORIZED)
    c.set('patientProfile', user.profiles.patient!)
    await next()
  }
}
