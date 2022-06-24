import { TextField, IconButton, CircularProgress } from '@mui/material'
import { LoadingButton as Button } from '@mui/lab'
import DeleteIcon from '@mui/icons-material/Delete'
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
  loadingState: {
    deleteBtn: boolean
    editBtn: boolean
  }
  deleteNote: (id: number) => void
  updateNote: (id: number, title: string, content: string) => void
}

export default function Note({
  note,
  deleteNote,
  updateNote,
  loadingState,
}: NoteTypes) {
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
    const isChanged = note.title === titleValue && note.content === contentValue
    return (
      <div className='flex flex-col gap-2 pl-10 p-4 mt-4 bg-zinc-300 w-full'>
        <h1>Editing</h1>
        <TextField
          placeholder='Title'
          value={titleValue}
          onChange={(e: any) => setTitleValue(e.target.value)}
        />
        <TextField
          placeholder='Content'
          value={contentValue}
          onChange={(e: any) => setContentValue(e.target.value)}
        />
        {!isChanged ? (
          <Button className='mt-3' onClick={updateHandler}>
            update
          </Button>
        ) : (
          <Button onClick={() => setEdit(false)}>Close</Button>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2 p-4 mt-4 bg-zinc-300 w-full'>
      <h1 className='text-3xl'>{note.title}</h1>
      <p className='break-words'>{note.content}</p>
      <p>
        {'Created '} <Moment format='YYYY/MM/DD'>{note.createdAt}</Moment>
      </p>
      {!isUpdated && (
        <p className='text-xs'>
          updated{' '}
          <Moment fromNow ago>
            {note.updatedAt}
          </Moment>{' '}
          ago
        </p>
      )}
      <div className='ml-auto'>
        <Button
          className='mt-3'
          loading={loadingState.editBtn}
          onClick={() => setEdit((prev) => !prev)}
        >
          edit
        </Button>
        <IconButton
          className='mt-3'
          color='error'
          onClick={() => deleteNote(note.id)}
        >
          {loadingState.deleteBtn ? (
            <CircularProgress color='inherit' size={15} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </div>
    </div>
  )
}
