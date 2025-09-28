import Repository from '../../repository'
import type { Schema } from './schema'

export default async (payload: Schema) => Repository.findById(payload.id)
