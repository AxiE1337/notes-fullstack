import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../../prisma/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let authorization = req.headers.authorization || null

  const decodedToken = jwt.decode(authorization?.split(' ')[1] as string) as {
    [key: string]: string
  }

  if (req.method === 'GET' && decodedToken) {
    const user = await prisma.user.findFirst({
      where: { id: Number(decodedToken.id) },
    })
    return res.status(200).json({ username: user?.username })
  }
  return res.status(200).json({ status: 'error' })
}
