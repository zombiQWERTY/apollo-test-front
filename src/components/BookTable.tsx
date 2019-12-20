import * as React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import { Book } from '../apollo/queries'

interface OwnProps {
  books: Book[]
  needDescription: boolean
  needLinkToDetailBook: boolean
  needAuthor: boolean
}

type Props = OwnProps

export const BookTable = (props: Props) => (
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        {props.needAuthor && <th>Author</th>}
        <th>Presentation date</th>
        {props.needDescription && <th>Description</th>}
      </tr>
    </thead>
    <tbody>
      {props.books.map((book: Book) => (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{props.needLinkToDetailBook ? <Link to={`/book/${book.id}`}>{book.name}</Link> : book.name}</td>
          {props.needAuthor && (
            <td>{`${book.authorInfo && book.authorInfo.firstName} ${book.authorInfo && book.authorInfo.lastName}`}</td>
          )}
          <td>{book.postDate}</td>
          {props.needDescription && <td>{book.description}</td>}
        </tr>
      ))}
    </tbody>
  </Table>
)
