import { Hono } from 'hono'
import ConsultationRepository from '../../repository'
import { AuthMiddleware } from '../../../auth'
import { StatusCodes } from '../../../http'
import middleware from './middleware'
import { status } from 'effect/Fiber'
import { consultationRequests, doctorProfiles } from '../../../database/schema'
import { generateJitsiConsulationToken } from '../../utils/tokenservice'
import { PatientRepository } from '../../../patient'
import { DoctorRepository } from '../../../doctor'
import { logger } from '../../../../app'
import { PatientMiddleware } from '../../../patient/middleware'
import { Mailer } from '../../../mailer/lib'
import ConsultationApprovalEmail from '../../email/doctorapproveemail'
import type { schema } from '@beta-lyfe/api'

export type Response =
  schema.paths['/api/consultation/request']['post']['responses'][keyof schema.paths['/api/consultation/request']['post']['responses']]['content']['application/json']

export default new Hono().post(
  '/request',
  AuthMiddleware.middleware,
  PatientMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const patient_profile = c.get('patientProfile')
    const payload = c.req.valid('json')
    const start_time = new Date(payload.start_time)
    const end_time = new Date(payload.end_time)
    let response: Response
    logger.info(payload)
    const consultationRequest =
      await ConsultationRepository.createConsultationRequest({
        ...payload,
        patient_id: patient_profile.id,
        status: 'pending',
        start_time,
        end_time
      })
    if (consultationRequest.isErr) {
      response = {
        code: 'UNEXPECTED_ERROR'
      }
      return c.json(response, StatusCodes.INTERNAL_SERVER_ERROR)
    }

    const { doctor_id, patient_id, message } = consultationRequest.value
    const doctorProfile = await DoctorRepository.findById(doctor_id)
    if (doctorProfile.isErr || doctorProfile.value === null) {
      response = {
        code: 'UNEXPECTED_ERROR'
      }
      return c.json(response, StatusCodes.INTERNAL_SERVER_ERROR)
    }

    const current_date = new Date()
    try {
      await Mailer.send({
        email: (
          <ConsultationApprovalEmail
            consultationId={consultationRequest.value.id}
            doctorName={`${doctorProfile.value.first_name}`}
            patientName={`${patient_profile.first_name}`}
          />
        ),
        recipients: [doctorProfile.value.email],
        subject: `New Consultation request from ${patient_profile.first_name}`
      })
    } catch (error) {
      logger.error('Error generating Jitsi token:', error)
    }

    response = {
      code: 'CONSULTATION_REQUEST_CREATED_SUCCESSFULLY',
      data: consultationRequest.value
    } as any
    return c.json(consultationRequest.value, StatusCodes.CREATED)
  }
)
