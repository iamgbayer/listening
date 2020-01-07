import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import PropTypes from 'prop-types'

import { View, TouchableOpacity } from 'react-native'

import { Icon } from '../Icon'
import { Text } from '../Text'

const Backable = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 6;
`

const Center = styled.View`
  position: relative;
  width: 100%;
  height: 30;
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const Back = ({ callable, navigation, children, to }) => {
  const { colors } = useContext(ThemeContext)

  return (
    <Center>
      <Backable
        onPress={async () => {
          await callable()
          navigation.navigate(to)
        }}
      >
        <Icon name="back" color={colors.support.secondary} />
      </Backable>
      <Text
        weight={Text.weight.bold}
        size={Text.size.sixteen}
        color={colors.support.secondary}
      >
        {children}
      </Text>
    </Center>
  )
}

Back.defaultProps = {
  callable: () => {}
}

Back.propTypes = {
  callable: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired
}
