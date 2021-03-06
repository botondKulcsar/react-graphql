import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`


export const ALL_BOOKS = gql`
    query filterBooks($genre: String, $author: String) {
        allBooks(genre: $genre, author: $author) {
            title
            author {
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`

export const ME = gql`
    query {
        me {
            username
            favoriteGenre
            id
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name, 
            setBornTo: $setBornTo
            ) {
            name
            born
            bookCount
            id
        }

    }
`
export const LOGIN = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(
            username: $username, 
            password: $password
            ) {
             value   
        }
    }
`