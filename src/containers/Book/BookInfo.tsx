import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { pathOr } from 'ramda'

import { getBookById, Book } from '../../apollo/queries'
import { BookTable } from '../../components/BookTable'

interface OwnProps {
  bookId: string | undefined
}

type Props = OwnProps

export const BookInfo = (props: Props) => (
  <>
    <h2>Book info:</h2>
    <Query
      query={getBookById}
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange={true}
      variables={{ id: parseInt(props.bookId || '0', 10) }}
    >
      {(data: QueryResult<{ book: Book }>) => {
        const book = pathOr<Book | null>(null, ['data', 'book'], data)
        return (
          <>
            {!book && !data.loading && 'Book not found'}
            {book && <BookTable books={[book]} needDescription={true} needLinkToDetailBook={false} needAuthor={true} />}
            {data.loading && <div>Loading...</div>}
            {data.error && <div>Error: {data.error.message}</div>}
          </>
        )
      }}
    </Query>
  </>
)
