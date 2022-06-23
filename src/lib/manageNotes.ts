import axios from 'axios'

class manageNotes {
  loading = true

  async get(jwt: string) {
    if (!jwt) {
      return []
    }
    try {
      const data = await axios.get('/api/notes', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      })
      const notes = data.data.notes
      return notes
    } catch (err) {
      console.error(err)
    }
  }
  async add(title: any, content: any, jwt: string) {
    if (!jwt) {
      return []
    }
    try {
      const data = await axios('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
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
  async delete(id: number, jwt: string) {
    if (!jwt) {
      return []
    }
    try {
      const data = await axios.delete('/api/notes', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
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
}

export default new manageNotes()
