import React from 'react'
import { MainLayoutPropsI } from '@app/@types/templates/environments/coreui/template/mainLayout'
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog'
import BodyLayout from '@app/components/_layout/bodyLayout'
import AlertLayout from './layouts/alertLayout'
import ContentLayout from './layouts/contentLayout'
import FooterLayout from './layouts/footerLayout'
import HeaderLayout from './layouts/headerLayout'
import LoadingLayout from './layouts/loadingLayout'
import MenuLayout from './layouts/menuLayout'

const MainLayout: React.FC<MainLayoutPropsI> = (props) => {

  const buildContent = (isShowContent: boolean) => {

    return <div>
      <LoadingLayout />
      <MenuLayout {...props.menusSection} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <HeaderLayout />
        <div className="body flex-grow-1 px-3">
          <AlertLayout componentType={ComponentTypeEnum.MODULE} />
          {isShowContent ? <ContentLayout {...props} /> : null}
        </div>
        <FooterLayout />
      </div>
    </div>
  }

  return (
    <BodyLayout body={buildContent} />
  )
}

export default MainLayout