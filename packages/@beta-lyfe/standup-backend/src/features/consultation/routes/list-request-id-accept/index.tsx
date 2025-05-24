import { Hono } from 'hono'
import { AuthMiddleware } from '../../../auth'
import Repository from '../../repository'
import { StatusCodes } from 'http-status-codes'
import DoctorMiddleware from '../../../doctor/middleware'
import { generateJitsiConsulationToken } from '../../utils/tokenservice'
import ConsultationRepository from '../../repository'
import { Mailer } from '../../../mailer/lib'
import { PatientRepository } from '../../../patient'
import DoctorConsultationEmail from '../../email/doctorconsultation'
import {PatientConsultationEmail} from '../../email/patientconsultation'

import type { schema } from '@beta-lyfe/api'


export type Response =
  schema.paths['/api/consultation/request/{id}/accept']['post']['responses'][keyof schema.paths['/api/auth/sign-in']['post']['responses']]['content']['application/json']



export default new Hono().post(
  '/request/:id/accept',
  AuthMiddleware.middleware,
  DoctorMiddleware.middleware,
  async (c) => {
    const { id } = c.req.param()
    const user = c.get('user')
    let response:Response

    const acceptedConsultationRequest =
      await Repository.UpdateStatusConsultationRequest(user.profiles.doctor!.id, id,'approved')
    if (acceptedConsultationRequest.isErr) {
      response={
        code :'UNEXPECTED_ERROR'
      }
      return c.json(
        response,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }



    const { start_time, end_time, patient_id, doctor_id, message } =acceptedConsultationRequest.value
    const patientProfile = await PatientRepository.findById(patient_id)

    if (
      patientProfile.isErr ||
      patientProfile.value === null
    ) {
      return c.json(
        { message: 'Error fetching patient or doctor profile' },
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }
    

     const patient_token = await generateJitsiConsulationToken(
          patientProfile.value
        )
        const doctor_token = await generateJitsiConsulationToken(
          user.profiles.doctor!
        )
    
        const consultation = await ConsultationRepository.createConsultation({
          doctor_id,
          patient_id,
          start_time,
          end_time,
          doctor_token,
          patient_token
        })
    
        if (consultation.isErr) {
          response={
            code:"UNEXPECTED_ERROR"
          }
          return c.json(
             response,
            StatusCodes.INTERNAL_SERVER_ERROR
          )
        }
    
        
        console.log("doctor",doctor_token)
        console.log("patient",patient_token)
        const current_date=new Date()
        const roomname=`bl_${consultation.value.id}`
    
        Mailer.send({
          email:<DoctorConsultationEmail
          doctorName="Dr. Chidera M."
          patientName="Yuret Asai"
          date="April 25, 2025"
          time="3:00 PM"
          type="General Checkup"
          mode="Video"
          roomname={roomname}
          token={doctor_token}
        />,
          recipients:[user.profiles.doctor!.email],
          subject:"New Consultation Scheduled"
        })
    
        Mailer.send({
          email:<PatientConsultationEmail
          doctorName={`${user.profiles.doctor!.first_name} ${user.profiles.doctor!.last_name}`}
          patientName={`${patientProfile.value.first_name} ${patientProfile.value.last_name}`}
          date={current_date.toISOString()}
          time={`${current_date.getHours} pm`}
          type="General Checkup"
          mode="Video"
          roomname={roomname}
          token={patient_token}
        />,
          recipients:[patientProfile.value.email],
          subject:"New Consultation Scheduled"
        })

        response={
          code :'CONSULTATION_REQUEST_ACCEPTED_SUCCESSFULLY'
        }
    
    return c.json(response)
  }
)
