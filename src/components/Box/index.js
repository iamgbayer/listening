import styled, { css } from 'styled-components/native'
import { ifProp, prop } from 'styled-tools'
import { View } from 'react-native'

export const Box = styled.View`
${ifProp(
  'top',
  css`
    margin-top: ${prop('top')};
  `
)}
${ifProp(
  'bottom',
  css`
    margin-bottom: ${prop('bottom')};
  `
)}
${ifProp(
  'left',
  css`
    margin-left: ${prop('left')};
  `
)}
${ifProp(
  'right',
  css`
    margin-right: ${prop('right')};
  `
)}
`
