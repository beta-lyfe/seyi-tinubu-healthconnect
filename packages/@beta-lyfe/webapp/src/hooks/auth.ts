import type { schema } from '@beta-lyfe/api'
import { proxy, useSnapshot } from 'valtio'

type Doctor = schema.components['schemas']['Api.Doctor.Doctor']
type Patient = schema.components['schemas']['Api.Patient.Patient']

type UserDoctor = {
  type: 'doctor'
  data: Doctor
}

type UserPatient = {
  type: 'patient'
  data: Patient
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

export type Auth = { update: (_auth: Auth) => void } & (
  | UnauthenticatedAuth
  | AuthenticatingAuth
  | AuthenticatedAuth
)

const auth = proxy<Auth>({
  status: 'unauthenticated',
  update: (_auth) => {
    auth.status = _auth.status
    if (_auth.status === 'authenticated') {
      ;(auth as AuthenticatedAuth).data = _auth.data
    }
  }
})

export const useAuth = ()=>useSnapshot(auth)
