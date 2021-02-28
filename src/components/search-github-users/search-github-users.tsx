import React, { EventHandler, KeyboardEvent, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons'

import Input from '@components/input'
import { Output } from '@components/output/index'
import { NoResult } from '@components/output/styles'
import { useStoreGitHubUsers } from '@contexts/storeGitHubUsers'
import { toast } from 'react-toastify'

const SearchGithubUsers: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    fetchGitHubUsers,
    loading,
    users,
    orgs,
    fetchGitHubOrgs
  } = useStoreGitHubUsers()

  const handleClick = async () => {
    fetchGitHubUsersAndOrgs()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') fetchGitHubUsersAndOrgs()
  }

  const fetchGitHubUsersAndOrgs = () => {
    const { value } = inputRef?.current
    if (!value) return toast.dark('Campo obrigatório, digite um usuário...')

    fetchGitHubUsers(value)
    fetchGitHubOrgs(value)
  }

  return (
    <>
      <h1> Mochi Front-End Test</h1>
      <h3>Search for GitHub Users</h3>
      <Input
        name="search"
        onKeyDown={handleKeyDown}
        icon={
          <FontAwesomeIcon
            onClick={handleClick}
            spin={loading}
            icon={loading ? faSpinner : faSearch}
          />
        }
        placeholder="Type a user name here"
        ref={inputRef}
      />
      {users.length === 0 && orgs.length === 0 ? (
        <NoResult>
          <FontAwesomeIcon icon={faSearch} />
          <p>Enter a login, name or conpany you are looking for.</p>
        </NoResult>
      ) : (
        <Output />
      )}
    </>
  )
}

export default SearchGithubUsers
