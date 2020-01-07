import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Play({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 35 41.999"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill={color}
        d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
	c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
	c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"
      />
    </Svg>
  )
}
