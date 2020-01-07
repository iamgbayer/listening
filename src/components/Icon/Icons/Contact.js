import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function Contact({ color, width, height }) {
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
        d="M0.283417 8.35833C0.283417 3.74935 4.03277 0 8.64175 0C13.2507 0 17.0001 3.74935 17.0001 8.35833C17.0001 12.9673 13.2507 16.7167 8.64175 16.7167C7.32708 16.7167 6.01893 16.4027 4.85103 15.8077L0.355384 16.9907C0.331584 16.9969 0.3075 17 0.283417 17C0.20635 17 0.130984 16.9685 0.0765836 16.9105C0.00546698 16.8345 -0.018333 16.726 0.0145336 16.6271L1.38728 12.5092C0.664784 11.2489 0.283417 9.81637 0.283417 8.35833ZM3.68342 8.5C3.68342 9.12503 4.19172 9.63333 4.81675 9.63333C5.44178 9.63333 5.95008 9.12503 5.95008 8.5C5.95008 7.87497 5.44178 7.36667 4.81675 7.36667C4.19172 7.36667 3.68342 7.87497 3.68342 8.5ZM8.50008 9.63333C7.87505 9.63333 7.36675 9.12503 7.36675 8.5C7.36675 7.87497 7.87505 7.36667 8.50008 7.36667C9.12512 7.36667 9.63342 7.87497 9.63342 8.5C9.63342 9.12503 9.12512 9.63333 8.50008 9.63333ZM11.0501 8.5C11.0501 9.12503 11.5584 9.63333 12.1834 9.63333C12.8084 9.63333 13.3167 9.12503 13.3167 8.5C13.3167 7.87497 12.8084 7.36667 12.1834 7.36667C11.5584 7.36667 11.0501 7.87497 11.0501 8.5Z"
        fill={color}
      />
    </Svg>
  )
}
