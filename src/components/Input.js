import React, { useState, useContext } from 'react'
import styled, { css, ThemeContext } from 'styled-components/native'
import { ifProp, switchProp, theme } from 'styled-tools'
import { View, TextInput } from 'react-native'

const iconAlign = {
  left: 'left',
  right: 'right'
}

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Inputable = styled.TextInput`
  height: ${switchProp('size', {
    small: '50px',
    default: '58px',
    large: '70px'
  })};
  padding: 11px 14px;
  font-size: ${theme('font.size.twenty')};
  color: ${theme('colors.tertiary')};
  background-color: ${theme('colors.secondary')};
  border-radius: ${theme('border.radius.nine')};
  box-shadow: ${theme('shadow.primary')};
  border: 1px solid
    ${ifProp(
      'hasError',
      theme('field.border.danger'),
      theme('colors.secondary')
    )};
  ${ifProp(
    'icon',
    switchProp('iconAlign', {
      [iconAlign.left]: css`
        padding-left: 36px;
      `,
      [iconAlign.right]: css`
        padding-right: 36px;
      `
    }),
    null
  )}

  &:focus {
    outline: none;
    border: 1px solid
      ${ifProp(
        'hasError',
        theme('colors.support.quintiary'),
        theme('colors.secondary')
      )};
  }

  &::placeholder {
    font-weight: ${theme('font.weight.regular')};
    color: ${ifProp(
      'hasError',
      theme('colors.support.quintiary'),
      theme('colors.tertiary')
    )};
    ${ifProp(
      'disabled',
      css`
        color: ${theme('field.text.disabled')};
      `
    )};
  }
`

const Message = styled.View`
  margin-top: 8px;
  color: ${theme('colors.support.quintiary')};
`

const Content = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 999;
  border-radius: ${theme('border.radius.nine')};
  background-color: ${theme('colors.support.secondary')};
  box-shadow: ${theme('shadow.secondary')};
  top: ${switchProp('size', {
    small: '4px',
    default: '8px',
    large: '10px'
  })};

  ${switchProp('iconAlign', {
    left: css`
      left: 10px;
    `,
    right: css`
      right: 10px;
    `
  })};
`

export function Input({
  value,
  typing,
  onChange,
  placeholder,
  icon,
  iconAlign,
  error,
  success,
  required,
  disabled,
  size,
  ...props
}) {
  const { colors } = useContext(ThemeContext)
  const [text, setText] = useState(value)

  const whenChange = value => {
    setText(value)
    onChange(value)
  }

  return (
    <Container>
      {icon && (
        <Content size={size} iconAlign={iconAlign}>
          {icon({
            width: 18,
            height: 18,
            color: colors.secondary
          })}
        </Content>
      )}

      <Inputable
        value={text}
        size={size}
        hasError={error.has}
        icon={icon}
        iconAlign={iconAlign}
        onChangeText={whenChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...props}
      />

      {error.has && <Message>{error.message}</Message>}
    </Container>
  )
}

Input.defaultProps = {
  value: '',
  size: 'default',
  placeholder: '',
  iconAlign: iconAlign.right,
  onChange: () => {},
  error: {
    has: false
  },
  success: {
    has: false
  },
  disabled: false,
  required: false
}
