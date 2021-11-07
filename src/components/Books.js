import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  const [filterBooks, {loading, data }] = useLazyQuery(ALL_BOOKS)

  const [selectedBooks, setSelectedBooks] = useState([])
  const [category, setCategory] = useState(null)

  console.log('books', data)

  useEffect(() => {
    filterBooks({ variables: { genre: category } })
    setSelectedBooks(data?.allBooks)
  }, [data, category])

  if (loading || result.loading) {
    return (
      <div>loading...</div>
    )
  }
  const genres = result.data.allBooks.reduce((a, book) => {
    for (const genre of book.genres) {
      a[genre] = true
    }
    return a
  }, {})

  // const selectCategory = (category) => {
  //   // const booksOfGenre = books.filter(book => book.genres.includes(genre))
  //   // setSelectedBooks(booksOfGenre)
  //   // filterBooks({ variables: { genre: 'crime' } })
  //   setCategory(category)
  //   // filterBooks({ variables: { genre: category } })
  // }


  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{category ?? 'all'}</strong></p>
     

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
          {selectedBooks?.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setCategory(null)}>all</button>
      {Object.keys(genres).map(genre =>
        <button
          onClick={() => setCategory(genre)}
          key={genre}>
          {genre}
        </button>)}
    </div>
  )
}

export default Books