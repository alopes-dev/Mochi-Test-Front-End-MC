import React from 'react'

import SignUp from '@client/views/sign-up'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

const SignInPage: React.FC = () => {
  return <SignUp />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: true
      }
    }
  }

  return {
    props: {}
  }
}

export default SignInPage
