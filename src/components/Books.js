import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const { loading, data: { allBooks: books } = {} } = useQuery(ALL_BOOKS)
  // const result = useQuery(ALL_BOOKS)

  // console.log('result: ', result)

  if (loading) {
    return(
      <div>loading...</div>
    )
  }

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>

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
          { books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books