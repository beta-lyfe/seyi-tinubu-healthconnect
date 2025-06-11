import DoctorRepository from '../../repository'
import type { Schema } from './schema'

export default async (payload: Schema) => DoctorRepository.findById(payload.id)
