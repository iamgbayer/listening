import * as Font from 'expo-font'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

import { Tokens } from 'components'

import { App as Navigator } from 'navigations'

console.disableYellowBox = true

export default function App() {
  useEffect(() => {
    SplashScreen.hide()

    loadResources()
  }, [])

  return (
    <ThemeProvider theme={Tokens}>
      <StatusBar barStyle="dark-content" />
      <Navigator />
    </ThemeProvider>
  )
}

async function loadResources() {
  await Promise.all([
    Font.loadAsync({
      'hk-grotesk-bold': require('./src/assets/fonts/HKGrotesk-Bold.otf'),
      'hk-grotesk-medium': require('./src/assets/fonts/HKGrotesk-Medium.otf'),
      'hk-grotesk-regular': require('./src/assets/fonts/HKGrotesk-Regular.otf'),
      'hk-grotesk-light': require('./src/assets/fonts/HKGrotesk-Light.otf')
    })
  ])
}
