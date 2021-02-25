import React from 'react'
import {
  Avatar,
  Separator,
  Output as OutputContainer,
  UsersOrOrginazationList
} from '@components/output/styles'

type propsType = {
  title: string
  isUser?: boolean
}

const UsersList: React.FC<propsType> = ({ title, isUser }) => {
  return (
    <OutputContainer>
      <h4>{title} (504)</h4>
      <Separator />
      <UsersOrOrginazationList>
        <li>
          <span>{title}</span>
          {isUser ? <span>CONTRIBUTIONS</span> : <span>PEOPLE</span>}
        </li>
        <li>
          <Avatar>
            <img alt="/" />
          </Avatar>
          <span>AdilsonLopesDev </span>
          <small>2</small>
        </li>
        <li>
          <Avatar>
            <img alt="/" />
          </Avatar>
          <span>AdilsonLopesDev </span>
          <small>2</small>
        </li>
      </UsersOrOrginazationList>
      <span className="showmore">SHOW MORE</span>
    </OutputContainer>
  )
}

export default UsersList
