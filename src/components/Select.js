import React, { memo, useState, useContext } from 'react'
import styled, { css, ThemeContext } from 'styled-components/native'
import PropTypes from 'prop-types'
import { ifProp, switchProp, theme } from 'styled-tools'
import { View } from 'react-native'

// import { Closeable } from './Closeable'
import { Icon } from './Icon'
import { Text } from './Text'

const defaultValue = {
  label: 'Select'
}

const Container = styled.View`
  width: ${ifProp('full', '100%', '240px')};
  display: flex;
  flex-direction: column;
  position: relative;
`

const Label = styled.View`
  margin-bottom: 8px;
  font-family: ${theme('font.family.primary')};
  font-size: ${theme('font.size.twenty')};
  font-weight: ${theme('font.weight.bold')};
  color: ${ifProp(
    'disabled',
    theme('field.text.disabled'),
    theme('field.text.primary')
  )};
  cursor: default;
  ${ifProp(
    'required',
    css`
      &::after {
        content: '*';
        color: ${ifProp(
          'disabled',
          theme('field.text.disabled'),
          theme('field.text.danger')
        )};
      }
    `
  )}
`

const Selectable = styled.View`
  width: 100%;
  height: ${switchProp('size', {
    small: '50px',
    default: '58px'
  })};
  padding: 0 16px;
  color: ${theme('colors.tertiary')};
  background-color: ${theme('colors.secondary')};
  border-radius: ${theme('border.radius.nine')};
  box-shadow: ${theme('shadow.primary')};
  font-family: ${theme('font.family.primary')};
  font-size: ${theme('font.size.twenty')};
  border: ${ifProp(
    'active',
    theme('field.border.secondary'),
    theme('field.border.primary')
  )};
  outline: 0;
  appearance: none;
  cursor: ${ifProp('disabled', 'not-allowed', 'pointer')};
  position: relative;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border: ${ifProp(
      'disabled',
      theme('field.border.primary'),
      theme('field.border.secondary')
    )};
  }
  ${ifProp(
    'icon',
    css`
      padding-left: 36px;
    `
  )}
`

const Options = styled.View`
  width: 100%;
  top: calc(100% + 4px);
  z-index: 999;
  position: absolute;
  border-radius: ${theme('border.radius.nine')};
  background-color: ${theme('colors.tertiary')};
  list-style: none;
  display: ${ifProp({ show: true }, 'block', 'none')};
`

const Option = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 14px;
  padding-right: 14px;
  cursor: pointer;
  font-size: ${theme('font.size.fourteen')};
  color: ${theme('colors.secondary')};
  font-weight: ${ifProp(
    'selected',
    theme('font.weight.bold'),
    theme('font.weight.regular')
  )};
  &:hover {
    color: ${theme('field.text.quaternary')};
    background-color: ${theme('field.bg.hover')};
  }
`

const Content = styled.View`
  display: flex;
  align-items: center;
  left: 16px;
  position: absolute;
  height: 40px;
  line-height: 40px;
`

const Title = styled.View`
  font-family: ${theme('font.family.primary')};
  font-size: ${theme('font.size.twenty')};
  font-weight: ${theme('font.weight.regular')};
  color: ${theme('colors.tertiary')};
  ${ifProp(
    'disabled',
    css`
      color: ${theme('field.text.disabled')};
    `
  )};
`

export const Select = memo(
  ({
    options,
    onChange,
    icon,
    defaultValue,
    label,
    disabled,
    required,
    full,
    size
  }) => {
    const { colors } = useContext(ThemeContext)
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(defaultValue)
    const [focus, setFocus] = useState(false)

    const toggleShow = () => setShow(!show)
    const toCloseOutside = () => {
      setShow(false)
      setFocus(false)
    }

    const whenSelected = ({ text, value }) => () => {
      toggleShow()
      setSelected(text)
      onChange(value)
    }

    const whenFocus = () => {
      setFocus(!focus)
    }

    const hasSelected = () => Select.defaultValue.label !== selected

    return (
      <Container full={full}>
        {label && (
          <Label required={required} disabled={disabled} onClick={whenFocus}>
            {label}
          </Label>
        )}

        <Closeable whenClose={toCloseOutside}>
          <Selectable
            size={size}
            icon={icon}
            active={show || focus}
            onClick={!disabled ? toggleShow : undefined}
            disabled={disabled}
          >
            {icon && (
              <Content>
                {icon({ width: 14, height: 14, color: colors.tertiary })}
              </Content>
            )}
            <Title
              hasSelected={Select.defaultValue.label !== selected}
              disabled={disabled}
            >
              {selected}
            </Title>

            <Icon
              name="down"
              width={6}
              color={hasSelected() ? colors.tertiary : colors.tertiary}
            />
          </Selectable>

          <Options show={show}>
            {options.map(({ value, text }) => (
              <Option
                key={value}
                selected={text === selected}
                value={value}
                onClick={whenSelected({ value, text })}
              >
                {text}
              </Option>
            ))}
          </Options>
        </Closeable>
      </Container>
    )
  }
)

Select.defaultProps = {
  size: 'default',
  defaultValue: defaultValue.label,
  onChange: () => {}
}

Select.propTypes = {
  defaultValue: PropTypes.string,
  icon: PropTypes.func,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

Select.defaultValue = defaultValue
