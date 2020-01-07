import styled from 'styled-components'
import { theme } from 'styled-tools'
import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
  width: 140;
  height: 150;
  background-color: ${theme('colors.secondary')};
  border-radius: ${theme('border.radius.fifteen')};
  overflow: hidden;
  box-shadow: ${theme('shadow.primary')};
  margin-bottom: 30;
`
