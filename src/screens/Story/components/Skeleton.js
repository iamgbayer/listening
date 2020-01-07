import React, { useContext } from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { ThemeContext } from 'styled-components'

export const Skeleton = () => {
  const { colors } = useContext(ThemeContext)

  return (
    <ContentLoader
      speed={2}
      height={80}
      primaryColor={colors.quartiary}
      secondaryColor={colors.quartiary}
    >
      <Rect x="30" y="0" rx="4" ry="4" width="85%" height="10" />
      <Rect x="30" y="25" rx="4" ry="4" width="85%" height="10" />
      <Rect x="30" y="50" rx="4" ry="4" width="85%" height="10" />
    </ContentLoader>
  )
}
