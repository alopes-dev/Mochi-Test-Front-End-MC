import React, { useRef }  from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Wrapper } from '@utils/test.utils'

import Input from '@components/input/index'

const TestComponent = ()=> {
  const inputRef = useRef(null)
  return (
    <Wrapper>
      <Input ref={inputRef} name="input" aria-label="cost-input" />
    </Wrapper>
  )
}

afterEach(() => {
  cleanup();
  jest.resetModules();
});

describe("<Input />", ()=>{

  it('It should catch value from input', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
    const wrapper = render(<TestComponent />)
    const input = wrapper.getByLabelText('cost-input')
    fireEvent.change(input, { target: { value: 'adilsonLopesDev' } })
    expect(input.value).toBe('adilsonLopesDev')
    expect(useRefSpy).toBeCalledWith(1);
  })

})
