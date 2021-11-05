import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const LoginForm = ({ show, setToken, setError, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [ loginUser, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) //eslint-disable-line

    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser({ variables: { username, password } })
        setUsername('')
        setPassword('')
        setPage('books')
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username <input
                        type="text"
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        type="password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm