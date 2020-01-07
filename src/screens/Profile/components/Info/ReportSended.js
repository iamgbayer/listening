import React from 'react'
import styled from 'styled-components'
import { Button, Text, Circle, Icon } from 'components'

const Understood = styled(Button)`
  margin-top: 25px;
`

export function ReportSended({ setInfo, user }) {
  const { displayName } = user

  return (
    <>
      <Text align={Text.align.center} size={Text.size.sixteen}>
        {displayName}, thank you by the report.
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
        Close
      </Understood>
    </>
  )
}
