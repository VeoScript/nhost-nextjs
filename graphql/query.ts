import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUser($getId: uuid!) {
    user(id: $getId) {
      id
      email,
      avatarUrl
      displayName
    }
  }
`

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      email,
      avatarUrl
      displayName
    }
  }
`