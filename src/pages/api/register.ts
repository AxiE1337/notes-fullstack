import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../prisma/prisma'
import { setCookies } from 'cookies-next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body

  if (req.method === 'POST') {
    const uId = Math.floor(Math.random() * (1000000 - 50) + 50)
    const newUser = await prisma.user.create({
      data: {
        id: uId,
        username: username,
        password: password,
        notes: {
          createMany: {
            data: {
              title: 'new title',
              content: 'new content',
            },
          },
        },
      },
      include: {
        notes: true,
      },
    })
    const { id } = newUser
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET as string)

    setCookies('jwt', token, { req, res, maxAge: 60 * 6 * 24 })

    return res.status(200).json({ token })
  }

  return res.status(404).end('Error')
}
