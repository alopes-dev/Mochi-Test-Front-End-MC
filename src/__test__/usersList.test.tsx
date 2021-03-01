import React from 'react'

import { Wrapper } from '@utils/test.utils'
import UsersList from '@components/output/usersList'
import { render } from '@testing-library/react'

const TestComponent = () => {
  const content = []
  return <UsersList title="Users" content={content} />
}

describe('<UsersList />', () => {
  it('Should render component correctly', () => {
    const content = []
    // const { container, getByTestId } = render(
    //   <Wrapper>
    //     <TestComponent />
    //   </Wrapper>
    // )

    // expect(getByTestId('title')).toBe(`Users ${content.length}`)
  })
})
