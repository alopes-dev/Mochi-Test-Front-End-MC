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
    await fetchGitHubUser(value)
  }

  const fetchGitHubUser =  async (username:string):Promise<usersType> =>{
    try {
      const { data } = (await api.get(`users/${username}`))

      const user = data
      const repos = await fetchGitHubUserRepos(`users/${username}/repos`);

      return user
    } catch (error) {
      return error
    } finally {
      setLoading(false)
    }
  }

  const fetchGitHubUserRepos = async (uri: string): Promise<Array<usersType>> => {
    try {
      const { data } = (await api.get(`${uri}`))

      const contributors = await Promise.all(data.map(async(item)=>{
        console.log(`repos/${item.full_name}/contributors`)
        return await fetchContributors(`repos/${item.full_name}/contributors`)
      }))

      console.log(contributors)

      return data
    } catch (error) {
      return error
    } finally {
      setLoading(false)
    }
  }

  const fetchContributors = async(uri:string)=>{
    const { data } = (await api.get(`${uri}`))
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
