import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { setSidebarShowAction } from '@app/templates/environments/coreui/controllers/actions/coreuiSideBarAction'
import { TemplateHeaderStateI } from '@app/@types/controller/reducers/templateHeaderReducer'
import HeaderDropdown from './headerDropdown'

const HeaderLayout = () => {

  const dispatch = useDispatch();
  const sidebarShow: boolean = useSelector((state: any) => state.coreuiSideBarState.sidebarShow);
  const templateHeaderState: TemplateHeaderStateI = useSelector((state: any) => state.templateHeaderState);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setSidebarShowAction(!sidebarShow)) }
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        
        <CHeaderNav style={{width: "90%"}}>
          <span style={{width: "100%", textAlign: "center"}}>
          <h4>{templateHeaderState.title}</h4>
          <h5>{templateHeaderState.subtitle}</h5>
          </span>
        </CHeaderNav>
        <CHeaderNav><HeaderDropdown /></CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default HeaderLayout
