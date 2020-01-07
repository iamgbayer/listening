import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Pause({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15.602 15.602"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill={color}
        d="M10.155,0h2.961c0.191,0,0.352,0.161,0.352,0.354v14.893c0,0.195-0.16,0.355-0.352,0.355h-2.961
			c-0.191,0-0.355-0.16-0.355-0.355V0.354C9.8,0.161,9.964,0,10.155,0z"
      />
      <Path
        fill={color}
        d="M2.488,0h2.963c0.191,0,0.35,0.161,0.35,0.354v14.893c0,0.195-0.158,0.355-0.35,0.355H2.488
			c-0.196,0-0.354-0.161-0.354-0.356V0.354C2.134,0.161,2.292,0,2.488,0z"
      />
    </Svg>
  )
}
