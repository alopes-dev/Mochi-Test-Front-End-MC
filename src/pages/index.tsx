import Head from 'next/head'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faSearch } from '@fortawesome/free-solid-svg-icons'

import { Container } from '@styles/pages/Main'

const Main: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Search | GitHub Users</title>
      </Head>

      <main>
        <h1> Welcome to search a GitHub Users/Orgs</h1>
        <FontAwesomeIcon  icon={faSearch} />
        <Link  href="/searchUsers">
          <a>
            <FontAwesomeIcon  icon={faLink} />
            <span>Click here and search GitHube Users...</span>
          </a>
        </Link>
      </main>
    </Container>
  )
}

export default Main
