import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { theme } from 'styled-tools'

import { getUser } from 'config'

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${theme('colors.primary')};
`

export function Middleware({ navigation }) {
  useEffect(() => {
    getUser().then(user => {
      navigation.navigate(user ? 'Main' : 'Auth')
    })
  }, [])

  return <Container></Container>
}
