
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)

  const showError = (message) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <div style={{ color: 'red'}}>
        {error}
      </div>

      <Authors
        show={page === 'authors'}
        setError={showError}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={showError}
      />

    </div>
  )
}

export default App