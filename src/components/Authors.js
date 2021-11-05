  
import React from 'react'
import { useQuery } from '@apollo/client'

import AuthorForm from './AuthorForm'

import { ALL_AUTHORS } from '../queries'

const Authors = ({ show, setError, authenticated }) => {
  const { loading, data: { allAuthors: authors } = {} } = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (loading) {
    return(
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      { authenticated && <AuthorForm setError={setError} authors={authors}/> }
    </div>
  )
}

export default Authors
