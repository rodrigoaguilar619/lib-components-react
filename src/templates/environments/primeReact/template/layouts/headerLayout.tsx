import { useSelector } from 'react-redux'
import { TemplateHeaderStateI } from '@app/@types/controller/reducers/templateHeaderReducer'
import HeaderDropdown from './headerDropdown';

const HeaderLayout = () => {
  const templateHeaderState: TemplateHeaderStateI = useSelector((state: any) => state.templateHeaderState);

  return (

    <header className="header">
      <div className="header-content">
        <div style={{ width: "10%"}}></div>
        <div style={{ width: "80%"}}>
        <h4>{templateHeaderState.title}</h4>
        <h5>{templateHeaderState.subtitle}</h5>
        </div>
        <div className="header-content-data" style={{ width: "10%"}}>
          <HeaderDropdown />
        </div>
      </div>
    </header>
  )
}

export default HeaderLayout
