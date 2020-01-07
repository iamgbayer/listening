import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { default as Modalable } from 'react-native-modal'
import { theme } from 'styled-tools'

const Content = styled.View`
  background-color: ${theme('colors.primary')};
  padding: 30px 20px;
  border-radius: ${theme('border.radius.nine')};
`

export const Modal = memo(({ children, isVisible, onModalHide }) => {
  return (
    <Modalable
      isVisible={isVisible}
      onModalHide={onModalHide}
      onBackdropPress={onModalHide}
    >
      <Content>{children}</Content>
    </Modalable>
  )
})

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onModalHide: PropTypes.func.isRequired
}
