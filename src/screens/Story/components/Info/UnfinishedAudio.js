import React from 'react'
import styled from 'styled-components'
import { Button, Text, Circle, Icon } from 'components'

const Understood = styled(Button)`
  margin-top: 25px;
`

export function UnfinishedAudio({ setInfo }) {
  return (
    <>
      <Text align={Text.align.center} size={Text.size.sixteen}>
        This story has exercices, but you can do this before finishing the
        audio.
      </Text>

      <Understood
        full={true}
        onPress={() =>
          setInfo({
            visible: false
          })
        }
        icon={({ width, height, background, color }) => (
          <Circle background={background}>
            <Icon width={width} height={height} color={color} name="right" />
          </Circle>
        )}
      >
        Understood
      </Understood>
    </>
  )
}
