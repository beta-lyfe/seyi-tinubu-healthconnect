import type { schema } from '@beta-lyfe/api'
import type {
  User as DbUser,
  DoctorProfile,
  PatientProfile
} from '../database/schema'

// export type User = DbUser extends { role: 'doctor' }
//   ? {
//     data: DbUser
//     profiles: {
//       doctor: DoctorProfile
//     }
//   }
//   : {
//     data: DbUser
//     profiles: {
//       patient: PatientProfile
//     }
//   }

export type User = {
  data: DbUser
  profiles: {
    doctor?: DoctorProfile
    patient?: PatientProfile
  }
}
