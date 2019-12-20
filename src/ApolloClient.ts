import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable, Operation } from 'apollo-link'
import gql from 'graphql-tag'

import { GET_AUTHORIZED } from './apollo/queries'

const memoryCache = new InMemoryCache()

const accessToken = localStorage.getItem('accessToken')
const request = async (operation: Operation) => {
  operation.setContext({
    headers: {
      authorization: accessToken && accessToken.length > 0 ? `Bearer ${accessToken}` : ''
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: ZenObservable.Subscription
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const typeDefs = gql`
  extend type Query {
    authorized: Boolean!
  }

  extend type Mutation {
    setAuthorized(status: Boolean!): Boolean!
  }
`

const resolvers = {
  Query: {
    auth: (_: any, args: any, { cache }: { cache: InMemoryCache }) => {
      return {
        authorized: cache,
        __typename: 'auth'
      }
    }
  },
  Mutation: {
    setAuthorized: (
      _: any,
      { status }: { status: boolean },
      { client }: { cache: InMemoryCache; client: ApolloClient<Cache> }
    ) => {
      client.writeQuery({
        query: GET_AUTHORIZED,
        variables: {},
        data: {
          authorized: status
        }
      })
      return status
    }
  }
}

export const makeApolloClient = () =>
  new ApolloClient({
    resolvers,
    typeDefs,
    cache: memoryCache,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log(graphQLErrors)
        }

        if (networkError) {
          // TODO: logout here
        }
      }),
      requestLink,
      new HttpLink({
        uri: process.env.REACT_APP_ENDPOINT,
        credentials: 'include'
      })
    ])
  })

memoryCache.writeData({
  data: {
    authorized: accessToken && accessToken.length > 0
  }
})
