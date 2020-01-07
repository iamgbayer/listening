import React from 'react'
import Svg, { Circle } from 'react-native-svg'

export function Dots({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 384"
    >
      <Circle cx="192" cy="42.667" r="42.667" fill={color} />
      <Circle cx="192" cy="192" r="42.667" fill={color} />
      <Circle cx="192" cy="341.333" r="42.667" fill={color} />
    </Svg>
  )
}
