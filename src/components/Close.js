import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { TouchableOpacity } from 'react-native'

import { Icon } from './Icon'

const Closeable = styled(TouchableOpacity)`
  position: absolute;
  left: 30px;
  top: 9%;
`

export function Close({ onPress }) {
  const { colors } = useContext(ThemeContext)

  return (
    <Closeable onPress={onPress}>
      <Icon name="close" color={colors.support.tertiary} />
    </Closeable>
  )
}
