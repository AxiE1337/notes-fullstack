import {
  TextField,
  IconButton,
  CircularProgress,
  LinearProgress,
} from '@mui/material'
import { LoadingButton as Button } from '@mui/lab'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'
import Moment from 'react-moment'
import ConfirmModal from './confirmModal'

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
  const [openModal, setOpenModal] = useState<boolean>(false)
  const isUpdated = note.createdAt.slice(0, 16) === note.updatedAt.slice(0, 16)

  const updateHandler = () => {
    if (titleValue.length > 2 && contentValue.length > 6) {
      updateNote(note.id, titleValue, contentValue)
      setEdit(false)
    }
  }

  const deleteHandler = () => {
    setOpenModal(true)
  }
  const confirmDelete = () => {
    deleteNote(note.id)
  }

  if (edit) {
    const isChanged = note.title === titleValue && note.content === contentValue
    return (
      <div className='flex flex-col gap-2 p-4 mt-4 bg-indigo-200 w-full shadow-xl'>
        <div className='flex flex-col'>
          <h1>Editing...</h1>
          <LinearProgress />
        </div>
        <TextField
          placeholder='Title'
          id='31231242'
          value={titleValue}
          onChange={(e: any) => setTitleValue(e.target.value)}
        />
        <TextField
          placeholder='Content'
          id='321312'
          value={contentValue
            .replace(/<(\/*)p[^>]*>/g, '')
            .replace(/<(\/*)br[^>]*>/g, '\n')}
          multiline
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
    <div className='flex flex-col gap-2 p-4 mt-4 bg-indigo-200 w-full shadow-xl dark:bg-slate-700'>
      <h1 className='text-3xl'>{note.title}</h1>
      <p
        className='break-words'
        dangerouslySetInnerHTML={{
          __html: '<p>' + note.content.replaceAll('\n', '<br>') + '</p>',
        }}
      />
      <p>
        {'Created at '} <Moment format='YYYY/MM/DD'>{note.createdAt}</Moment>
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
        <IconButton className='mt-3' color='error' onClick={deleteHandler}>
          {loadingState.deleteBtn ? (
            <CircularProgress color='inherit' size={15} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </div>
      <ConfirmModal
        openModal={openModal}
        setOpenModal={(isOpen: boolean) => setOpenModal(isOpen)}
        confirmDelete={confirmDelete}
      />
    </div>
  )
}
