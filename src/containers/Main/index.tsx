import React from 'react'
import { Query } from 'react-apollo'

import { Header } from '../../components/Header'
import * as queries from '../../apollo/queries'

interface OwnProps {}

export const Main = (props: OwnProps) => {
  return (
    <>
      <Header />
      <Query query={queries.GET_AUTHORIZED} fetchPolicy="cache-only">
        {(data: queries.GetAuthResponse) => (
          <div>Main screen. Current user auth status: {data.data.authorized ? 'logged in' : 'not logged in'}</div>
        )}
      </Query>
    </>
  )
}
