import { View } from 'react-native'
import { prop, theme } from 'styled-tools'
import styled from 'styled-components/native'

export const Circle = styled.View`
  background-color: ${prop('background')};
  width: 30;
  height: 30;
  border-radius: ${theme('border.radius.fifty')};
  display: flex;
  justify-content: center;
  align-items: center;
`
