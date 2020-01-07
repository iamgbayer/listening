import React, { memo, useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { theme, prop } from 'styled-tools'
import { TabView, SceneMap } from 'react-native-tab-view'

import { Text } from '../Text'

const Firstly = styled.TouchableOpacity`
  width: ${prop('width')}%;
  border-top-start-radius: ${theme('border.radius.fifteen')};
  border-bottom-start-radius: ${theme('border.radius.fifteen')};
  background-color: ${theme('colors.secondary')};
  padding: 14px 15px;
`
const Lastly = styled.TouchableOpacity`
  width: ${prop('width')}%;
  padding: 14px 15px;
  background-color: ${theme('colors.secondary')};
  border-top-end-radius: ${theme('border.radius.fifteen')};
  border-bottom-end-radius: ${theme('border.radius.fifteen')};
`

const Middle = styled.TouchableOpacity`
  width: ${prop('width')}%;
  padding: 14px 15px;
  background-color: ${theme('colors.secondary')};
  margin: 0px 2px;
`

const Title = styled(Text)`
  letter-spacing: 1px;
  text-transform: uppercase;
`

const Tab = styled.View`
  width: 100%;
  padding: 0 30px;
  height: 100%;
`

const Content = styled.View`
  display: flex;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 30;
  padding: 0 30px;
  flex-direction: row;
  justify-content: center;
  background-color: transparent;
  box-shadow: ${theme('shadow.primary')};
`

const tabBar = colors => ({ navigationState, jumpTo }) => {
  const eachWidth = 100 / navigationState.routes.length

  const [first, ...middle] = navigationState.routes

  const last = middle.pop()

  const isActive = route =>
    navigationState.routes.indexOf(route) === navigationState.index

  return (
    <Content>
      <Firstly width={eachWidth} onPress={() => jumpTo(first.key)}>
        <Title
          align={Title.align.center}
          size={Title.size.fourteen}
          weight={isActive(first) ? Title.weight.bold : Text.weight.regular}
          color={isActive(first) ? colors.support.primary : colors.tertiary}
        >
          {first.title}
        </Title>
      </Firstly>
      {middle.map(route => {
        return (
          <Middle
            width={eachWidth}
            key={route.key}
            onPress={() => jumpTo(route.key)}
          >
            <Title
              align={Title.align.center}
              size={Title.size.fourteen}
              weight={isActive(route) ? Title.weight.bold : Text.weight.regular}
              color={isActive(route) ? colors.support.primary : colors.tertiary}
            >
              {route.title}
            </Title>
          </Middle>
        )
      })}
      <Lastly width={eachWidth} onPress={() => jumpTo(last.key)}>
        <Title
          align={Title.align.center}
          size={Title.size.fourteen}
          weight={isActive(last) ? Title.weight.bold : Text.weight.regular}
          color={isActive(last) ? colors.support.primary : colors.tertiary}
        >
          {last.title}
        </Title>
      </Lastly>
    </Content>
  )
}

export const Tabs = memo(({ state, scenes }) => {
  const [tabs, setTabs] = useState({
    index: 0,
    routes: state
  })

  const { colors, window } = useContext(ThemeContext)

  return (
    <TabView
      navigationState={tabs}
      renderTabBar={tabBar(colors)}
      renderScene={SceneMap(scenes)}
      onIndexChange={index => setTabs(tabs => ({ ...tabs, index }))}
      initialLayout={{ width: window.width }}
    />
  )
})

Tabs.Tab = Tab
