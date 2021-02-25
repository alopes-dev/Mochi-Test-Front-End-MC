import React, { createContext, useState, useContext, useMemo } from 'react'

interface StoreGitHubUsersContextType {
  users: Array<usersType>
}

export interface usersType {
  id: string
  login: string
  avatar_url: string
  name: string
  contributors?: number
  people?: number
}

const StoreGitHubUsersContext = createContext<
  StoreGitHubUsersContextType | undefined
>(undefined)

export const StoreGitHubUsersProvider = ({ children }) => {
  const [users, setUsers] = useState<Array<usersType>>()

  const memorizedValue = useMemo(
    () => ({
      users,
      setUsers
    }),
    [users, setUsers]
  )

  return (
    <StoreGitHubUsersContext.Provider value={memorizedValue}>
      {children}
    </StoreGitHubUsersContext.Provider>
  )
}

export function useStoreGitHubUsers() {
  return useContext(StoreGitHubUsersContext)
}
