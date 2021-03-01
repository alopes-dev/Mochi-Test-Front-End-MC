import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import {
  useStoreGitHubUsers,
  StoreGitHubUsersProvider
} from '@contexts/storeGitHubUsers'

const wrapper = ({ children }) => (
  <StoreGitHubUsersProvider>{children}</StoreGitHubUsersProvider>
)

let resultUsers = []

const mockSetUsers = jest.fn().mockImplementation(User => {
  resultUsers = [...User]
  return resultUsers
})

const axiosMock = {
  get: jest.fn((url)=>{
    Promise.resolve({data: {}})
  })
}

const mockUseContext = jest.fn().mockImplementation(() => ({
  Users: [],
  setUsers: mockSetUsers
}))

React.useContext = mockUseContext

jest.mock("../__mocks__/axios");

describe('useStoreGitHubUsers', () => {
  it('should return no github users', () => {
    const { result } = renderHook(() => useStoreGitHubUsers(), { wrapper });

    expect(result.current.users.length).toBe(0)

    act(()=>{
      result.current.fetchGitHubUsers("adilsonLopesDev")
    })

    const fetchGitHubOrgs= jest.fn()

    expect(fetchGitHubOrgs).toHaveBeenCalled()
  });


});
