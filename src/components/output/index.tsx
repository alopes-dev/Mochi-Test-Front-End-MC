import React from 'react'

import { Container } from '@components/output/styles'
import UsersList from '@components/output/usersList'
import { useStoreGitHubUsers } from '@contexts/storeGitHubUsers'

export const Output: React.FC = () => {
  const { users, orgs, orgsLimit, usersLimit } = useStoreGitHubUsers()
  return (
    <Container>
      <UsersList
        content={users}
        limit={usersLimit}
        title="REPOSITORIES"
        isUser={true}
      />
      <UsersList content={orgs} limit={orgsLimit} title="COMPANIES" />
    </Container>
  )
}
