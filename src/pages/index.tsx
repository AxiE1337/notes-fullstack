import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Loader, Textarea, TextInput } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/userstore'
import manageNotes from '../lib/manageNotes'
import Note from '../components/note'

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [notes, setNotes] = useState<any>([])
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const inputRefTitle = useRef<any>()
  const inputRefContent = useRef<any>()

  const loading = (
    <div className='flex h-screen items-center justify-center'>
      <Loader color='green' />
    </div>
  )

  const fetch = async () => {
    const data = await manageNotes.get()
    setNotes(data)
    setIsLoading(false)
  }

  const addHandler = async () => {
    if (
      inputRefTitle.current.value.length > 1 &&
      inputRefContent.current.value.length > 5
    ) {
      const data = await manageNotes.add(
        inputRefTitle.current.value,
        inputRefContent.current.value
      )
      setNotes(data)
      inputRefTitle.current.value = ''
      inputRefContent.current.value = ''
    }
  }

  const deleteNote = async (id: number) => {
    const data = await manageNotes.delete(id)
    setNotes(data)
  }

  const updateNote = async (id: number, title: string, content: string) => {
    const data = await manageNotes.udpate(id, title, content)
    setNotes(data)
  }

  useEffect(() => {
    return () => {
      fetch()
    }
  }, [])

  if (isLoading) {
    return loading
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Head>
        <title>Notes</title>
        <meta name='description' content='Notes app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-3xl font-bold'>Notes</h1>

      <div className='flex flex-col items-center justify-center mt-4 min-h-1/2 w-1/2 border'>
        <TextInput
          placeholder='text...'
          label='Title'
          radius='xs'
          ref={inputRefTitle}
        />
        <Textarea label='Content' ref={inputRefContent} />
        <Button
          variant='subtle'
          color='dark'
          radius='xs'
          compact
          uppercase
          className='mt-3'
          onClick={addHandler}
          disabled={!isLoggedIn}
        >
          add
        </Button>
        <div className='flex flex-col items-start justify-start w-full'>
          {notes.map((note: any) => (
            <Note
              key={note.id}
              note={note}
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
