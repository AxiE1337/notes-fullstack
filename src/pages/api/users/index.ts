import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../../prisma/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = req.headers.cookie?.slice(4)

  jwt.verify(authorization as string, process.env.JWT_SECRET as string)

  const decodedToken = jwt.decode(authorization as string) as {
    [key: string]: string
  }

  if (req.method === 'GET' && decodedToken) {
    const user = await prisma.user.findFirst({
      where: { id: Number(decodedToken.id) },
    })
    return res.status(200).json({ username: user?.username })
  }

  if (req.method === 'DELETE' && decodedToken) {
    await prisma.note.deleteMany({
      where: { userId: Number(decodedToken.id) },
    })
    await prisma.user.delete({
      where: {
        id: Number(decodedToken.id),
      },
    })
    return res.status(200).json({ message: 'user deleted' })
  }

  return res.status(400).json({ status: 'error' })
}
