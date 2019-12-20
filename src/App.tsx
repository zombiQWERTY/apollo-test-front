import React from 'react'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { RouteMap } from './routes'
import * as mutations from './apollo/mutations'

interface OwnProps {
  auth?: (variables: mutations.AuthVariables) => {}
}

interface OwnState {}
type Props = OwnProps

export class AppComponent extends React.Component<Props, OwnState> {
  public componentDidMount() {
    // Here we can manipulate apollo through HOC
    // const token = localStorage.getItem('accessToken')
    // if (token && token.length > 0) {
    //   this.props.auth &&
    //     this.props.auth({
    //       variables: {
    //         status: true
    //       }
    //     })
    // }
  }

  public render() {
    return (
      <div id="main">
        <RouteMap />
      </div>
    )
  }
}

export const App = compose(graphql<OwnProps, {}>(mutations.AUTH_MUTATION, { name: 'auth' }))(AppComponent)
