import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { pathOr, assoc, evolve, concat } from 'ramda'
import { Button } from 'react-bootstrap'

import { getBooks, Book, BooksWithCount } from '../../apollo/queries'
import { BookTable } from '../../components/BookTable'

interface BookResponseData {
  books: BooksWithCount
}

const loadMoreBooks = (fetchMore: any, offset: number) => () => {
  fetchMore({
    variables: { offset },
    updateQuery: (previous: BookResponseData, { fetchMoreResult }: { fetchMoreResult: BookResponseData }) => {
      if (!fetchMoreResult) {
        return previous
      }

      return evolve(
        {
          books: assoc('books', concat(previous.books.books, fetchMoreResult.books.books))
        },
        previous
      )
    }
  })
}

export const BookList = () => (
  <>
    <h2>All books:</h2>
    <Query
      query={getBooks}
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange={true}
      variables={{ offset: 0, limit: 10 }}
    >
      {(data: QueryResult<BookResponseData>) => {
        const books = pathOr<Book[]>([], ['data', 'books', 'books'], data)
        const count = pathOr<number>(0, ['data', 'books', 'count'], data)
        const hasBooks = Boolean(books.length)
        const isAllResults = books.length > 10 || books.length !== count
        return (
          <>
            {!hasBooks && !data.loading && 'Books not found'}
            {hasBooks && (
              <BookTable books={books} needDescription={false} needLinkToDetailBook={true} needAuthor={true} />
            )}

            {hasBooks && (
              <Button variant="primary" onClick={loadMoreBooks(data.fetchMore, books.length)}>
                Load more
              </Button>
            )}

            {hasBooks && !isAllResults && <div>Showed all available results</div>}
            {hasBooks && isAllResults && (
              <div>
                Showen:
                <b>
                  {books.length}/{count}
                </b>
              </div>
            )}

            {data.loading && <div>Loading...</div>}
            {data.error && <div>Error: {data.error.message}</div>}
          </>
        )
      }}
    </Query>
  </>
)
