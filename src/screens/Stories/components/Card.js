import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import PropTypes from 'prop-types'

import { Text } from 'components'

import { Container } from './Container'

const Content = styled.View`
  padding: 10px;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Cover = styled.Image`
  width: 100%;
  height: 70;
`

const Details = styled.View`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`

const Detail = styled(Text)`
  opacity: 0.6;
`

export function Card({ onPress, data }) {
  const { colors } = useContext(ThemeContext)

  const { image, name, duration } = data

  return (
    <Container onPress={onPress}>
      <Cover source={{ uri: image }}></Cover>
      <Content>
        <Text color={colors.tertiary} size={Text.size.fourteen}>
          {name}
        </Text>

        <Details>
          <Detail size={Text.size.fourteen} color={colors.tertiary}>
            {duration}
          </Detail>
        </Details>
      </Content>
    </Container>
  )
}

Card.propTypes = {
  onPress: PropTypes.func.isRequired
}
