import * as React from 'react'
import { Table } from 'react-bootstrap'

import { Comment } from '../apollo/queries'

interface OwnProps {
  comments: Comment[]
}

type Props = OwnProps

export const CommentsTable = (props: Props) => (
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Author</th>
        <th>Content</th>
      </tr>
    </thead>
    <tbody>
      {props.comments.map((comment: Comment) => (
        <tr key={comment.id}>
          <td>{comment.id}</td>
          <td>{comment.name}</td>
          <td>{comment.comment}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)
