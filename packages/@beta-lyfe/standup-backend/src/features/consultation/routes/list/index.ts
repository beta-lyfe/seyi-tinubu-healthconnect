import { Hono } from 'hono'
import { db } from '../../../database'
import ConsultationRepository from '../../repository'
import { AuthMiddleware } from '../../../auth'
import { StatusCodes } from 'http-status-codes'
import { Pagination } from '../../../pagination'
import middleware from './middleware'
import type { Consultation, User } from '../../../database/schema'

export default new Hono().get(
  '/',
  AuthMiddleware.middleware,
  middleware,
  async (c) => {
    const user = c.get('user')
    const options = c.req.valid('query')
    const { items, count } =
      await ConsultationRepository.findManyConsultationsWithCount(
        user.data.role==='doctor' ?  user.
        profiles.doctor!.id : user.profiles.patient!.id,
        options
      )

      const publicItems =items.map(item=>toConsultationPublic(item,user.data.role))
    return c.json(
      Pagination.paginate(publicItems, {
        ...options,
        total: count
      }),
      StatusCodes.OK
    )
  }
)

const toConsultationPublic=(consultation:Consultation,role:User['role'])=>{
  const {doctor_token,patient_token,...rest} =consultation
  const token=role==='doctor' ? doctor_token : patient_token
  return {...rest,token}
}
