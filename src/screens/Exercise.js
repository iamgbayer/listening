import React, { useContext, useEffect, useState, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import PropTypes from 'prop-types'
import useInterval from '@use-it/interval'

import { Text, Button, Icon, Circle, Close } from 'components'
import { theme, ifProp, prop } from 'styled-tools'
import { isNil, inc, divide, multiply, lte } from 'ramda'

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 30px;
  padding-top: 30%;
  background-color: ${theme('colors.primary')};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Option = styled.TouchableOpacity`
  width: 100%;
  height: 58px;
  background-color: ${theme('colors.primary')};
  border: 3px solid
    ${ifProp(
      { choosed: true },
      theme('colors.support.primary'),
      theme('colors.quartiary')
    )};
  border-radius: ${theme('border.radius.fifteen')};
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding: 0 20px;
`

const Options = styled.View`
  margin-top: 10%;
`

const Confirm = styled(Button)``

const Progressable = styled.View`
  width: 85%;
  height: 10;
  border-radius: ${theme('border.radius.five')};
  background-color: ${theme('colors.quartiary')};
  position: absolute;
  overflow: hidden;
  right: 30;
  top: 10%;
`

const Progressed = styled.View`
  width: ${prop('progressed')}%;
  height: 10;
  border-radius: ${theme('border.radius.five')};
  background-color: ${theme('colors.support.primary')};
  position: absolute;
  left: 0;
  top: 0;
`

const Progress = ({ progressed }) => (
  <Progressable>
    <Progressed progressed={progressed} />
  </Progressable>
)

const getDurationByDifficulty = {
  easy: 15,
  medium: 10,
  hard: 10
}

const getIntervalByDuration = (duration, maxDuration) =>
  lte(duration, maxDuration) ? 1000 : null

export const Exercise = memo(({ navigation }) => {
  const { exercise, exercises } = navigation.state.params
  const { options, question, difficulty } = exercise

  const maxDuration = Number(getDurationByDifficulty[difficulty])

  const { colors } = useContext(ThemeContext)
  const [choosed, setChoosed] = useState(null)
  const [duration, setDuration] = useState(1)

  const redirectToFeedback = () =>
    navigation.navigate('Feedback', {
      choosed,
      exercise,
      exercises
    })

  const confirm = async () => redirectToFeedback()

  const close = () => {}

  useInterval(() => {
    setDuration(inc)
  }, getIntervalByDuration(duration, maxDuration))

  useEffect(() => {
    isNil(getIntervalByDuration(duration, maxDuration)) && redirectToFeedback()
  }, [duration])

  return (
    <Container>
      <Close onPress={close}></Close>

      <Progress progressed={multiply(divide(duration, maxDuration), 100)} />

      <Text
        color={colors.tertiary}
        size={Text.size.thirty}
        weight={Text.weight.bold}
        align={Text.align.center}
      >
        {question}
      </Text>

      <Options>
        {options.map(option => (
          <Option
            key={option}
            onPress={() => setChoosed(option)}
            choosed={choosed === option}
          >
            <Text
              size={Text.size.sixteen}
              weight={Text.weight.medium}
              color={
                choosed === option ? colors.support.primary : colors.tertiary
              }
            >
              {option}
            </Text>
          </Option>
        ))}
      </Options>

      <Confirm
        onPress={confirm}
        disabled={!choosed}
        full={true}
        icon={({ width, height, background, color }) => (
          <Circle background={background}>
            <Icon width={width} height={height} color={color} name="right" />
          </Circle>
        )}
      >
        Confirm
      </Confirm>
    </Container>
  )
})

Exercise.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        exercise: PropTypes.shape({
          category: PropTypes.string.isRequired,
          correct: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          options: PropTypes.arrayOf(PropTypes.string),
          order: PropTypes.number.isRequired,
          question: PropTypes.string.isRequired,
          status: PropTypes.oneOf(['NOT_INITIATED']).isRequired,
          story: PropTypes.string.isRequired,
          type: PropTypes.oneOf(['multiple']).isRequired
        })
      })
    })
  })
}
