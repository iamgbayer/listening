import React, { useEffect, memo, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Audio } from 'expo-av'
import { View, TouchableOpacity } from 'react-native'
import { not, isNil, or } from 'ramda'
import { theme, prop } from 'styled-tools'

import { toMinutesAndSeconds, totalSeconds } from 'helpers'
import { Text } from './Text'
import { Icon } from './Icon'

const Progressable = styled.View`
  width: 100%;
  height: 8;
  top: 25;
  right: 0;
  position: absolute;
  overflow: hidden;
  border-radius: ${theme('border.radius.five')};
  background-color: ${theme('colors.quartiary')};
`

const Progressed = styled.View`
  width: ${prop('time')}%;
  height: 8;
  left: 0;
  top: 0;
  position: absolute;
  border-radius: ${theme('border.radius.five')};
  background-color: ${theme('colors.support.primary')};
`

const Content = styled.View`
  width: 100%;
  position: relative;
`

const Progress = styled(Text)`
  position: absolute;
  top: 0
  left: 0;
`
const Duration = styled(Text)`
  position: absolute;
  top: 0
  right: 0;
`

const Execute = styled(TouchableOpacity)`
  width: 50;
  height: 50;
  border-radius: ${theme('border.radius.hundred')};
  background-color: ${theme('colors.support.primary')};
  box-shadow: ${theme('shadow.quartiary')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Position = styled(TouchableOpacity)`
  width: 30;
  height: 30;
  border-radius: ${theme('border.radius.hundred')};
  background-color: ${theme('colors.quartiary')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`

const Controls = styled.View`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-top: 55px;
`

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MILLISECONDS = 10000

const Timer = ({ time, progress, duration }) => {
  const { colors } = useContext(ThemeContext)

  return (
    <Content>
      <Progress color={colors.tertiary}>{progress}</Progress>
      <Duration color={colors.tertiary}>{duration}</Duration>
      <Progressable>
        <Progressed time={isNaN(time) ? 0 : time} />
      </Progressable>
    </Content>
  )
}

export const Player = memo(
  ({ data, control, setControl, status, setStatus }) => {
    const { colors } = useContext(ThemeContext)
    const { source } = data

    const build = async () => {
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: source
        },
        { positionMillis: 0, shouldPlay: true, durationMillis: 0, volume: 1.0 },
        setStatus
      )

      return sound
    }

    useEffect(() => {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true
      })

      build().then(setControl)

      return () => {
        control && control?.unloadAsync()
      }
    }, [])

    if (or(not(status), isNil(control))) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    const { durationMillis, positionMillis, isPlaying } = status

    const duration = toMinutesAndSeconds(durationMillis)
    const progress = toMinutesAndSeconds(positionMillis)

    const time = (
      (100 * totalSeconds(progress)) /
      totalSeconds(duration)
    ).toFixed(2)

    const size = isPlaying ? 20 : 22

    return (
      <Container>
        <Timer time={time} progress={progress} duration={duration} />

        <Controls>
          <Position
            onPress={() =>
              control?.setPositionAsync(positionMillis - MILLISECONDS)
            }
          >
            <Icon
              name="return"
              width={12}
              height={12}
              color={colors.tertiary}
            />
          </Position>

          <Execute
            onPress={() =>
              isPlaying && control
                ? control?.pauseAsync()
                : control?.playAsync()
            }
          >
            <Icon
              name={isPlaying ? 'pause' : 'play'}
              width={size}
              height={size}
              color={colors.tertiary}
            />
          </Execute>

          <Position
            onPress={() =>
              control?.setPositionAsync(positionMillis + MILLISECONDS)
            }
          >
            <Icon
              name="advance"
              width={12}
              height={12}
              color={colors.tertiary}
            />
          </Position>
        </Controls>
      </Container>
    )
  }
)
