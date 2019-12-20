import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
    }
  }
`

export const AUTH_MUTATION = gql`
  mutation SetAuthorized($status: Boolean!) {
    setAuthorized(status: $status) @client
  }
`

export interface LoginRequestData {
  email: string
  password: string
}

export interface LoginVariables {
  variables: LoginRequestData
}

export interface LoginResponse {
  data: {
    login: {
      accessToken: string
    }
  }
}

export interface AuthVariables {
  variables: {
    status: boolean
  }
}
