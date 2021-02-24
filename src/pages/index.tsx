import Head from 'next/head'

import { Container } from '@styles/pages/Home';

const Home:React.FC = ()=> {
  return (
    <Container>
      <Head>
        <title>Search | GitHub Users</title>
      </Head>

      <main>
        <h1> Mochi Front-End Test</h1>
      </main>
    </Container>
  )
}

export default Home;
