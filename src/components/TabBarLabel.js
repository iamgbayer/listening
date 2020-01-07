import React, { useContext } from 'react'

import styled, { ThemeContext } from 'styled-components/native'

import { Icon } from './Icon'
import { Text } from './Text'

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled(Text)`
  margin-top: 10px;
`

export function TabBarLabel({ name, focused, title }) {
  const { colors } = useContext(ThemeContext)

  return (
    <Container>
      <Icon
        name={name}
        width={23}
        height={23}
        color={focused ? colors.support.secondary : colors.tertiary}
      />
      <Title
        color={focused ? colors.support.secondary : colors.tertiary}
        size={Text.size.fourteen}
        weight={focused ? Text.weight.bold : Text.weight.regular}
        focused={focused}
      >
        {title}
      </Title>
    </Container>
  )
}
