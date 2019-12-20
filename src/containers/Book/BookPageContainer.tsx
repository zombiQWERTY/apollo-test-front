import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Header } from '../../components/Header'

import { BookInfo } from './BookInfo'
import { Comments } from './Comments'

interface UrlParams {
  bookId?: string
}

type Props = RouteComponentProps<UrlParams>

export const BookPageContainer = (props: Props) => (
  <>
    <Header />
    <BookInfo bookId={props.match.params.bookId} />
    <Comments bookId={props.match.params.bookId} />
  </>
)
