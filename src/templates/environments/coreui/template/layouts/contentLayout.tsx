import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'

import AppRoutesLayout from '@app/components/_layout/appRoutesLayout'
import { ContentLayoutPropsI } from '@app/@types/templates/environments/coreui/template/contentLayout'

const ContentLayout: React.FC<ContentLayoutPropsI> = (props) => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <AppRoutesLayout {...props.routesSection} />
      </Suspense>
    </CContainer>
  )
}

export default React.memo(ContentLayout)
