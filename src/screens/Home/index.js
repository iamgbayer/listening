import React, { useContext, useEffect, useState, memo } from 'react'
import { ScrollView, View } from 'react-native'
import { theme } from 'styled-tools'
import styled, { ThemeContext } from 'styled-components/native'
import { map, isEmpty, not, isNil } from 'ramda'
import dayjs from 'dayjs'

import { Text } from 'components'
import { getUser } from 'config'
import { isReady } from 'helpers'
import { db } from 'config'

import { Card, Skeletons } from './components'

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${theme('colors.primary')};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`

const Content = styled.View`
  width: 300;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Description = styled(Text)`
  text-align: center;
  opacity: 0.8;
  margin-top: 10px;
`

const Progress = styled(Text)`
  text-transform: uppercase;
  margin-left: 35;
  margin-bottom: 15;
`

export const Home = memo(({ navigation }) => {
  const [favorites, setFavorites] = useState([])
  const [data, setData] = useState([])
  const [user, setUser] = useState({})
  const { colors } = useContext(ThemeContext)

  const hasFavorites = not(isNil(favorites)) && not(isEmpty(favorites))

  useEffect(() => {
    let isMounted = true

    getUser().then(user => {
      setUser(user)

      db.collection('users')
        .doc(user.uid)
        .get()
        .then(document => {
          const user = document.data()

          if (isMounted) {
            setFavorites(user?.favorites)
          }
        })
    })

    return () => (isMounted = false)
  }, [])

  useEffect(() => {
    hasFavorites &&
      db
        .collection('stories')
        .where('id', 'in', favorites)
        .get()
        .then(({ docs }) => {
          setData(docs.map(document => document.data()))
        })
  }, [favorites])

  return (
    <Container>
      <Content>
        <Text
          size={Text.size.thirty}
          weight={Text.weight.bold}
          color={colors.tertiary}
          align={Text.align.center}
        >
          Hi, {user.displayName}
        </Text>

        <Description
          align={Text.align.center}
          size={Text.size.twenty}
          color={colors.tertiary}
        >
          How about listening to some story today and improving your English?
        </Description>
      </Content>

      <View>
        <Progress
          size={Text.size.sixteen}
          weight={Text.weight.bold}
          color={colors.tertiary}
        >
          Favorite stories
        </Progress>

        <ScrollView
          style={{ marginLeft: 35, maxHeight: 220 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {isReady(data) ? (
            map(story => (
              <Card
                key={story.id}
                data={story}
                onPress={() => navigation.navigate('Story', story)}
              />
            ))(data)
          ) : (
            <Skeletons />
          )}
        </ScrollView>
      </View>
    </Container>
  )
})

Home.navigationOptions = {
  header: null,
  unmountInactiveRoutes: true
}
