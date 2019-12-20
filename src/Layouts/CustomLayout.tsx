import React from 'react'
import { Route } from 'react-router-dom'
import * as Router from 'react-router'
import { Redirect } from 'react-router'
import { Query } from 'react-apollo'

import * as queries from '../apollo/queries'

interface Props {
  title: string
  setTitle?: () => string
}

const CustomLayout: React.StatelessComponent<Props> = props => {
  const title = props.setTitle ? props.setTitle() : ''
  document.title = title && title.length ? title : props.title

  return <div>{props.children}</div>
}

interface ComponentProps {
  setTitle?: (x: Router.RouteComponentProps<any>) => () => string
}

interface RouteProps extends Router.RouteProps {
  component: (React.ComponentClass<any, any> | React.FunctionComponent<any>) & ComponentProps
  publicRoute?: boolean
  title: string
}

interface RouteState {}

export class LayoutRoute extends React.PureComponent<RouteProps, RouteState> {
  public readonly state: RouteState = {}

  public render() {
    const { component: Component, title, publicRoute, ...rest } = this.props

    const render = (matchProps: Router.RouteComponentProps) => (
      <Query query={queries.GET_AUTHORIZED}>
        {(props: queries.GetAuthResponse) => {
          if (publicRoute === undefined) {
            if (!props.data.authorized) {
              return <Redirect to="/auth/login" />
            }
          } else {
            if (props.data.authorized && this.props.path === '/auth/login') {
              return <Redirect to="/" />
            }
          }

          return (
            <CustomLayout title={title} setTitle={Component.setTitle ? Component.setTitle(matchProps) : undefined}>
              <Component {...matchProps} />
            </CustomLayout>
          )
        }}
      </Query>
    )

    return <Route {...rest} render={render} />
  }
}
