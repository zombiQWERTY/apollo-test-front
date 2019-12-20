import * as React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import { Author } from '../apollo/queries'

interface OwnProps {
  authors: Author[]
  needBookCount: boolean
  needBiography: boolean
  needLinkToDetailAuthor: boolean
}

type Props = OwnProps

export const AuthorTable = (props: Props) => (
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>First name, last name</th>
        {props.needBookCount && <th>Written books count</th>}
        {props.needBiography && <th>Biography</th>}
      </tr>
    </thead>
    <tbody>
      {props.authors.map((author: Author) => (
        <tr key={author.id}>
          <td>{author.id}</td>
          <td>
            {props.needLinkToDetailAuthor ? (
              <Link to={`author/${author.id}`}>{`${author.firstName} ${author.lastName}`}</Link>
            ) : (
              `${author.firstName} ${author.lastName}`
            )}
          </td>
          {props.needBookCount && <td>{author.bookCount}</td>}
          {props.needBiography && <td>{author.biography}</td>}
        </tr>
      ))}
    </tbody>
  </Table>
)
