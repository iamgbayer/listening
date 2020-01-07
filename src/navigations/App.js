import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'

import { Auth } from './Auth'
import { Main } from './Main'
import { Middleware, Story, Settings, Exercise, Feedback } from 'screens'

export const App = createAppContainer(
  createAnimatedSwitchNavigator(
    {
      Middleware,
      Auth,
      Main,
      Settings,
      Story,
      Exercise,
      Feedback
    },
    {
      initialRouteName: 'Middleware',
      transition: (
        <Transition.Together>
          <Transition.Out
            type="slide-left"
            durationMs={200}
            interpolation="easeIn"
          />
          <Transition.In type="fade" durationMs={300} />
        </Transition.Together>
      )
    }
  )
)
