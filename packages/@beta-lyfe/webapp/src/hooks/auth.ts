import type { schema } from '@beta-lyfe/api'
import { proxy, useSnapshot } from 'valtio'

type DoctorProfile = schema.components['schemas']['Api.Doctor.DoctorProfile']
type PatientProfile = schema.components['schemas']['Api.Patient.PatientProfile']

type UserDoctor = {
  role: 'doctor'
  data: DoctorProfile
}

type UserPatient = {
  role: 'patient'
  data: PatientProfile
}

type AuthToken = {
  access_token: string
  refresh_token: string
}

type UnauthenticatedAuth = {
  status: 'unauthenticated'
}

type AuthenticatingAuth = {
  status: 'authenticating'
}

export type AuthenticatedAuth = {
  status: 'authenticated'
  data: {
    user: UserDoctor | UserPatient
    token: AuthToken
  }
}

export type AuthStates =
  | UnauthenticatedAuth
  | AuthenticatingAuth
  | AuthenticatedAuth

export type Auth = { update: (_auth: AuthStates) => void } & AuthStates

const auth = proxy<Auth>({
  status: 'unauthenticated',
  update: (_auth) => {
    auth.status = _auth.status
    if (_auth.status === 'authenticated') {
      ; (auth as AuthenticatedAuth).data = _auth.data
    }
  }
})

export const useAuth = () => useSnapshot(auth)
