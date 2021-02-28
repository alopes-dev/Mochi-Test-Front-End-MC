import Head from 'next/head'

import { Container } from '@styles/pages/Home'
import SearchGithubUsers from '@components/search-github-users'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Search | GitHub Users</title>
      </Head>

      <main>
        <SearchGithubUsers />
      </main>
    </Container>
  )
}

export default Home
