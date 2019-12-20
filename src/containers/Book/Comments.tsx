import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { pathOr, assoc, concat, evolve } from 'ramda'
import { Button } from 'react-bootstrap'

import { getCommentByBookId, Comment, CommentsWithCount } from '../../apollo/queries'
import { CommentsTable } from '../../components/CommentsTable'

interface OwnProps {
  bookId: string | undefined
}

type Props = OwnProps

interface CommentResponseData {
  comments: CommentsWithCount
}

const loadMoreComments = (fetchMore: any, offset: number) => () => {
  fetchMore({
    variables: { offset },
    updateQuery: (previous: CommentResponseData, { fetchMoreResult }: { fetchMoreResult: CommentResponseData }) => {
      if (!fetchMoreResult) {
        return previous
      }

      return evolve(
        {
          comments: assoc('comments', concat(previous.comments.comments, fetchMoreResult.comments.comments))
        },
        previous
      )
    }
  })
}

export const Comments = (props: Props) => (
  <>
    <h2>Related comments:</h2>
    <Query
      query={getCommentByBookId}
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange={true}
      variables={{ bookId: parseInt(props.bookId || '0', 10), offset: 0, limit: 10 }}
    >
      {(data: QueryResult<CommentResponseData>) => {
        const comments = pathOr<Comment[]>([], ['data', 'comments', 'comments'], data)
        const count = pathOr<number>(0, ['data', 'comments', 'count'], data)
        const hasComments = Boolean(comments.length)
        const isAllResults = comments.length > 10 || comments.length !== count
        return (
          <>
            {!hasComments && !data.loading && 'Comments not found'}
            {hasComments && <CommentsTable comments={comments} />}

            {hasComments && (
              <Button variant="primary" onClick={loadMoreComments(data.fetchMore, comments.length)}>
                Load more
              </Button>
            )}

            {hasComments && !isAllResults && <div>Showed all available results</div>}
            {hasComments && isAllResults && (
              <div>
                Showen:
                <b>
                  {comments.length}/{count}
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
