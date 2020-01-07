import React, { useContext, Fragment } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { View } from 'react-native'
import { theme, ifProp } from 'styled-tools'

import { Icon } from '../Icon'
import { Text } from '../Text'

import { isReady } from 'helpers'

import Skeletons from './Skeletons'
import Skeleton from './Skeleton'

const Container = styled.View`
  width: 100%;
  padding: 20px;
  background-color: ${theme('colors.secondary')};
  border-radius: ${theme('border.radius.fifteen')};
  overflow: hidden;
  box-shadow: ${theme('shadow.primary')};
  margin-bottom: 20px;
`

const Ball = styled.View`
  width: 8;
  height: 8;
  background-color: ${ifProp(
    { initiated: true },
    theme('colors.support.primary'),
    theme('colors.support.quartiary')
  )};
  border-radius: ${theme('border.radius.fifty')};
  margin-left: 18px;
  margin-right: 50px;
`

const Chapter = styled.View`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
`

const Pipe = styled.View`
  width: 2px;
  height: 30px;
  margin-left: 21px;
  background-color: ${theme('colors.support.quartiary')};
`

const Circle = styled.View`
  background-color: ${theme('colors.secondary')};
  border-radius: ${theme('border.radius.fifty')};
  width: 45;
  height: 45;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  border: 4px solid ${theme('colors.support.quartiary')};
`

const Head = styled.View`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
`

const About = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export function Card({ chapters }) {
  const { colors } = useContext(ThemeContext)

  const initiated = !!chapters.find(({ status }) => status === 'INITIATED')

  const total = chapters.length
  const done = chapters.filter(({ status }) => status === 'DONE')

  return (
    <Container>
      {isReady(chapters) ? (
        <Head>
          <Circle>
            {!initiated && (
              <Icon color={colors.support.quartiary} name="padlock" />
            )}
          </Circle>
          <Text
            weight={Text.weight.bold}
            size={Text.size.fourteen}
            color={colors.support.secondary}
          >
            Chapters
          </Text>
        </Head>
      ) : (
        <Skeleton />
      )}

      {isReady(chapters) ? (
        <>
          {chapters.map(chapter => (
            <Fragment key={chapter.id}>
              <Pipe />
              <Chapter>
                {chapter.status === 'DONE' ? (
                  <Text>win</Text>
                ) : (
                  <Ball initiated={chapter.status === 'INITIATED'} />
                )}
                <About>
                  <Text
                    size={Text.size.twenty}
                    color={colors.tertiary}
                    weight={Text.weight.bold}
                  >
                    {chapter.name}
                  </Text>
                  <Text
                    style={{ width: 185, opacity: 0.6 }}
                    size={Text.size.fourteen}
                    color={colors.tertiary}
                    weight={Text.weight.regular}
                  >
                    {chapter.description}
                  </Text>
                </About>
              </Chapter>
            </Fragment>
          ))}
        </>
      ) : (
        <Skeletons />
      )}
    </Container>
  )
}
