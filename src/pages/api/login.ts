import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookies } from 'cookies-next'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../prisma/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body

  if (req.method !== 'POST' && !req.body) {
    return res.status(404).end('Error')
  }

  const user = await prisma.user.findFirst({
    where: { username, password } as object,
  })

  if (!!user) {
    const { id } = user
    const jwtoken = jwt.sign({ id, username }, process.env.JWT_SECRET as string)

    setCookies('jwt', jwtoken, { req, res, maxAge: 60 * 6 * 24 })

    return res.status(200).json({
      token: jwtoken,
    })
  }

  return res.status(300).json({ unauthorized: true })
}
