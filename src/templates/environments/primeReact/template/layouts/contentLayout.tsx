import React, { Suspense } from 'react'
import AppRoutesLayout from '@app/components/_layout/appRoutesLayout'
import { ContentLayoutPropsI } from '@app/@types/templates/environments/primeReact/template/contentLayout'

const ContentLayout: React.FC<ContentLayoutPropsI> = (props) => {
  return (
    <div>
      <Suspense fallback={"Loading..."}>
        <AppRoutesLayout {...props.routesSection} />
      </Suspense>
    </div>
  )
}

export default React.memo(ContentLayout)
