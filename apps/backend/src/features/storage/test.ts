import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Storage } from '.'
import type { Media } from '../database/schema'

describe('StorageService', () => {
  let uploadedMedia: Media
  const imageBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
  const image = Buffer.from(imageBase64, 'base64')
  const file = new File([image], 'test.png', { type: 'image/png' })

  it('should upload a file', async () => {
    const result = await Storage.service.upload(file)

    assert(result.isErr === false, 'Failed to upload file')

    uploadedMedia = result.value
  })

  it('should remove a file', async () => {
    const result = await Storage.service.remove(uploadedMedia.public_id)

    assert(result.isErr === false, 'Failed to remove file')
  })
})
