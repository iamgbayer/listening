import React, { useContext } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { theme } from 'styled-tools'

import { Text } from 'components'
import { getDifficultyText } from 'helpers'

const Container = styled.View`
  width: 265;
  height: 220;
  margin-right: 20;
  border-radius: ${theme('border.radius.fifteen')};
  overflow: hidden;
  background-color: ${theme('colors.secondary')};
  box-shadow: ${theme('shadow.primary')};
`

const Pressable = styled(TouchableOpacity)``

const Body = styled.View`
  padding: 20px;
`

const Details = styled.View`
  margin-top: 30;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

const Detail = styled(Text)`
  opacity: 0.6;
`

export function Card({ onPress, data }) {
  const { colors } = useContext(ThemeContext)
  const { image, name, difficulty, duration } = data

  return (
    <Container>
      <Pressable onPress={onPress}>
        <Image style={{ width: '100%', height: 110 }} source={{ uri: image }} />
        <Body>
          <Text
            color={colors.tertiary}
            size={Text.size.sixteen}
            weight={Text.weight.bold}
          >
            {name}
          </Text>

          <Details>
            <Detail size={Text.size.fourteen} color={colors.tertiary}>
              {getDifficultyText[difficulty]}
            </Detail>

            <Detail size={Text.size.fourteen} color={colors.tertiary}>
              {duration}
            </Detail>
          </Details>
        </Body>
      </Pressable>
    </Container>
  )
}
