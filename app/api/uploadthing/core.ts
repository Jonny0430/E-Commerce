import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const token = await getServerSession(authOptions)
      if (!token) {
        throw new UploadThingError('Unauthorized')
      }
      return { token }
    })
    .onUploadComplete(async ({ file }) => {
      // Return the necessary properties as JsonObject
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        customId: file.customId, // Only return relevant properties
        key: file.key,
        // You can add more properties here depending on what you need
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
