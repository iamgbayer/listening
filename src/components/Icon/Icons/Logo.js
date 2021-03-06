import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Logo({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-196 270 218 194"
    >
      <Path
        fill={color}
        d="M-166.7,300c-1.2,0.1-2.4,0.7-3.2,1.6c-0.8,0.9-1.3,2.1-1.3,3.3v30.5c-6.5-0.5-13.1-0.8-19.8-0.8
	c-0.2,0-0.3,0-0.5,0c-1.2,0.1-2.4,0.7-3.2,1.6c-0.8,0.9-1.3,2.1-1.3,3.3V466c0,1.3,0.5,2.6,1.5,3.5s2.2,1.5,3.5,1.5
	c52.1,0,74.9,9.5,102,21.8c0.6,0.3,1.3,0.4,2,0.4s1.4-0.1,2-0.4c27.2-12.3,49.9-21.8,102-21.8c1.3,0,2.6-0.5,3.5-1.5
	s1.5-2.2,1.5-3.5V339.6c0-1.3-0.5-2.6-1.5-3.5c-0.9-0.9-2.2-1.5-3.5-1.5c-6.7,0-13.3,0.2-19.8,0.8v-10.7c0-0.7-0.1-1.3-0.4-1.9
	c-0.2-0.6-0.6-1.2-1.1-1.6c-0.5-0.5-1-0.8-1.6-1.1c-0.6-0.3-1.3-0.4-1.9-0.4c-0.7,0-1.3,0.1-1.9,0.4c-0.6,0.3-1.2,0.6-1.6,1.1
	c-0.5,0.5-0.8,1-1.1,1.6c-0.2,0.6-0.4,1.3-0.4,1.9v111.8c-35.7,0.9-55.3,10-74.3,21.2c-19-11.2-38.6-20.3-74.3-21.2V310.3
	c26.9,1,51.5,10,71.2,25.8c0.9,0.7,2,1.1,3.1,1.1s2.2-0.4,3.1-1.1c21-16.7,47.3-26.2,76.2-26.2c0.7,0,1.3-0.1,1.9-0.4
	c0.6-0.2,1.2-0.6,1.6-1.1c0.5-0.5,0.8-1,1.1-1.6c0.3-0.6,0.4-1.3,0.4-1.9c0-0.7-0.1-1.3-0.4-1.9c-0.3-0.6-0.6-1.2-1.1-1.6
	c-0.5-0.5-1-0.8-1.6-1.1c-0.6-0.2-1.3-0.4-1.9-0.4c-29.7,0-57.1,9.5-79.3,26.2c-22.2-16.7-49.6-26.2-79.3-26.2
	C-166.4,300-166.6,300-166.7,300z M-186.1,344.8c5,0.1,10,0.3,14.9,0.7v95.7c0,1.3,0.5,2.6,1.5,3.5c0.9,0.9,2.2,1.5,3.5,1.5
	c37.8,0,54.7,8.6,74.3,20.2v14.3c-24-10.5-48.9-18.8-94.1-19.4V344.8z M12.1,344.8v116.4c-45.2,0.6-70.1,8.9-94.1,19.4v-14.3
	c19.6-11.6,36.5-20.2,74.3-20.2c1.3,0,2.6-0.5,3.5-1.5c0.9-0.9,1.5-2.2,1.5-3.5v-95.7C2.1,345.1,7.1,344.9,12.1,344.8z"
      />
      <Path
        fill={color}
        d="M-110.6,417.6c0.7,0.4,1.6,0.6,2.4,0.6c0.8,0,1.7-0.2,2.4-0.6l43.1-24.9c0.7-0.4,1.3-1,1.8-1.8
	c0.4-0.7,0.6-1.6,0.6-2.4c0-0.8-0.2-1.7-0.6-2.4c-0.4-0.7-1-1.3-1.8-1.8l-43.1-24.7c-0.7-0.4-1.6-0.6-2.4-0.6
	c-0.8,0-1.7,0.2-2.4,0.6c-0.7,0.4-1.3,1-1.8,1.8c-0.4,0.7-0.6,1.6-0.6,2.4v49.6c0,0.9,0.2,1.7,0.6,2.4
	C-112,416.5-111.3,417.2-110.6,417.6z M-103.4,372l28.7,16.6l-28.7,16.6V372z"
      />
    </Svg>
  )
}
