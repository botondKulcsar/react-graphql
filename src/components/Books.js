import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const { loading, data: { allBooks: books } = {} } = useQuery(ALL_BOOKS)

  const [selectedBooks, setSelectedBooks] = useState([])
  const [category, setCategory] = useState('all genres')

  useEffect(() => {
    setSelectedBooks(books)
  }, [books])

  if (loading) {
    return (
      <div>loading...</div>
    )
  }
  const genres = books.reduce((a, book) => {
    for (const genre of book.genres) {
      a[genre] = true
    }
    return a
  }, {})

  const selectCategory = (genre) => {
    const booksOfGenre = books.filter(book => book.genres.includes(genre))
    setSelectedBooks(booksOfGenre)
    setCategory(genre)
  }


  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{category}</strong></p>
     

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {selectedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setSelectedBooks(books)}>all</button>
      {Object.keys(genres).map(genre =>
        <button
          onClick={() => selectCategory(genre)}
          key={genre}>
          {genre}
        </button>)}
    </div>
  )
}

export default Books