import React, { useEffect } from 'react'
import MenuLayout from './layouts/menuLayout'
import HeaderLayout from './layouts/headerLayout'
import FooterLayout from './layouts/footerLayout'
import ContentLayout from './layouts/contentLayout'
import AlertLayout from './layouts/alertLayout'
import LoadingLayout from './layouts/loadingLayout'
import { useLocation } from 'react-router-dom'
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog'
import { MainLayoutPropsI } from '@app/@types/templates/environments/coreui/template/mainLayout'

const MainLayout: React.FC<MainLayoutPropsI> = (props) => {

  const location = useLocation();

  useEffect(() => {
    console.log('Route changed:', location.pathname);
    //TODO: implement security

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <LoadingLayout />
      <MenuLayout {...props.menusSection} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <HeaderLayout />
        <div className="body flex-grow-1 px-3">
          <AlertLayout componentType={ComponentTypeEnum.MODULE} />
          <ContentLayout {...props} />
        </div>
        <FooterLayout />
      </div>
    </div>
  )
}

export default MainLayout