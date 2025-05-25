import { Hono } from 'hono'
import { AuthMiddleware } from '../../../auth'
import Repository from '../../repository'
import { StatusCodes } from 'http-status-codes'
import DoctorMiddleware from '../../../doctor/middleware'
import { generateJitsiConsulationToken } from '../../utils/tokenservice'
import ConsultationRepository from '../../repository'
import { Mailer } from '../../../mailer/lib'
import { PatientRepository } from '../../../patient'
import ConsultationRejectedEmail from '../../email/doctorrejectemail'
import type { schema } from '@beta-lyfe/api'

export type Response =
  schema.paths['/api/consultation/request/{id}/reject']['post']['responses'][keyof schema.paths['/api/auth/sign-in']['post']['responses']]['content']['application/json']

export default new Hono().post(
  '/request/:id/reject',
  AuthMiddleware.middleware,
  DoctorMiddleware.middleware,
  async (c) => {
    const { id } = c.req.param()
    const user = c.get('user')
    let response: Response

    const rejectedConsultationRequest =
      await Repository.UpdateStatusConsultationRequest(
        user.profiles.doctor!.id,
        id,
        'rejected'
      )
    if (rejectedConsultationRequest.isErr) {
      return c.json(
        { message: 'Error accepting consultation request' },
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }

    const { start_time, end_time, patient_id, doctor_id, message } =
      rejectedConsultationRequest.value
    const patientProfile = await PatientRepository.findById(patient_id)

    if (patientProfile.isErr || patientProfile.value === null) {
      response = {
        code: 'UNEXPECTED_ERROR'
      }
      return c.json(response, StatusCodes.INTERNAL_SERVER_ERROR)
    }

    const current_date = new Date()

    await Mailer.send({
      email: (
        <ConsultationRejectedEmail
          doctorName={user.profiles.doctor!.first_name}
          patientName={patientProfile.value.first_name}
        />
      ),
      recipients: [patientProfile.value.email],
      subject: 'New Consultation Scheduled'
    })
    response = {
      code: 'CONSULTATION_REQUEST_REJECTED_SUCCESSFULLY'
    }
    return c.json(response, StatusCodes.ACCEPTED)
  }
)
