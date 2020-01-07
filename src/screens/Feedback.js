import React, { useContext, useEffect, memo, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import { View } from 'react-native'
import Confetti from 'react-native-confetti'

import { Button, Circle, Icon, Text, Close } from 'components'

import {
  getExerciseNotInitiated,
  getExercisesWithoutCurrent,
  getXpByDifficulty
} from 'helpers'

import { db } from 'config'
import { isNil, not, equals, ifElse, always, pipe } from 'ramda'

const Container = styled(View)`
  width: 100%;
  height: 100%;
  padding: 0 30px;
  padding-top: 40px;
  background-color: ${theme('colors.primary')};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`

const Circleable = styled(View)`
  width: 175;
  height: 175;
  border-radius: ${theme('border.radius.hundred')};
  border-width: 15px;
  border-color: ${ifProp(
    { isCorrect: true },
    theme('colors.support.primary'),
    theme('colors.quintiary')
  )};
  box-shadow: ${ifProp(
    { isCorrect: true },
    theme('shadow.quartiary'),
    theme('shadow.tertiary')
  )};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Iconable = styled(View)`
  width: 55;
  height: 55;
  border-radius: ${theme('border.radius.hundred')};
  background-color: ${ifProp(
    { isCorrect: true },
    theme('colors.support.primary'),
    theme('colors.quintiary')
  )};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Xp = styled(View)`
  width: 110;
  height: 53;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme('colors.support.secondary')};
  border-radius: ${theme('border.radius.fifty')};
  box-shadow: ${theme('shadow.secondary')};
  margin-top: -40px;
  margin-bottom: 30px;
`

const Next = styled(Button)`
  margin-top: 120px;
  margin-bottom: 30px;
`

export const Feedback = memo(({ navigation }) => {
  const { colors } = useContext(ThemeContext)
  const confetti = useRef(null)

  const { choosed, exercise, exercises } = navigation.state.params

  const isCorrect = ifElse(
    pipe(isNil, not),
    always(equals(choosed, exercise.correct)),
    always(false)
  )(choosed)

  useEffect(() => {
    isCorrect && confetti.current?.startConfetti()
  }, [confetti.current])

  const next = () => {
    const exercise = getExerciseNotInitiated(exercises)

    exercise
      ? navigation.navigate('Exercise', {
          exercise,
          exercises: getExercisesWithoutCurrent(exercises, exercise)
        })
      : navigation.navigate('Stories')
  }

  const home = () => navigation.navigate('Home')

  useEffect(() => {
    db.collection('users_exercises')
      .doc(exercise.id)
      .update({
        status: isCorrect ? 'WIN' : 'LOSE'
      })
  }, [])

  return (
    <Container>
      <Confetti ref={confetti} untilStopped={true} />

      <Close onPress={home} />

      <Circleable isCorrect={isCorrect}>
        <Iconable isCorrect={isCorrect}>
          <Icon
            width={20}
            height={20}
            name={isCorrect ? 'correct' : 'close'}
            color={colors.quartiary}
          />
        </Iconable>
      </Circleable>

      <Xp>
        <Text
          align={Text.align.center}
          size={Text.size.twenty}
          weight={Text.weight.bold}
          color={colors.quartiary}
        >
          +{isCorrect ? getXpByDifficulty[exercise.difficulty] : 0} XP
        </Text>
      </Xp>

      <Text
        weight={Text.weight.bold}
        size={Text.size.twenty}
        color={colors.tertiary}
      >
        {isCorrect ? 'You are awesome!' : "It wasn't this time"}
      </Text>
      <Text
        align={Text.align.center}
        weight={Text.weight.regular}
        size={Text.size.twenty}
        color={colors.tertiary}
      >
        {isCorrect
          ? 'Congratulations for getting the correct answer'
          : 'The correct answer would be'}
        ,{' '}
        <Text
          weight={Text.weight.bold}
          size={Text.size.twenty}
          color={colors.tertiary}
        >
          {exercise.correct}
        </Text>
      </Text>

      <Next
        onPress={next}
        full={true}
        icon={({ width, height, background, color }) => (
          <Circle background={background}>
            <Icon width={width} height={height} color={color} name="right" />
          </Circle>
        )}
      >
        Next
      </Next>
    </Container>
  )
})
