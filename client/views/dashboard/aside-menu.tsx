import { FC } from 'react'
import AsideMenuItem from './aside-menu-item'
import Image from 'next/image'

import { Aside, Container, UserName, UserAvatar, Hr } from './side-menu.style'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth'

const AsideMenu: FC = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container>
      <Aside>
        <UserName>{user?.userName}</UserName>
        <Hr />
        <AsideMenuItem />
        <Hr />
        <UserAvatar>
          <Image
            width={70}
            height={70}
            src={user?.avatarUrl || '/img/pic.jpeg'}
            alt="user-picture"
          />
        </UserAvatar>
      </Aside>
    </Container>
  )
}

export default AsideMenu
