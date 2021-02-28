import React from 'react'

import { StoreGitHubUsersProvider } from '@contexts/storeGitHubUsers'
import SearchGithubUsers from './search-github-users'

const SearchGitHubUserCore: React.FC = () => (
  <StoreGitHubUsersProvider>
    <SearchGithubUsers />
  </StoreGitHubUsersProvider>
)

export default SearchGitHubUserCore
