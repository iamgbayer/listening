import React, { useContext } from 'react'
import styled, { css, ThemeContext } from 'styled-components/native'
import { TouchableOpacity, View } from 'react-native'
import { ifProp, switchProp, theme } from 'styled-tools'

import { Text as Texteable } from '../Text'

const Container = styled(TouchableOpacity)`
  width: ${ifProp({ full: true }, '100%', 'unset')};
  height: ${switchProp('size', {
    small: 50,
    default: 58
  })};
  background-color: ${switchProp('variant', {
    primary: theme('colors.support.secondary'),
    secondary: theme('colors.quartiary'),
    tertiary: theme('colors.quintiary'),
    disabled: theme('colors.quartiary')
  })};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: ${theme('border.radius.fifteen')};
  position: relative;

  ${switchProp('variant', {
    primary: css`
      box-shadow: ${theme('shadow.secondary')};
    `,
    tertiary: css`
      box-shadow: ${theme('shadow.support.tertiary')};
    `
  })};
`

const Text = styled(Texteable)`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const Icon = styled.View`
  right: 15px;
  position: absolute;
`

export const Button = ({
  size,
  full,
  variant,
  children,
  icon,
  onPress,
  disabled,
  ...props
}) => {
  const { colors } = useContext(ThemeContext)

  return (
    <Container
      onPress={value => (disabled ? null : onPress(value))}
      size={size}
      full={full}
      variant={disabled ? 'disabled' : variant}
      {...props}
    >
      <Text
        color={disabled ? colors.support.quintiary : colors.secondary}
        weight={Text.weight.bold}
      >
        {children}
      </Text>

      {icon && (
        <Icon>
          {icon({
            width: 15,
            height: 15,
            background:
              disabled || variant === 'secondary'
                ? colors.quartiary
                : variant === 'primary'
                ? colors.support.tertiary
                : colors.support.sextiary,
            color:
              disabled || variant === 'secondary'
                ? colors.support.quintiary
                : colors.secondary
          })}
        </Icon>
      )}
    </Container>
  )
}

Button.variant = {
  primary: 'primary',
  tertiary: 'tertiary'
}

Button.defaultProps = {
  variant: 'primary',
  size: 'default',
  disabled: false,
  full: false
}
