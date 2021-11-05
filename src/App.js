
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('library-user-token')
    if (!token && tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }, [token])

  const showError = (message) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { !token && <button onClick={() => setPage('login')}>login</button> }
        { token && <button onClick={logout}>logout</button> }
      </div>

      <div style={{ color: 'red'}}>
        {error}
      </div>

      <Authors
        show={page === 'authors'}
        setError={showError}
        authenticated={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={showError}
      />

      <LoginForm
        setToken={setToken}
        show={page === 'login'}
        setError={showError}
        setPage={setPage}
      />

    </div>
  )
}

export default App