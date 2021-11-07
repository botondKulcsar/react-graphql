import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = ({ show }) => {
    const { loading, data, refetch } = useQuery(ME)
   
    const [filterBooks, result] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (!data || !data?.me || !data?.me?.favoriteGenre) {
            refetch()
            console.log('data: ', data)
        }
        if (show) {
            filterBooks({ variables: { genre: data?.me?.favoriteGenre } })
            console.log('filterBooks run')
        }

    }, [data, show]) //eslint-disable-line
    

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
            <p>books in your favorite genre <strong>{data?.me?.favoriteGenre}</strong></p>
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
                    {result?.data?.allBooks.map(a =>
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