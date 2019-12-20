import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Header } from '../../components/Header'

import { AuthorInfo } from './AuthorInfo'

interface UrlParams {
  authorId?: string
}

type Props = RouteComponentProps<UrlParams>

export const AuthorPageContainer = (props: Props) => (
  <>
    <Header />
    <AuthorInfo authorId={props.match.params.authorId} />
  </>
)
