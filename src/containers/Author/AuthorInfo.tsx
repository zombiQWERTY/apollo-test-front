import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { pathOr } from 'ramda'

import { getAuthorById, getBooksByAuthor, Author, Book } from '../../apollo/queries'
import { AuthorTable } from '../../components/AuthorTable'
import { BookTable } from '../../components/BookTable'

interface OwnProps {
  authorId: string | undefined
}

type Props = OwnProps

export const AuthorInfo = (props: Props) => (
  <>
    <h2>Author info:</h2>
    <Query
      query={getAuthorById}
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange={true}
      variables={{ id: parseInt(props.authorId || '0', 10) }}
    >
      {(data: QueryResult<{ author: Author }>) => {
        const author = pathOr<Author | null>(null, ['data', 'author'], data)
        return (
          <>
            {!author && !data.loading && 'Author not found'}
            {author && (
              <AuthorTable
                authors={[author]}
                needBiography={true}
                needBookCount={false}
                needLinkToDetailAuthor={false}
              />
            )}
            {data.loading && <div>Loading...</div>}
            {data.error && <div>Error: {data.error.message}</div>}
          </>
        )
      }}
    </Query>

    <h2>Books related to this author:</h2>
    <Query
      query={getBooksByAuthor}
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange={true}
      variables={{ id: parseInt(props.authorId || '0', 10) }}
    >
      {(data: QueryResult<{ books: Book[] }>) => {
        const books = pathOr<Book[]>([], ['data', 'booksByAuthor'], data)
        const hasBooks = Boolean(books.length)
        return (
          <>
            {!hasBooks && !data.loading && 'Books not found'}
            {hasBooks && (
              <BookTable books={books} needAuthor={false} needDescription={false} needLinkToDetailBook={true} />
            )}
            {data.loading && <div>Loading...</div>}
            {data.error && <div>Error: {data.error.message}</div>}
          </>
        )
      }}
    </Query>
  </>
)
