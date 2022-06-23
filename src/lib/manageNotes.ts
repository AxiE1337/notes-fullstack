import axios from 'axios'

class manageNotes {
  async get() {
    try {
      const data = await axios.get('/api/notes', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const notes = data.data.notes
      return notes
    } catch (err) {
      console.error(err)
      return []
    }
  }
  async add(title: any, content: any) {
    try {
      const data = await axios('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          title: title,
          content: content,
        },
      })
      const notes = data.data.notes
      return notes
    } catch (err) {
      console.error(err)
    }
  }
  async delete(id: number) {
    try {
      const data = await axios.delete('/api/notes', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: id,
        },
      })
      const notes = data.data.notes
      return notes
    } catch (err) {
      console.error(err)
    }
  }
  async udpate(id: number, title: string, content: string) {
    try {
      const data = await axios.put('/api/notes', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: id,
          title: title,
          content: content,
        },
      })
      const notes = data.data.notes
      return notes
    } catch (err) {
      console.error(err)
    }
  }
}

export default new manageNotes()
