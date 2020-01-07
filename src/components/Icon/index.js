import React, { memo, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'

import * as Icons from './Icons'

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
`

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export const Icon = memo(({ name, width, height, color }) => {
  const { colors } = useContext(ThemeContext)
  const Iconable = Icons[capitalize(name)]

  return (
    <Container>
      <Iconable
        width={width}
        height={height}
        color={color || colors.tertiary}
      />
    </Container>
  )
})

Icon.defaultProps = {
  width: 20,
  height: 20
}
