import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, Text, Circle, Icon } from 'components'
import { filter, equals, pipe, length } from 'ramda'

import { getUser } from 'config'

const Understood = styled(Button)`
  margin-top: 25px;
`

getManyByStatus = (status, exercises) =>
  pipe(
    filter(exercice => equals(exercice.status, status)),
    length
  )(exercises)

export const AlreadyFinishedExercises = ({
  setInfo,
  exercises,
  navigation
}) => {
  const [user, setUser] = useState({})

  const howManyWin = getManyByStatus('WIN', exercises)
  const howManyLose = getManyByStatus('LOSE', exercises)

  useEffect(() => {
    getUser().then(setUser)
  }, [])

  return (
    <>
      <Text align={Text.align.center} size={Text.size.sixteen}>
        {user.displayName} you have done all the exercises of this story and it
        seems that you win {howManyWin} and lose {howManyLose}.
      </Text>

      <Understood
        full={true}
        onPress={async () => {
          await setInfo({
            visible: false
          })

          navigation.navigate('Stories')
        }}
        icon={({ width, height, background, color }) => (
          <Circle background={background}>
            <Icon width={width} height={height} color={color} name="right" />
          </Circle>
        )}
      >
        Find another story
      </Understood>
    </>
  )
}

AlreadyFinishedExercises.propTypes = {
  exercices: PropTypes.array.isRequired
}

AlreadyFinishedExercises.defaultProps = {
  exercices: []
}
