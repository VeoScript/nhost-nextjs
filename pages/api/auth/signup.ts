// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { nhost } from '../../../utils/Nhost'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const signUpResponse = await nhost.auth.signUp({
    email: req.body.email,
    password: req.body.password
  })

  if (signUpResponse.error) {
    return res
      .status(401)
      .json({
        message: signUpResponse.error
      })
  }

  res.status(200).json(signUpResponse)
}
