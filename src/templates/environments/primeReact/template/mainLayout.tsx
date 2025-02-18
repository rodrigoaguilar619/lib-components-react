import React, { useEffect } from 'react'
import { MainLayoutPropsI } from '@app/@types/templates/environments/primeReact/template/mainLayout'
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog'
import BodyLayout from '@app/components/_layout/bodyLayout'
import AlertLayout from './layouts/alertLayout'
import ContentLayout from './layouts/contentLayout'
import HeaderLayout from './layouts/headerLayout'
import LoadingLayout from './layouts/loadingLayout'
import MenuLayout from './layouts/menuLayout'
import { useDispatch } from 'react-redux'

const MainLayout: React.FC<MainLayoutPropsI> = (props) => {

  const buildContent = (isShowContent: boolean) => {

    return <div>
      <LoadingLayout />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div className="spacer-menu" >
          <HeaderLayout />
          <MenuLayout {...props.menusSection} />
        </div>
        <div className="spacer" />
        <div className="body flex-grow-1 px-3">
          <AlertLayout componentType={ComponentTypeEnum.MODULE} />
          {isShowContent ? <ContentLayout {...props} /> : null}
        </div>
      </div>
    </div>
  }

  return (
    <BodyLayout body={buildContent} />
  )
}

export default MainLayout