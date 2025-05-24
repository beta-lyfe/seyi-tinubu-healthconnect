import { SignJWT,importPKCS8 } from 'jose'
import type { DoctorProfile, PatientProfile, User } from '../../database/schema'
import { config } from '../../config'

/**
 * Function generates a JaaS JWT.
 *
 */
const Jitsi=config.jitsi


const secret = await importPKCS8(Jitsi.privateKey,'RS256')
                .then(key=>key)

export const generateJitsiConsulationToken = (
  profile: PatientProfile | DoctorProfile
) => {
  const now = new Date()
  return new SignJWT({
    context: {
      user: {
        id: profile.id,
        name: `${profile.first_name} ${profile.last_name}`,
        avatar: profile.profile_picture?.url,
        email: profile.email,
        moderator: 'true'
      },
      features: {
        livestreaming: 'true',
        recording: 'true',
        transcription: 'true',
        'outbound-call': 'true'
      },
    },
    room: '*',
  })
    .setProtectedHeader({
      alg: 'RS256',
      kid: Jitsi.kidId,
      typ:'JWT'
    })
    .setAudience('jitsi')
    .setIssuer('chat')
    .setSubject(Jitsi.appId)
    .setExpirationTime("30m")
    .setNotBefore(Math.round(new Date().getTime() / 1000) - 10)
    .sign(secret)
  // { algorithm: 'RS256', header: { kid: kidId, alg: 'RS256' } }
}
