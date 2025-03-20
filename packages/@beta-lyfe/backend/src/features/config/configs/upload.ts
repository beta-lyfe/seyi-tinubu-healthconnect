import { env } from '../env'

const UploadConfig = {
  allowedMimetypes: ['image/png', 'image/jpeg', 'image/jpg'],
  path: 'public/uploads',
  maxFieldSize: 25 * 1024 * 1024,
  maxUploadSize: 10 * 1024 * 1024,
  cloudinary: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET
  }
}

export default UploadConfig
