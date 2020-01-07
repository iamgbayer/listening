import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { theme } from 'styled-tools'
import { TouchableOpacity } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'

const Container = styled(TouchableOpacity)`
  width: 265;
  height: 220;
  margin-right: 20;
  background-color: ${theme('colors.secondary')};
  border-radius: ${theme('border.radius.fifteen')};
  overflow: hidden;
  box-shadow: ${theme('shadow.primary')};
`

const Skeleton = () => {
  const { colors } = useContext(ThemeContext)

  return (
    <Container>
      <ContentLoader
        width={265}
        height={220}
        speed={2}
        primaryColor={colors.quartiary}
        secondaryColor={colors.quartiary}
      >
        <Rect x="0" y="0" rx="0" ry="0" width="265" height="112" />
        <Rect x="20" y="130" rx="3" ry="3" width="120" height="8" />
        <Rect x="20" y="185" rx="3" ry="3" width="85" height="8" />
      </ContentLoader>
    </Container>
  )
}

export function Skeletons() {
  return (
    <>
      <Skeleton />
      <Skeleton />
    </>
  )
}
