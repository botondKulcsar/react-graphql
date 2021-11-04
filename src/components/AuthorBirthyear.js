import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const AuthorBirthyear = ({ setError, authors }) => {
    const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            setError(error.message.includes('400')
                ? 'Invalid input'
                : error.message
            )
        }
    })

    const [born, setBorn] = useState('')
    const [name, setName] = useState(authors[0]?.name)

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
            setError('author not found')
        }
    }, [result.data]) //eslint-disable-line

    const updateBirthyear = (event) => {
        event.preventDefault()
        updateAuthor({ variables: { name, setBornTo: born } })

        setBorn('')
        setName('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={updateBirthyear}>
                <div>author
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    >
                    {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                    </select>
                </div>
                <div>
                    born <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(+target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default AuthorBirthyear