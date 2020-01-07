import React, { useContext, useState, useEffect, memo, useRef } from 'react'
import firestore from '@react-native-firebase/firestore'
import styled, { ThemeContext } from 'styled-components/native'
import ActionSheet from 'react-native-actionsheet'
import { theme } from 'styled-tools'
import { isEmpty, not, equals, isNil, call } from 'ramda'
import v4 from 'uuid/v4'

import {
  Text,
  Button,
  Icon,
  Circle,
  Player,
  Back,
  ActionSheet as ActionSheetable
} from 'components'
import {
  toMinutesAndSeconds,
  getExerciseNotInitiated,
  getExercisesWithoutCurrent
} from 'helpers'

import { Skeleton, Info } from './components'

import { getUser, db, batch } from 'config'

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 30px;
  padding-top: 40px;
  background-color: ${theme('colors.primary')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const Subtitle = styled(Text)`
  width: 100%;
  height: 80px;
`

const Exercices = styled(Button)`
  margin-bottom: 30px;
`

const Options = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 45;
  right: 25;
`

const ActionText = styled(Text)`
  letter-spacing: 1px;
  text-transform: uppercase;
`

export const Story = memo(({ navigation }) => {
  const action = useRef(null)
  const { colors } = useContext(ThemeContext)
  const [control, setControl] = useState(null)
  const [subtitle, setSubtitle] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [user, setUser] = useState({ uid: null })
  const [info, setInfo] = useState({
    visible: false
  })
  const [isFavorite, setIsFavorited] = useState(true)
  const [status, setStatus] = useState({
    positionMillis: 0,
    durationMillis: -1
  })

  const {
    source,
    subtitles,
    name,
    id: storyId,
    duration,
    category,
    difficulty
  } = navigation.state.params

  const options = [
    <ActionText color={colors.primary} weight={Text.weight.bold}>
      Close
    </ActionText>,
    <ActionText color={colors.tertiary} weight={Text.weight.medium}>
      Favorite
    </ActionText>,
    <ActionText color={colors.tertiary} weight={Text.weight.medium}>
      Something wrong?
    </ActionText>
  ]

  const stop = async () => await control.unloadAsync()

  const { positionMillis, durationMillis } = status

  const progress = toMinutesAndSeconds(positionMillis)

  const hasFinished =
    equals(positionMillis, durationMillis) && not(isNil(positionMillis))

  const favorite = async () => {
    const { uid } = user

    db.collection('users')
      .doc(uid)
      .update({
        favorites: firestore.FieldValue.arrayUnion(storyId)
      })
      .then(() => setIsFavorited(true))
  }

  const report = () => {}

  useEffect(() => {
    let isMounted = true

    setSubtitle(
      isMounted &&
        subtitles.find(({ end, start }) => progress >= start && progress <= end)
    )

    return () => (isMounted = false)
  }, [progress])

  useEffect(() => {
    let isMounted = true

    getUser().then(user => {
      isMounted && setUser(user)

      db.collection('users')
        .doc(user.uid)
        .get()
        .then(document => {
          const user = document.data()
          const isFavorited = Boolean(user?.favorites?.includes(storyId))

          setIsFavorited(isFavorited)
        })

      db.collection('users_exercises')
        .where('story', '==', storyId)
        .where('user', '==', user.uid)
        .get()
        .then(
          ({ docs }) =>
            isMounted && setExercises(docs.map(document => document.data()))
        )
    })

    return () => (isMounted = false)
  }, [])

  const syncExercises = async () => {
    const getAndCloneExercises = async () => {
      const { docs } = await db
        .collection('exercises')
        .where('story', '==', storyId)
        .get()

      const exercises = docs.map(document => document.data())

      exercises.forEach(async exercise => {
        const id = v4()

        const document = db.collection('users_exercises').doc(id)

        await batch.set(document, {
          ...exercise,
          id,
          user: user.uid
        })
      })

      await batch.commit()

      return exercises
    }

    return not(isEmpty(exercises)) ? exercises : await getAndCloneExercises()
  }

  return (
    <>
      <Container>
        <Back callable={stop} navigation={navigation} to="Stories">
          {name}
        </Back>

        <Info
          info={info}
          storyId={storyId}
          user={user}
          setInfo={setInfo}
          exercises={exercises}
          navigation={navigation}
        />

        <Options onPress={() => action.current?.show()}>
          <Icon
            name="dots"
            color={colors.support.tertiary}
            width={23}
            height={23}
          />
        </Options>

        {subtitle ? (
          <Subtitle
            align={Text.align.center}
            color={colors.tertiary}
            size={Text.size.twenty}
          >
            {subtitle.text}
          </Subtitle>
        ) : (
          <Skeleton />
        )}

        <Player
          setControl={setControl}
          setStatus={setStatus}
          status={status}
          control={control}
          data={{
            source
          }}
        />

        <Exercices
          onPress={() => {
            control && control.pauseAsync()

            if (not(hasFinished)) {
              return setInfo({
                visible: true,
                content: Info.contents.unfinishedAudio
              })
            }

            syncExercises().then(exercises => {
              const exercise = getExerciseNotInitiated(exercises)

              if (not(exercise)) {
                return setInfo({
                  visible: true,
                  content: Info.contents.alreadyFinishedExercises
                })
              }

              navigation.navigate('Exercise', {
                exercise,
                exercises: getExercisesWithoutCurrent(exercises, exercise)
              })
            })
          }}
          variant={hasFinished ? 'primary' : 'secondary'}
          full={true}
          icon={({ width, height, background, color }) => (
            <Circle background={background}>
              <Icon width={width} height={height} color={color} name="right" />
            </Circle>
          )}
        >
          Exercices
        </Exercices>

        <ActionSheet
          ref={action}
          options={options}
          cancelButtonIndex={0}
          styles={ActionSheetable.styles}
          onPress={index => {
            const mapping = {
              2: () =>
                setInfo({
                  visible: true,
                  content: Info.contents.fillReport
                }),
              1: () => not(isFavorite) && favorite()
            }

            const callable = mapping[index]

            not(isNil(callable)) && callable()
          }}
        />
      </Container>
    </>
  )
})
