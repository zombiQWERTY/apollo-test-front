import gql from 'graphql-tag'

export const GET_AUTHORIZED = gql`
  query Auth {
    authorized @client
  }
`

export const getAuthors = gql`
  query($offset: Int, $limit: Int) {
    authors(offset: $offset, limit: $limit) {
      authors { 
        id
        firstName
        lastName
        biography
        bookCount
      },
      count
    }
  }
`

export const getBooks = gql`
  query($offset: Int, $limit: Int) {
    books(offset: $offset, limit: $limit) {
      books {
        id
        author
        name
        postDate
        description
        authorInfo {
          id
          firstName
          lastName
          biography
        }
      },
    count
    }
  }
`;

export const getBooksByAuthor = gql`
  query getBooksByAuthor($id: ID!) {
    booksByAuthor(id: $id) {
      id
      author
      name
      postDate
      description
    }
  }
`

export const getAuthorById = gql`
  query($id: ID!) {
    author(id: $id) {
      id
      lastName
      firstName
      biography
      bookCount
    }
  }
`

export const getBookById = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      author
      name
      postDate
      description
      authorInfo {
        id
        firstName
        lastName
      }
    }
  }
`

export const getCommentByBookId = gql`
  query($bookId: ID!, $offset: Int, $limit: Int) {
    comments(bookId: $bookId, offset: $offset, limit: $limit) {
      comments {
        id
        bookId
        name
        comment
      },
      count
    }
  }
`

export interface GetAuthResponse {
  data: {
    authorized: boolean
  }
}

export interface Author {
  id: number
  firstName: string
  lastName: string
  biography: string
  bookCount: number
}

export interface Book {
  id: number
  name: string
  postDate: string
  description: string
  authorInfo?: Author
}

export interface BooksWithCount {
  books: Book[]
  count: number
}

export interface AuthorsWithCount {
  authors: Author[]
  count: number
}

export interface CommentsWithCount {
  comments: Comment[]
  count: number
}

export interface Comment {
  id: number
  name: string
  comment: string
}
