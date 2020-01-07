import React from 'react'
import styled from 'styled-components/native'
import { theme } from 'styled-tools'

import { Back } from 'components'

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 30px;
  padding-top: 40px;
  background-color: ${theme('colors.primary')};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.View`
  width: 100%;
  border-radius: ${theme('border.radius.fifteen')};
  background-color: ${theme('colors.secondary')};
  box-shadow: ${theme('shadow.primary')};
`

export function Settings({ navigation }) {
  return (
    <Container>
      <Back navigation={navigation} to="Profile">
        Settings
      </Back>

      <Content></Content>
    </Container>
  )
}
