import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../../prisma/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let authorization = req.headers.cookie?.slice(4)
  const { title, content, id } = req.body

  jwt.verify(authorization as string, process.env.JWT_SECRET as string)

  const decodedToken = jwt.decode(authorization as string) as {
    [key: string]: string
  }

  if (req.method === 'GET' && decodedToken) {
    const notes = await prisma.note.findMany({
      where: { userId: Number(decodedToken.id) },
    })
    return res.status(200).json({ notes })
  }

  if (req.method === 'POST' && decodedToken) {
    await prisma.note.create({
      data: {
        title: title,
        content: content,
        userId: Number(decodedToken.id),
      },
    })
    const notes = await prisma.note.findMany({
      where: { userId: Number(decodedToken.id) },
    })
    return res.status(200).json({ notes })
  }

  if (req.method === 'DELETE' && decodedToken) {
    await prisma.note.delete({
      where: { id: id },
    })
    const notes = await prisma.note.findMany({
      where: { userId: Number(decodedToken.id) },
    })
    return res.status(200).json({ notes })
  }

  if (req.method === 'PUT' && decodedToken) {
    const { title, content, id } = req.body.data
    await prisma.note.update({
      where: { id: id },
      data: {
        title: title,
        content: content,
      },
    })

    const notes = await prisma.note.findMany({
      where: { userId: Number(decodedToken.id) },
    })
    return res.status(200).json({ notes })
  }

  return res.status(400).end('Error')
}
