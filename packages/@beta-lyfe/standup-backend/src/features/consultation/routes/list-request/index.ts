import { Hono } from 'hono'
import { AuthMiddleware } from '../../../auth'
import ConsultationRepository from '../../repository'
import middleware from './middleware'
import { StatusCodes } from 'http-status-codes'
import { Pagination } from '../../../pagination'

import type { schema } from '@beta-lyfe/api'
import { DoctorRepository } from '../../../doctor'
import { PatientRepository } from '../../../patient'

export type Response =
  schema.paths['/api/consultation/request']['get']['responses'][keyof schema.paths['/api/consultation/request']['get']['responses']]['content']['application/json']

export default new Hono().get(
  '/request',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const options = c.req.valid('query')
    const profile = c.req.query('profile')
    let data = null
    let response: Response
    const { items, count } =
      await ConsultationRepository.findManyConsultationsRequestWithCount(
        user.data.role === 'doctor'
          ? user.profiles.doctor!.id
          : user.profiles.patient!.id,
        options
      )

    if (profile) {
      data = await Promise.all(
        items.map(async (consulation) =>
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
      code: 'FETCH_CONSULTATION_REQUESTS_SUCCESSFUL',
      data: Pagination.paginate(data!, {
        ...options,
        total: count
      }) as any
    }

    return c.json(response, StatusCodes.OK)
  }
)
