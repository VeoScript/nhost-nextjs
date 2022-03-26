import { NhostClient } from '@nhost/nhost-js'

export const nhost = new NhostClient({
  backendUrl: `${process.env.BACKEND_URL}`
})