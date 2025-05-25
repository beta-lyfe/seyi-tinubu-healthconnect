import type { User } from '../../../../auth/types'
import PatientRepository from '../../../repository'

export default async (user: User) =>
  PatientRepository.findByUserId(user.data.id)
