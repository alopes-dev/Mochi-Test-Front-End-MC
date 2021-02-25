import React, { useState } from 'react'

import { Input } from '@components/input'
import { Output } from '@components/output/index'
import { debounceEvent } from '@components/utils/helper-functions'
import api from 'src/services/api'
import { usersType } from '@components/types'

const SearchGithubUsers: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const handleTyping = async (event: InputEvent) => {
    const { value } = event.target as HTMLInputElement

    if (!value) return
    setLoading(true)
    await fetchUsers(value)
  }

  const fetchUsers = async (username: string): Promise<Array<usersType>> => {
    try {
      const { data } = await api.get(`users/${username}`)
      console.log(data)
      return data
    } catch (error) {
      return error
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1> Mochi Front-End Test</h1>
      <h3>Search for GitHub Users</h3>
      <Input name="search" onChange={debounceEvent(handleTyping, 500)} />
      <Output />
    </>
  )
}

export default SearchGithubUsers
