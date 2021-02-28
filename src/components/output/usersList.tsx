import React, { useCallback } from 'react'
import {
  Avatar,
  Separator,
  Output as OutputContainer,
  UsersOrOrginazationList
} from '@components/output/styles'
import { usersType } from '@components/types'
import { useStoreGitHubUsers } from '@contexts/storeGitHubUsers'

type propsType = {
  title: string
  isUser?: boolean
  limit?: number
  content: Array<usersType | usersType>
}

const UsersList: React.FC<propsType> = ({
  title,
  limit = 100,
  isUser,
  content
}) => {
  const { handleLimit } = useStoreGitHubUsers()
  const handleClick = () => {
    handleLimit(content, isUser)
  }

  const renderGitHubContent = useCallback(() => {
    return content
      .filter((_, index) => index <= limit)
      .map(item => (
        <li key={item.id}>
          <Avatar>
            <img alt="/" src={item.avatar_url} />
          </Avatar>
          <div className="userInfo">
            <span>{item.login} <br/> <small>{item.name}</small> </span>
            <small>{item.total_count}</small>
          </div>
        </li>
      ))
  }, [content, limit])

  return (
    <OutputContainer>
      <h4>
        {title} ({content.length})
      </h4>
      <Separator />
      <UsersOrOrginazationList>
        <li>
          <span>{title}</span>
          {isUser ? <span>CONTRIBUTIONS</span> : <span>PEOPLE</span>}
        </li>
        {renderGitHubContent()}
      </UsersOrOrginazationList>
      <span onClick={handleClick} className="showmore">
        {limit >= content.length ? ' SHOW LESS' : 'SHOW MORE'}
      </span>
    </OutputContainer>
  )
}

export default UsersList
