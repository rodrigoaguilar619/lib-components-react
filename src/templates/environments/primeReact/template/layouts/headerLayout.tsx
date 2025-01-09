import { useSelector } from 'react-redux'
import { TemplateHeaderStateI } from '@app/@types/controller/reducers/templateHeaderReducer'

const HeaderLayout = () => {
  const templateHeaderState: TemplateHeaderStateI = useSelector((state: any) => state.templateHeaderState);

  return (

    <header className="header">
      <div className="header-content">
      <h4>{templateHeaderState.title}</h4>
      <h5>{templateHeaderState.subtitle}</h5>
      </div>
    </header>
  )
}

export default HeaderLayout
