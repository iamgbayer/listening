import React, { useContext } from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { ThemeContext } from 'styled-components'

const Skeleton = () => {
  const { colors } = useContext(ThemeContext)

  return (
    <ContentLoader
      height={75}
      speed={2}
      primaryColor={colors.quartiary}
      secondaryColor={colors.quartiary}
    >
      <Rect x="78" y="40" rx="3" ry="3" width="110" height="8" />
      <Rect x="78" y="60" rx="3" ry="3" width="150" height="8" />

      <Rect x="22" y="0" rx="0" ry="0" width="2" height="30" />
      <Circle cx="23" cy="55" r="4" />
    </ContentLoader>
  )
}

export default function Skeletons() {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  )
}
