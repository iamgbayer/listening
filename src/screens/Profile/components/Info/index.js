import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components'

import { FillReport } from './FillReport'
import { ReportSended } from './ReportSended'

const contents = {
  fillReport: 'fillReport',
  reportSended: 'reportSended'
}

export const Info = memo(({ info, setInfo, user }) => {
  const { visible, content } = info

  const mapping = {
    [contents.reportSended]: <ReportSended user={user} setInfo={setInfo} />,
    [contents.fillReport]: <FillReport user={user} setInfo={setInfo} />
  }

  return (
    <Modal isVisible={visible} onModalHide={() => setInfo({ visible: false })}>
      {mapping[content]}
    </Modal>
  )
})

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
    content: contents.reportSended
  }
}
