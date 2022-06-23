import { Button } from '@mantine/core'
import React from 'react'
import Moment from 'react-moment'

interface NoteTypes {
  note: {
    content: string
    createdAt: string
    id: number
    title: string
    updatedAt: string
    userId: number
  }
  deleteNote: (id: number) => void
}

export default function Note({ note, deleteNote }: NoteTypes) {
  const isUpdated = note.createdAt.slice(0, 16) === note.updatedAt.slice(0, 16)

  return (
    <div className='flex flex-col gap-2 pl-10 p-4 mt-4 bg-zinc-300 w-full'>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <Moment format='YYYY/MM/DD'>{note.createdAt}</Moment>
      {!isUpdated && (
        <>
          <p className='text-xs'>updated</p>
          <Moment fromNow ago>
            {note.updatedAt}
          </Moment>
        </>
      )}
      <Button
        variant='subtle'
        color='dark'
        radius='xs'
        compact
        uppercase
        className='mt-3'
        onClick={() => deleteNote(note.id)}
      >
        delete
      </Button>
    </div>
  )
}
