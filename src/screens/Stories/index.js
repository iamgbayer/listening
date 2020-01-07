import React, { useEffect, useState, memo } from 'react'
import { ScrollView } from 'react-native'
import { theme } from 'styled-tools'
import styled from 'styled-components/native'

import { isReady } from 'helpers'
import { Input, Icon } from 'components'
import { db } from 'config'

import { Card, Skeletons } from './components'
import { not, isEmpty, filter, map, toLower, pipe } from 'ramda'

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 30px;
  padding-top: 40px;
  background-color: ${theme('colors.primary')};
`

const content = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginTop: 30
}

export const Stories = memo(({ navigation }) => {
  const [stories, setStories] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    let isMounted = true

    db.collection('stories')
      .get()
      .then(
        ({ docs }) =>
          isMounted && setData(docs.map(document => document.data()))
      )

    return () => (isMounted = false)
  }, [])

  useEffect(() => {
    not(isEmpty(data)) &&
      pipe(
        map(story => ({ ...story, nameLowercaseOnly: toLower(story.name) })),
        filter(({ nameLowercaseOnly }) => nameLowercaseOnly.includes(search)),
        setStories
      )(data)
  }, [data, search])

  return (
    <Container>
      <Input
        size="large"
        value={search}
        onChange={setSearch}
        placeholder="Search for a story"
        icon={({ width, height, color }) => (
          <Icon width={width} height={height} color={color} name="search" />
        )}
      />

      <ScrollView
        horizontal={false}
        contentContainerStyle={content}
        showsVerticalScrollIndicator={false}
      >
        {isReady(stories) ? (
          stories.map(story => (
            <Card
              onPress={() => navigation.navigate('Story', story)}
              key={story.id}
              data={story}
            />
          ))
        ) : (
          <Skeletons />
        )}
      </ScrollView>
    </Container>
  )
})

Stories.navigationOptions = {
  header: null
}
