import React, { useContext } from 'react'
import { AsyncStorage } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'
import { theme } from 'styled-tools'
import { firebase } from '@react-native-firebase/auth'
import dayjs from 'dayjs'
import { GoogleSignin } from '@react-native-community/google-signin'

import { Button, Icon, Circle, Text } from 'components'
import { db } from 'config'

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 30px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${theme('colors.primary')};
`

const Buttonable = styled(Button)`
  margin-top: 180px;
  margin-bottom: 50px;
`

const Description = styled(Text)`
  margin-top: 20px;
`

export function Login({ navigation }) {
  const { colors } = useContext(ThemeContext)

  const login = async () => {
    await GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      offlineAccess: true,
      webClientId:
        '610204045908-rm9da7s42q19p5k2f0em843cl2egmkg2.apps.googleusercontent.com'
    })

    const { accessToken, idToken } = await GoogleSignin.signIn()

    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      accessToken
    )

    const { user } = await firebase.auth().signInWithCredential(credential)

    await db
      .collection('users')
      .doc(user.uid)
      .set({
        id: user.uid,
        isAdmin: false,
        rated: false,
        createdAt: user.metadata.creationTime
      })

    await AsyncStorage.setItem('user', JSON.stringify(user))

    navigation.navigate('Main')
  }

  return (
    <Container>
      <Icon width={130} height={130} color={colors.tertiary} name="logo" />

      <Description
        align={Text.align.center}
        color={colors.tertiary}
        size={Text.size.twenty}
        weight={Text.weight.medium}
      >
        Learn English by listening short stories and doing some exercise!
      </Description>

      <Buttonable
        onPress={login}
        full={true}
        icon={({ width, height, background, color }) => (
          <Circle background={background}>
            <Icon width={width} height={height} color={color} name="right" />
          </Circle>
        )}
      >
        Login with Google
      </Buttonable>
    </Container>
  )
}

Login.navigationOptions = {
  header: null
}
