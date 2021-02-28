import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { Container } from '@styles/pages/Main'

const Main: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Search | GitHub Users</title>
      </Head>

      <main>
        <h1> Welcome to search a GitHub Users/Orgs</h1>
        <FontAwesomeIcon icon={faSearch} />
      </main>
    </Container>
  )
}

export default Main
