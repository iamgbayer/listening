import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

export default function Skeleton() {
  const { colors } = useContext(ThemeContext)

  return (
    <ContentLoader
      height={50}
      speed={2}
      primaryColor={colors.quartiary}
      secondaryColor={colors.quartiary}
    >
      <Rect x="75" y="25" rx="4" ry="4" width="60" height="8" />
      <Circle cx="23" cy="22" r="22" />
    </ContentLoader>
  )
}
