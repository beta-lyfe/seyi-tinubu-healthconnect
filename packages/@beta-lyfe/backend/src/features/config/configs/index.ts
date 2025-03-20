import DatabaseConfig from './database'
import EnvironmentConfig from './environment'
import MailConfig from './mail'
import ServerConfig from './server'
import UploadConfig from './upload'
import MediaServerConfig from './media-server'

export default {
  db: DatabaseConfig,
  environment: EnvironmentConfig,
  mail: MailConfig,
  upload: UploadConfig,
  server: ServerConfig,
  mediaServer: MediaServerConfig
}
