import type { User } from '../../../../auth/types'
import Repository from '../../../repository'

export default async (user: User) => Repository.findByUserId(user.data.id)
