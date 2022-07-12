import type { NextPage } from 'next'
import Head from 'next/head'
import { CircularProgress } from '@mui/material'
import { LoadingButton as Button } from '@mui/lab'
import { useState } from 'react'
import { CustomTextField } from '../ui/customTextField'
import Note from '../components/note'
import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const [inputTitle, setInputTitle] = useState<string>('')
  const [inputContent, setInputContent] = useState<string>('')
  const router = useRouter()
  const utils = trpc.useContext()
  const notes = trpc.useQuery(['notes.get'])
  const isAuth = trpc.useQuery(['auth.get'])
  const addNote = trpc.useMutation(['notes.add'], {
    onSuccess() {
      utils.invalidateQueries('notes.get')
    },
  })
  const deleteNote = trpc.useMutation(['notes.delete'], {
    onSuccess() {
      utils.invalidateQueries('notes.get')
    },
  })
  const updateNote = trpc.useMutation(['notes.update'], {
    onSuccess() {
      utils.invalidateQueries('notes.get')
    },
  })

  const addHandler = async () => {
    const maxLength = inputTitle.length > 15
    if (inputTitle.length > 1 && !maxLength && inputContent.length > 5) {
      addNote.mutateAsync({ title: inputTitle, content: inputContent })
      setInputTitle('')
      setInputContent('')
    }
  }

  const deleteNoteHandler = async (id: number) => {
    deleteNote.mutateAsync({ id: id })
  }

  const updateNoteHandler = async (
    id: number,
    title: string,
    content: string
  ) => {
    updateNote.mutateAsync({ id: id, title: title, content })
  }

  const loading = (
    <div className='flex h-screen items-center justify-center dark:bg-slate-800'>
      <CircularProgress />
    </div>
  )

  if (notes.isLoading) {
    return loading
  }
  if (!isAuth.data?.isAuthenticated) {
    router.push('/auth/login')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-gray-700 dark:bg-slate-800 dark:text-gray-300'>
      <Head>
        <title>Notes</title>
        <meta name='description' content='Notes app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-3xl font-bold mt-2'>Notes</h1>

      <div className='flex flex-col items-center justify-center mt-4 min-h-1/2 w-1/2 md:w-4/5 dark:bg-slate-600'>
        <form className='flex flex-col w-full gap-2 p-2 border dark:border-0'>
          <CustomTextField
            variant='standard'
            label='Title'
            value={inputTitle}
            onChange={(e: any) => setInputTitle(e.target.value)}
          />
          <CustomTextField
            variant='standard'
            label='Content'
            multiline
            value={inputContent}
            onChange={(e: any) => setInputContent(e.target.value)}
          />
          <Button
            sx={{
              color: 'inherit',
            }}
            className='mt-3'
            loading={addNote.isLoading}
            onClick={addHandler}
            disabled={
              !isAuth?.data?.isAuthenticated ||
              deleteNote.isLoading ||
              updateNote.isLoading
            }
          >
            add
          </Button>
        </form>
        <div className='flex flex-col items-start justify-start w-full'>
          {notes.data
            ?.sort((a: any, b: any) => b.id - a.id)
            .map((note: any) => (
              <Note
                key={note.id}
                note={note}
                loadingState={{
                  editBtn: updateNote.isLoading,
                  deleteBtn: deleteNote.isLoading,
                }}
                deleteNote={(noteId) => deleteNoteHandler(noteId)}
                updateNote={(noteId, title, content) =>
                  updateNoteHandler(noteId, title, content)
                }
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
