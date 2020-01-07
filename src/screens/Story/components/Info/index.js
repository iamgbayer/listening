import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components'

import { UnfinishedAudio } from './UnfinishedAudio'
import { AlreadyFinishedExercises } from './AlreadyFinishedExercises'
import { FillReport } from './FillReport'
import { ReportSended } from './ReportSended'

const contents = {
  unfinishedAudio: 'unfinishedAudio',
  alreadyFinishedExercises: 'alreadyFinishedExercises',
  fillReport: 'fillReport',
  reportSended: 'reportSended'
}

export const Info = memo(
  ({ info, setInfo, exercises, navigation, storyId, user }) => {
    const { visible, content } = info

    const mapping = {
      [contents.unfinishedAudio]: <UnfinishedAudio setInfo={setInfo} />,
      [contents.reportSended]: <ReportSended user={user} setInfo={setInfo} />,
      [contents.fillReport]: (
        <FillReport setInfo={setInfo} storyId={storyId} user={user} />
      ),
      [contents.alreadyFinishedExercises]: (
        <AlreadyFinishedExercises
          exercises={exercises}
          setInfo={setInfo}
          navigation={navigation}
        />
      )
    }

    return (
      <Modal
        isVisible={visible}
        onModalHide={() => setInfo({ visible: false })}
      >
        {mapping[content]}
      </Modal>
    )
  }
)

Info.contents = contents

Info.propTypes = {
  info: PropTypes.shape({
    visible: PropTypes.bool.isRequired
  }),
  setInfo: PropTypes.func.isRequired
}

Info.defaultProps = {
  info: {
    visible: false,
    content: contents.unfinishedAudio
  }
}
