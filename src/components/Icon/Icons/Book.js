import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Book({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2.5 0C2.325 0 2.175 0.025 2.025 0.075C1.05 0.275 0.275 1.05 0.075 2.025C0 2.175 0 2.325 0 2.5V16.25C0 18.325 1.675 20 3.75 20H17.5V17.5H3.75C3.05 17.5 2.5 16.95 2.5 16.25C2.5 15.55 3.05 15 3.75 15H17.5V1.25C17.5 0.55 16.95 0 16.25 0H15V7.5L12.5 5L10 7.5V0H2.5Z"
        fill={color}
      />
    </Svg>
  )
}
