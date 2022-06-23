import { Button, TextInput } from '@mantine/core'
import React, { useState } from 'react'
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
  updateNote: (id: number, title: string, content: string) => void
}

export default function Note({ note, deleteNote, updateNote }: NoteTypes) {
  const [edit, setEdit] = useState<boolean>(false)
  const [titleValue, setTitleValue] = useState<string>(note.title)
  const [contentValue, setContentValue] = useState<string>(note.content)
  const isUpdated = note.createdAt.slice(0, 16) === note.updatedAt.slice(0, 16)

  const updateHandler = () => {
    if (titleValue.length > 2 && contentValue.length > 6) {
      updateNote(note.id, titleValue, contentValue)
      setEdit(false)
    }
  }

  if (edit) {
    return (
      <div className='flex flex-col gap-2 pl-10 p-4 mt-4 bg-zinc-300 w-full'>
        <h1>Editing</h1>
        <TextInput
          placeholder='Title'
          value={titleValue}
          onChange={(e: any) => setTitleValue(e.target.value)}
        />
        <TextInput
          placeholder='Content'
          value={contentValue}
          onChange={(e: any) => setContentValue(e.target.value)}
        />
        <Moment format='YYYY/MM/DD'>{note.createdAt}</Moment>
        <Button
          variant='subtle'
          color='dark'
          radius='xs'
          compact
          uppercase
          className='mt-3'
          onClick={updateHandler}
        >
          update
        </Button>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2 pl-10 p-4 mt-4 bg-zinc-300 w-full'>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <Moment format='YYYY/MM/DD'>{note.createdAt}</Moment>
      {!isUpdated && (
        <p className='text-xs'>
          updated{' '}
          <Moment fromNow ago>
            {note.updatedAt}
          </Moment>{' '}
          ago
        </p>
      )}
      <Button
        variant='subtle'
        color='red'
        radius='xs'
        compact
        uppercase
        className='mt-3'
        onClick={() => deleteNote(note.id)}
      >
        delete
      </Button>
      <Button
        variant='subtle'
        color='dark'
        radius='xs'
        compact
        className='mt-3'
        onClick={() => setEdit((prev) => !prev)}
      >
        edit
      </Button>
    </div>
  )
}
