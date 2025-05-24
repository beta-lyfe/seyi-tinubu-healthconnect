import { schemas } from '@beta-lyfe/api/zod'
import { proxy, useSnapshot } from 'valtio'
import { z } from 'zod'

export namespace Schema {
  const doctorProfile = schemas.Api_Doctor_DoctorProfile

  export type DoctorProfile = z.infer<typeof doctorProfile>

  const patientProfile = schemas.Api_Patient_PatientProfile 

  export type PatientProfile = z.infer<typeof patientProfile>

  const user = z.object({
    data: schemas.Api_Authentication_Profile_response_Success.shape.data,
    profiles: z.object({
      doctor: doctorProfile,
      patient: patientProfile
    }).partial()
})

  export type User = z.infer<typeof user>

  const authToken = z.object({
    access_token: z.string(),
    refresh_token: z.string()
  })

  export type AuthToken = z.infer<typeof authToken>

  const unauthenticatedAuthState = z.object({
    status: z.literal('unauthenticated')
  })

  export type UnauthenticatedAuthState = z.infer<typeof unauthenticatedAuthState>

  const authenticatingAuthState = z.object({
    status: z.literal('authenticating')
  })

  export type AuthenticatingAuthState = z.infer<typeof authenticatingAuthState>
  
  const authenticatedAuthState = z.object({
    status: z.literal('authenticated'),
    data: z.object({
      user: user,
      token: authToken
    })
  })

  export type AuthenticatedAuthState = z.infer<typeof authenticatedAuthState>

  export const authState = z.union([
    unauthenticatedAuthState,
    authenticatingAuthState,
    authenticatedAuthState
  ])

  export type AuthState = z.infer<typeof authState>
}

type UpdateFn = (state: Schema.AuthState) => void
export type Auth = { update: UpdateFn, data: Schema.AuthState }

export const auth = proxy<Auth>({
  data: {
    status: 'unauthenticated',
  },
  update: (state) => {
    auth.data = state
    persistState()
  }
})

const KEY = 'auth'

function initiateState ()  {
  let persistedState = localStorage.getItem(KEY)
  if(!persistedState?.startsWith("{")){
    persistedState='{}'
  }

  const parsingResult = Schema.authState.safeParse(JSON.parse(persistedState ?? '{}'))

  let authState: Schema.AuthState
  console.log("sucess")

  if (!parsingResult.success) {
    authState = {
      status: 'unauthenticated'
    }
  }
  else {
    authState = parsingResult.data
  }

  auth.update(authState)
}

initiateState()

function persistState ()  {
  localStorage.setItem(KEY, JSON.stringify(auth.data))
}

export function useAuth(): { update: UpdateFn, data: Schema.AuthState };
export function useAuth(authenticated: true): { update: UpdateFn, data: Schema.AuthenticatedAuthState };

export function useAuth (authenticated?: true) {
  const _auth = useSnapshot(auth, { sync: true })
  if (authenticated) {
  if (_auth.data.status === 'authenticated') {
    return _auth
  }

  throw new Error('Not authenticated')
}

return _auth
}