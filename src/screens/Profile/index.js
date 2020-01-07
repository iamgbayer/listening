import React, { useEffect, useState, useContext } from 'react'
import styled, { ThemeContext, css } from 'styled-components/native'
import { theme, ifProp } from 'styled-tools'
import { AsyncStorage, Platform } from 'react-native'
import { pipe, map, prop, reduce, add, gt, lte } from 'ramda'
import { firebase } from '@react-native-firebase/auth'
import Rate, { AndroidMarket } from 'react-native-rate'

import { getUser, db } from 'config'
import { Text, Icon, Button, Circle } from 'components'
import { getXpByDifficulty } from 'helpers'
import { Info } from './components'

const subscriptions = Platform.select({
  ios: ['monthly'],
  android: ['monthly']
})

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${theme('colors.primary')};
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${ifProp(
    { isGreatDevice: true },
    css`
      padding-top: 50px;
    `
  )}
`

const Pic = styled.View`
  width: 130;
  height: 130;
  background-color: ${theme('colors.secondary')};
  border-radius: ${theme('border.radius.hundred')};
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Imageable = styled.Image`
  width: 112;
  height: 112;
  border-radius: ${theme('border.radius.fiveHundred')};
`

const User = styled.View`
  flex: 1;
  ${ifProp(
    { isLowDevice: true },
    css`
      margin-bottom: 5px;
    `
  )}
`

const Logout = styled(Button)`
  margin: ${ifProp({ isLowDevice: true }, '20px', '30px')} 0;
`

const Content = styled.View`
  width: 100%;
  border-radius: ${theme('border.radius.fifteen')};
  background-color: ${theme('colors.secondary')};
  box-shadow: ${theme('shadow.primary')};
  padding: 10px 20px;
`

const Detail = styled.View`
  width: 38;
  height: 38;
  border-radius: ${theme('border.radius.hundred')};
  background-color: ${theme('colors.support.seventiary')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20;
`

const Option = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px 0;
`

export function Profile({ navigation }) {
  const { colors, window } = useContext(ThemeContext)
  const [xp, setXp] = useState(0)
  const [user, setUser] = useState({})
  const [info, setInfo] = useState({
    visible: false
  })

  const { height } = window

  const logout = async () => {
    await AsyncStorage.clear()
    await firebase.auth().signOut()

    navigation.navigate('Login')
  }

  useEffect(() => {
    let isMounted = true

    getUser().then(user => {
      setUser(user)

      db.collection('users_exercises')
        .where('user', '==', user.uid)
        .where('status', '==', 'WIN')
        .get()
        .then(({ docs }) => {
          const xp = pipe(
            map(
              document => getXpByDifficulty[prop('difficulty')(document.data())]
            ),
            reduce((acc, next) => add(acc, next), 0)
          )(docs)

          isMounted && setXp(xp)
        })
    })

    return () => (isMounted = false)
  }, [])

  return (
    <Container isGreatDevice={gt(height, 592)}>
      <User isLowDevice={lte(height, 592)}>
        <Pic>
          <Imageable
            source={{
              uri: `${user.photoURL}?sz=110`
            }}
          />
        </Pic>

        <Text
          align={Text.align.center}
          color={colors.tertiary}
          weight={Text.weight.bold}
          size={Text.size.thirty}
        >
          {user.displayName}
        </Text>
        <Text
          align={Text.align.center}
          color={colors.tertiary}
          weight={Text.weight.medium}
          size={Text.size.twenty}
        >
          {xp} XP
        </Text>
      </User>

      <Content>
        <Option
          onPress={() =>
            Rate.rate(
              {
                GooglePackageName: 'com.learnenglish.core',
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: false,
                openAppStoreIfInAppFails: true
              },
              () => {
                db.collection('users')
                  .doc(user.uid)
                  .set({ rated: true }, { merge: true })
              }
            )
          }
        >
          <Detail>
            <Icon name="star" color={colors.secondary} width={18} height={18} />
          </Detail>

          <Text
            size={Text.size.twenty}
            color={colors.tertiary}
            weight={Text.weight.medium}
          >
            Rate on Play Store
          </Text>
        </Option>

        <Option>
          <Detail>
            <Icon
              name="privacy"
              color={colors.secondary}
              width={18}
              height={18}
            />
          </Detail>

          <Text
            size={Text.size.twenty}
            color={colors.tertiary}
            weight={Text.weight.medium}
          >
            Privacy & Terms
          </Text>
        </Option>

        <Option
          onPress={() =>
            setInfo({
              visible: true,
              content: Info.contents.fillReport
            })
          }
        >
          <Detail>
            <Icon
              name="contact"
              color={colors.secondary}
              width={18}
              height={18}
            />
          </Detail>

          <Text
            size={Text.size.twenty}
            color={colors.tertiary}
            weight={Text.weight.medium}
          >
            Contact Us
          </Text>
        </Option>
      </Content>

      <Logout
        isLowDevice={lte(height, 592)}
        onPress={logout}
        full={true}
        icon={({ width, height, background, color }) => (
          <Circle background={background}>
            <Icon width={width} height={height} color={color} name="right" />
          </Circle>
        )}
      >
        Logout
      </Logout>

      <Info info={info} setInfo={setInfo} user={user} />
    </Container>
  )
}

Profile.navigationOptions = {
  header: null
}
