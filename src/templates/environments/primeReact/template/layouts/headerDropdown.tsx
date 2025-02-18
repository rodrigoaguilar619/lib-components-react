import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { TemplateUserStateI } from '@app/@types/controller/reducers/templateUserReducer'
import { formatToCapitalize } from '@app/utils/formatUtils/formatStringUtil'
import { useEffect, useRef, useState } from 'react'

const HeaderDropdown = () => {

  const templateUserDataState: TemplateUserStateI = useSelector((state: any) => state.templateUserDataState);
  const [overLayVisible, setOverLayVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOverLayVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buildRoles = (roles: string[]) => {
    return roles.map((rol: string) => { return <a className="dropdown-item">{formatToCapitalize(rol)}</a> })
  }

  const renderOverlay = () => {
    return (<div className="dropdown">
      <div className="dropdown-content">
        <div className="dropdown-header dropdown-header-first">User:</div>
        <a className="dropdown-item">{templateUserDataState.userName}</a>
        <div className="dropdown-header">Roles</div>
        {buildRoles(templateUserDataState.userRols)}
      </div>
    </div>);
  }

  return (
    <div style={{ cursor: "pointer" }} ref={dropdownRef}>
      <div onClick={() => { setOverLayVisible(!overLayVisible) }} >
        <div style={{ float: "left", marginRight: "2px", scale: "0.9" }}><FontAwesomeIcon icon={faUser} /></div>
        <div style={{ float: "left", marginRight: "2px" }}>{templateUserDataState.userName}</div>
        <div style={{ float: "right", scale: "0.7" }}>▼</div>
      </div>
      {overLayVisible && renderOverlay()}
    </div>
  )
}

export default HeaderDropdown
