import { env } from '../env'

const MediaServerConfig = {
  url: env.MEDIA_SERVER_URL,
  type: env.MEDIA_SERVER_TYPE,
  folder: env.MEDIA_SERVER_FOLDER,
  uploadPreset: env.MEDIA_SERVER_UPLOAD_PRESET
}

export default MediaServerConfig
