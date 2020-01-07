import React, { useContext } from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { ThemeContext } from 'styled-components'

import { Container } from './Container'

const Skeleton = () => {
  const { colors } = useContext(ThemeContext)

  return (
    <Container>
      <ContentLoader
        width={140}
        height={150}
        speed={2}
        primaryColor={colors.quartiary}
        secondaryColor={colors.quartiary}
      >
        <Rect x="0" y="0" rx="0" ry="0" width="140" height="70" />
        <Rect x="20" y="90" rx="3" ry="3" width="80" height="8" />
        <Rect x="20" y="108" rx="3" ry="3" width="55" height="8" />
      </ContentLoader>
    </Container>
  )
}

export function Skeletons() {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  )
}
