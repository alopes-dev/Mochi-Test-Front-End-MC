import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
    margin-top: 50px;
  }
  svg{
    font-size: 140px;
    color: ${props => props.theme.colors.text};
    display: flex;
    margin: 0 auto;
    margin-top:50px;
  }

  p {
    margin-top: 24px;
    font-size: 23px;
    line-height: 32px;
    width:65%;
    text-align:center;
  }
`