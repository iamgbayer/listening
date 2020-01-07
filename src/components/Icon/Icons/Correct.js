import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Correct({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.9736 1.41196C16.9352 0.395282 15.2568 0.412097 14.2513 1.46127V1.46127L6.89307 8.81952L4.74912 6.75498L4.70942 6.71527C3.67884 5.68469 2.00794 5.68469 0.977358 6.71527V6.71527C-0.0532214 7.74585 -0.0532223 9.41675 0.977358 10.4473L1.01706 10.487L4.98734 14.4573V14.4573C5.98964 15.5032 7.65579 15.5209 8.68012 14.4966L8.7194 14.4573L17.9834 5.19333L18.0033 5.17338C19.0416 4.13512 19.0227 2.43923 17.9736 1.41196V1.41196Z"
        fill={color}
      />
    </Svg>
  )
}
