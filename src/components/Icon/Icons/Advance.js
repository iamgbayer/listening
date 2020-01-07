import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Advance({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-145 237 320 320"
    >
      <Path
        fill={color}
        d="M159,253v288c0,8.8-7.2,16-16,16s-16-7.2-16-16V424.4L-105.2,555c-2.4,1.4-5.1,2-7.8,2c-2.8,0-5.6-0.7-8.1-2.2
	c-4.9-2.9-7.9-8.1-7.9-13.8V253c0-5.7,3-10.9,7.9-13.8c4.9-2.9,11-2.9,15.9-0.1L127,369.6V253c0-8.8,7.2-16,16-16S159,244.2,159,253
	z"
      />
    </Svg>
  )
}
