import type { NextPage } from 'next'
import Head from 'next/head'
import { TextField, CircularProgress } from '@mui/material'
import { LoadingButton as Button } from '@mui/lab'
import { useEffect, useState } from 'react'
import { useStore } from '../store/userstore'
import manageNotes from '../lib/manageNotes'
import Note from '../components/note'

interface LoadingState {
  isLoading: boolean
  addBtn: boolean
  editBtn: boolean
  deleteBtn: boolean
}

const Home: NextPage = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    editBtn: false,
    addBtn: false,
    deleteBtn: false,
  })
  const [notes, setNotes] = useState<any[]>([])
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const [inputTitle, setInputTitle] = useState<string>('')
  const [inputContent, setInputContent] = useState<string>('')

  const loading = (
    <div className='flex h-screen items-center justify-center'>
      <CircularProgress />
    </div>
  )

  const fetch = async () => {
    const data = await manageNotes.get()
    setNotes(data)
    setLoadingState({ ...loadingState, isLoading: false })
  }

  const addHandler = async () => {
    const maxLength = inputTitle.length > 15
    if (inputTitle.length > 1 && !maxLength && inputContent.length > 5) {
      setLoadingState({ ...loadingState, addBtn: true })
      const data = await manageNotes.add(inputTitle, inputContent)
      setNotes(data)
      setInputTitle('')
      setInputContent('')
      setLoadingState({ ...loadingState, addBtn: false })
    }
  }

  const deleteNote = async (id: number) => {
    setLoadingState({ ...loadingState, deleteBtn: true })
    const data = await manageNotes.delete(id)
    setNotes(data)
    setLoadingState({ ...loadingState, deleteBtn: false })
  }

  const updateNote = async (id: number, title: string, content: string) => {
    setLoadingState({ ...loadingState, editBtn: true })
    const data = await manageNotes.udpate(id, title, content)
    setNotes(data)
    setLoadingState({ ...loadingState, editBtn: false })
  }

  useEffect(() => {
    fetch()
  }, [])

  if (loadingState.isLoading) {
    return loading
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen dark:bg-slate-800 dark:text-gray-300'>
      <Head>
        <title>Notes</title>
        <meta name='description' content='Notes app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-3xl font-bold mt-2'>Notes</h1>

      <div className='flex flex-col items-center justify-center mt-4 min-h-1/2 w-1/2 md:w-4/5 dark:bg-slate-600'>
        <form className='flex flex-col w-full gap-2 p-2 border'>
          <TextField
            variant='standard'
            label='Title'
            value={inputTitle}
            onChange={(e: any) => setInputTitle(e.target.value)}
          />
          <TextField
            variant='standard'
            label='Content'
            multiline
            value={inputContent}
            onChange={(e: any) => setInputContent(e.target.value)}
          />
          <Button
            className='mt-3'
            loading={loadingState.addBtn}
            onClick={addHandler}
            disabled={
              !isLoggedIn || loadingState.deleteBtn || loadingState.editBtn
            }
          >
            add
          </Button>
        </form>
        <div className='flex flex-col items-start justify-start w-full'>
          {notes
            .sort((a: any, b: any) => b.id - a.id)
            .map((note: any) => (
              <Note
                key={note.id}
                note={note}
                loadingState={{
                  editBtn: loadingState.editBtn,
                  deleteBtn: loadingState.deleteBtn,
                }}
                deleteNote={(noteId) => deleteNote(noteId)}
                updateNote={(noteId, title, content) =>
                  updateNote(noteId, title, content)
                }
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
