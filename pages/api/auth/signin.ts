// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { nhost } from '../../../utils/Nhost'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const signInResponse = await nhost.auth.signIn({
    email: req.body.email,
    password: req.body.password
  })

  if (signInResponse.error) {
    return res
      .status(401)
      .json({
        message: signInResponse.error
      })
  }

  res.status(200).json(signInResponse)
}
