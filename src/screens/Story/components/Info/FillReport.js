import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Text, Circle, Icon, Input } from 'components'

import { db } from 'config'

const Understood = styled(Button)`
  margin-top: 25px;
`

const Title = styled(Text)`
  margin-bottom: 30px;
`

export function FillReport({ setInfo, storyId, user }) {
  const [description, setDescription] = useState('')

  const { displayName, email, uid } = user

  return (
    <>
      <Title align={Text.align.center} size={Text.size.sixteen}>
        Saw any wrong with this story? Wrong subtitles or exercises? We will be
        extremely grateful to write to us.
      </Title>

      <Input
        size="large"
        value={description}
        onChange={setDescription}
        placeholder="Describe here"
      />

      <Understood
        full={true}
        onPress={async () => {
          await db.collection('reports').add({
            story: storyId,
            type: 'STORY',
            status: 'REPORTED',
            user: {
              displayName,
              email,
              id: uid
            },
            description
          })

          setInfo({
            visible: true,
            content: 'reportSended'
          })
        }}
        icon={({ width, height, background, color }) => (
          <Circle background={background}>
            <Icon width={width} height={height} color={color} name="right" />
          </Circle>
        )}
      >
        Send
      </Understood>
    </>
  )
}
