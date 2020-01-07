import React from 'react'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { TabBarLabel } from 'components'
import { Home, Profile, Stories } from 'screens'

const TabBarComponent = styled(BottomTabBar)`
  width: 100%;
  height: 80px;
  padding: 20px 0;
  border-top-color: ${theme('colors.primary')};
  background-color: ${theme('colors.primary')};
`

export const Main = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel focused={focused} title="Home" name="home" />
        )
      }
    },
    Stories: {
      screen: Stories,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel focused={focused} title="Stories" name="book" />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarLabel focused={focused} title="Profile" name="profile" />
        )
      }
    }
  },
  {
    swipeEnabled: true,
    tabBarComponent: TabBarComponent
  }
)
