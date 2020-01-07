import React from 'react'
import { Text as Texteable } from 'react-native'

import { Tokens } from './Tokens'

const { font } = Tokens

const weights = {
  bold: 'hk-grotesk-bold',
  medium: 'hk-grotesk-medium',
  regular: 'hk-grotesk-regular',
  light: 'hk-grotesk-light'
}

export function Text({ weight, size, align, color, ...props }) {
  return (
    <Texteable
      {...props}
      style={[
        props.style,
        {
          color,
          fontSize: font.size[size],
          fontFamily: weights[weight],
          textAlign: align
        }
      ]}
    />
  )
}

Text.defaultProps = {
  weight: 'regular',
  align: 'left'
}

Text.weight = {
  bold: 'bold',
  medium: 'medium',
  regular: 'regular',
  light: 'light'
}

Text.align = {
  center: 'center',
  left: 'left'
}

Text.size = Object.assign(
  {},
  ...Object.keys(font.size).map(size => ({
    [size]: size
  }))
)
