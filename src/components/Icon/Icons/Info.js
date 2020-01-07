import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Info({ color, width, height }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path fillRule="evenodd" clipRule="evenodd" d="M2.44444 0H14.6667C16.0111 0 17.1111 1.1 17.1111 2.44444V22L8.55556 18.3333L0 22V2.44444C0 1.1 1.1 0 2.44444 0ZM8.55556 15.6444L14.6667 18.3333V2.44444H2.44444V18.3333L8.55556 15.6444Z" fill={color} />
    </Svg>
  )
}
