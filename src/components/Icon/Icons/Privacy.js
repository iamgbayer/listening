import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Privacy({ color, width, height }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.09625 0.19125L8.5 0L8.90375 0.19125L16.3412 3.315L17 3.59125V4.25C17 7.7775 15.5763 10.88 13.8763 13.1538C13.0262 14.28 12.1125 15.215 11.22 15.8737C10.3275 16.5325 9.4775 17 8.5 17C7.54375 17 6.6725 16.5325 5.78 15.8737C4.8875 15.215 3.97375 14.28 3.12375 13.1538C1.42375 10.88 0 7.7775 0 4.25V3.59125L0.65875 3.315L8.09625 0.19125ZM8.5 14.875V2.3375L2.2525 4.93C2.4225 7.58625 3.485 10.0938 4.845 11.9C5.58875 12.8775 6.39625 13.7062 7.0975 14.2162C7.79875 14.7262 8.415 14.875 8.5 14.875Z"
        fill={color}
      />
    </Svg>
  )
}
