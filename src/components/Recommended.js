import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = ({ show }) => {
    const { loading, data } = useQuery(ME)
    const [genre, setGenre] = useState(null)
    
    // const { data: { allBooks: books } = {} } = useQuery(ALL_BOOKS, { variables: { genre } })
    const result = useQuery(ALL_BOOKS, { variables: { genre } })
    
    useEffect(() => {
       
        setGenre(data?.me?.favoriteGenre)
    }, [result.data]) //eslint-disable-line
    
    if (!show) {
        return null
    }

    if (loading || result.loading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <strong>{genre}</strong></p>
            <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
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

export default Recommended