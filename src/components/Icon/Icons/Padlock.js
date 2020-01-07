import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Padlock({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6H12.077V5.077C12.077 2.273 9.805 0 7 0C4.196 0 1.923 2.273 1.923 5.077V6H1C0.448 6 0 6.448 0 7V15C0 15.552 0.448 16 1 16H13C13.552 16 14 15.552 14 15V7C14 6.448 13.552 6 13 6ZM7 13C5.895 13 5 12.105 5 11C5 9.895 5.895 9 7 9C8.105 9 9 9.895 9 11C9 12.105 8.105 13 7 13ZM3.923 5.077V6H10.077V5.077C10.077 3.38 8.697 2 7 2C5.303 2 3.923 3.38 3.923 5.077Z"
        fill={color}
      />
    </Svg>
  )
}
