import { Hono } from 'hono'
import { db } from '../../../database'
import ConsultationRepository from '../../repository'
import { AuthMiddleware } from '../../../auth'
import { StatusCodes } from 'http-status-codes'
import { Pagination } from '../../../pagination'
import middleware from './middleware'
import type { Consultation, User } from '../../../database/schema'
import { DoctorRepository } from '../../../doctor'
import { PatientRepository } from '../../../patient'
import type { schema } from '@beta-lyfe/api'

export type Response =
  schema.paths['/api/consultation']['get']['responses'][keyof schema.paths['/api/consultation']['get']['responses']]['content']['application/json']

export default new Hono().get(
  '/',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const options = c.req.valid('query')
    const profile = c.req.query('profile')
    let data = null
    let response: Response

    const { items, count } =
      await ConsultationRepository.findManyConsultationsWithCount(
        user.data.role === 'doctor'
          ? user.profiles.doctor!.id
          : user.profiles.patient!.id,
        options
      )

    console.log(items)

    const publicItems = items.map((item) =>
      toConsultationPublic(item, user.data.role)
    )

    if (profile) {
      data = await Promise.all(
        publicItems.map(async (consulation) =>
          user.data.role === 'patient'
            ? Object.assign(consulation, {
                doctor_profile: await Promise.resolve(
                  (async () => {
                    const doctor = await DoctorRepository.findById(
                      consulation.doctor_id
                    )
                    return doctor.isOk ? doctor.value : null
                  })()
                )
              })
            : Object.assign(consulation, {
                patient_profile: await Promise.resolve(
                  (async () => {
                    const patient = await PatientRepository.findById(
                      consulation.patient_id
                    )
                    if (patient.isOk) {
                      return patient.value
                    }
                    return null
                  })()
                )
              })
        )
      )
    }

    if (!profile) {
      data = items
    }

    response = {
      code: 'FETCH_CONSULTATIONS_SUCCESSFUL',
      data: Pagination.paginate(data! as any, {
        ...options,
        total: count
      }) as any
    }
    return c.json(
      Pagination.paginate(publicItems, {
        ...options,
        total: count
      }),
      StatusCodes.OK
    )
  }
)

const toConsultationPublic = (
  consultation: Consultation,
  role: User['role']
) => {
  const { doctor_token, patient_token, ...rest } = consultation
  const token = role === 'doctor' ? doctor_token : patient_token
  return { ...rest, token }
}
