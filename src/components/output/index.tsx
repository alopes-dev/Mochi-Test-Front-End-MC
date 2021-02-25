import React from 'react'

import {
  Container,
  Output as OutputContainer,
  Avatar,
  Separator,
  UsersOrOrginazationList
} from '@components/output/styles'
import UsersList from '@components/output/usersList'

export const Output: React.FC = () => {
  return (
    <Container>
      <UsersList title="USERS" isUser={true} />
      <UsersList title="COMPANIES" />
    </Container>
  )
}
