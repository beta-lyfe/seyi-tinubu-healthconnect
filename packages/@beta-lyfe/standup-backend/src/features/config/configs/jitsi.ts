import { env } from '../env'

const JitsiConfig = {
  appId: env.JITSI_APP_ID,
  kidId: env.JITSI_KID_ID,
  privateKey: env.JITSI_PRIVATE_KEY
}

export default JitsiConfig
