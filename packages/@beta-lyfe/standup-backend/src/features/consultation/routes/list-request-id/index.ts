import { Hono } from 'hono'
import ConsultationRepository from '../../repository'
import { AuthMiddleware } from '../../../auth'
import { StatusCodes } from 'http-status-codes'
import type { schema } from '@beta-lyfe/api'


export type Response =
  schema.paths['/api/consultation/request/{id}']['get']['responses'][keyof schema.paths['/api/auth/sign-in']['post']['responses']]['content']['application/json']



export default new Hono().get(
  '/request/:id',
  AuthMiddleware.middleware,
  async (c) => {
    const user = c.get('user')
    const { id } = c.req.param()
    let response:Response
    const result =
      await ConsultationRepository.findOneConsultationRequestWithCount(
        user.data.role==='doctor' ?  user.profiles.doctor!.id : user.profiles.patient!.id,
        id
      )

    return c.json(result, StatusCodes.OK)
  }
)
