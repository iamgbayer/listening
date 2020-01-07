import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Return({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320.012 320.012"
    >
      <Path
        d="M32.006,0.012c8.832,0,16,7.168,16,16v116.64L280.166,2.06c4.896-2.784,11.008-2.752,15.904,0.128s7.936,8.128,7.936,13.824
	v288c0,5.696-3.04,10.944-7.936,13.824c-2.464,1.44-5.28,2.176-8.064,2.176c-2.72,0-5.408-0.672-7.84-2.048L48.006,187.372v116.64
  c0,8.832-7.168,16-16,16s-16-7.168-16-16v-288C16.006,7.18,23.174,0.012,32.006,0.012z"
        fill={color}
      />
    </Svg>
  )
}
