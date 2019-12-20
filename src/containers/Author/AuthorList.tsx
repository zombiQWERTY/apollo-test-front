import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { pathOr, assoc, concat, evolve } from 'ramda'
import { Button } from 'react-bootstrap'

import { getAuthors, Author, AuthorsWithCount } from '../../apollo/queries'
import { AuthorTable } from '../../components/AuthorTable'

interface AuthorResponseData {
  authors: AuthorsWithCount
}

const loadMoreAuthors = (fetchMore: any, offset: number) => () => {
  fetchMore({
    variables: { offset },
    updateQuery: (previous: AuthorResponseData, { fetchMoreResult }: { fetchMoreResult: AuthorResponseData }) => {
      if (!fetchMoreResult) {
        return previous
      }

      return evolve(
        {
          authors: assoc('authors', concat(previous.authors.authors, fetchMoreResult.authors.authors))
        },
        previous
      )
    }
  })
}

export const AuthorList = () => (
  <>
    <h2>All authors:</h2>
    <Query
      query={getAuthors}
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange={true}
      variables={{ offset: 0, limit: 10 }}
    >
      {(data: QueryResult<AuthorResponseData>) => {
        const authors = pathOr<Author[]>([], ['data', 'authors', 'authors'], data)
        const count = pathOr<number>(0, ['data', 'authors', 'count'], data)
        const hasAuthors = Boolean(authors.length)
        const isAllResults = authors.length > 10 || authors.length !== count
        return (
          <>
            {!hasAuthors && !data.loading && 'Authors not found'}
            {hasAuthors && (
              <AuthorTable authors={authors} needBiography={false} needBookCount={true} needLinkToDetailAuthor={true} />
            )}

            {hasAuthors && (
              <Button variant="primary" onClick={loadMoreAuthors(data.fetchMore, authors.length)}>
                Load more
              </Button>
            )}

            {hasAuthors && !isAllResults && <div>Showed all available results</div>}
            {hasAuthors && isAllResults && (
              <div>
                Showen:
                <b>
                  {authors.length}/{count}
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
