import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback
} from 'react'

import api from '@services/api'
import { usersType } from '@components/types'
import {
  GitHubUsersUriQuery,
  GitHubGetOrgsMembersUriQuery
} from '@components/utils/urls'
import { toast } from 'react-toastify'
import { ErrorREST } from '@utils/errorhandle'

interface StoreGitHubUsersContextType {
  users: Array<usersType>
  orgs: Array<usersType>
  loading: boolean
  orgsLimit: number
  usersLimit: number
  setLoading: Function
  handleLimit: Function
  fetchGitHubOrgs: Function
  fetchGitHubUsers: Function
}

export const StoreGitHubUsersContext = createContext<
  StoreGitHubUsersContextType | undefined
>(undefined)

export const StoreGitHubUsersProvider = ({ children }) => {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [orgsLimit, setOrgsLimit] = useState(5)
  const [usersLimit, setUsersLimit] = useState(5)
  const [orgs, setOrgs] = useState<Array<usersType>>([])
  const [users, setUsers] = useState<Array<usersType>>([])

  const fetchGitHubUsers = async (username: string) => {
    setLoading(true)
    try {
      const { data, status } = await api.get(
        `${GitHubUsersUriQuery}${username}`
      )
      if (status !== 200) if (!data) throw Error('No users found...')

      const { total_count, items } = data

      if (total_count === 0) setStatus(total_count)

      const usersInfo = await Promise.all(gitHubGetUserInfo(items))

      const users = usersInfo.map(
        ({
          id,
          login,
          avatar_url,
          name,
          organizations_url,
          repos_url
        }): usersType => ({
          id,
          login,
          avatar_url,
          name,
          organizations_url,
          repos_url
        })
      )
      setUsers(users)
    } catch (error) {
      setUsers([])
      toast.error(`${new ErrorREST(error).response.message}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchGitHubOrgs = async (username: string) => {
    try {
      const { data } = await api.get(
        `${GitHubUsersUriQuery}${username}+type:org`
      )

      if (!data) throw Error('No Orgs found...')

      const { total_count, items } = data

      if (total_count === 0) setStatus(total_count)

      const orgsWithMembers = await Promise.all(gitHubGetOrgsMembers(items))

      const orgsInfo = await Promise.all(gitHubGetUserInfo(orgsWithMembers))

      const orgs = orgsInfo.map(
        ({
          id,
          login,
          avatar_url,
          total_count,
          organizations_url,
          repos_url,
          name
        }): usersType => ({
          id,
          login,
          total_count,
          avatar_url,
          organizations_url,
          repos_url,
          name
        })
      )

      setOrgs(orgs)
    } catch (error) {
      setOrgs([])
      toast.error(`${new ErrorREST(error).response.message}`)
    }
  }

  const gitHubGetUserInfo = (usersResponse: Array<usersType>) => {
    try {
      return usersResponse.map(async item => {
        const { data } = await api.get(`users/${item.login}`)

        if (!data) throw Error('No user found...')
        const { name } = data
        return {
          ...item,
          name
        }
      })
    } catch (error) {
      return error
    }
  }

  const gitHubGetOrgsMembers = (orgsResponse: Array<usersType>) => {
    return orgsResponse.map(async item => {
      const { data } = await api.get(
        `${GitHubGetOrgsMembersUriQuery}${item.login}/members`
      )
      if (!data) throw Error('No members found...')

      return {
        ...item,
        total_count: data.length
      }
    })
  }

  const handleLimit = useCallback(
    (content: Array<usersType>, target: boolean) => {
      let limit = 0
      if (target) {
        limit = usersLimit >= content.length ? 5 : content.length
        setUsersLimit(limit)
      } else {
        limit = usersLimit >= content.length ? 5 : content.length
        setOrgsLimit(limit)
      }
    },
    [usersLimit, orgsLimit]
  )

  const memorizedValue = useMemo(
    () => ({
      users,
      orgs,
      setLoading,
      fetchGitHubUsers,
      fetchGitHubOrgs,
      loading,
      usersLimit,
      orgsLimit,
      handleLimit
    }),
    [
      users,
      orgsLimit,
      usersLimit,
      handleLimit,
      fetchGitHubUsers,
      fetchGitHubOrgs,
      loading
    ]
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
