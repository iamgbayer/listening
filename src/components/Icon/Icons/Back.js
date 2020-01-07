import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Back({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M20 10C20 9.30964 19.4404 8.75 18.75 8.75H4.81263L10.9062 2.6564C11.4043 2.15835 11.3971 1.34869 10.8904 0.859505V0.859505C10.3961 0.38238 9.61069 0.389309 9.12492 0.87508L0.0990063 9.90099C0.0443264 9.95567 0.0443268 10.0443 0.0990067 10.099L9.12306 19.1231C9.60738 19.6074 10.3926 19.6074 10.8769 19.123V19.123C11.3596 18.6403 11.3614 17.8581 10.8808 17.3732L4.81263 11.25H18.75C19.4404 11.25 20 10.6904 20 10V10Z"
        fill={color}
      />
    </Svg>
  )
}
