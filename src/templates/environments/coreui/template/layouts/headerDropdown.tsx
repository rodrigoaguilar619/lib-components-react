import {
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { TemplateUserStateI } from '@app/@types/controller/reducers/templateUserReducer'
import { formatToCapitalize } from '@app/utils/formatUtils/formatStringUtil'

const HeaderDropdown = () => {

  const templateUserDataState: TemplateUserStateI = useSelector((state: any) => state.templateUserDataState);
  const itemStyle = { backgroundColor: "transparent", outline: "none", color: "inherit" }

  const buildRoles = (roles: string[]) => {
    return roles.map((rol: string) => { return <div>{formatToCapitalize(rol)}</div> })
  }

  return (
    <CDropdown autoClose="outside">
      <CDropdownToggle className="py-0 pe-0" caret={false}>
        <div style={{ float: "left", marginRight: "2px", scale: "0.9" }}><FontAwesomeIcon icon={faUser} /></div>
        <div style={{ float: "left", marginRight: "2px" }}>{templateUserDataState.userName}</div>
        <div style={{ float: "right", scale: "0.7" }}>▼</div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">User:</CDropdownHeader>
        <CDropdownItem style={itemStyle}>
          {templateUserDataState.userName}
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Roles</CDropdownHeader>
        <CDropdownItem style={itemStyle}>
          {buildRoles(templateUserDataState.userRols)}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default HeaderDropdown
