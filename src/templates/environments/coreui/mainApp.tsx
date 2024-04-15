import { Component } from 'react';
import MainTemplate from '@app/templates/environments/coreui/template/mainTemplate';
import '@app/scss/environments/coreui/style.scss';
import { MainAppPropsI } from '@app/@types/templates/environments/coreui/template/mainAppLayout';

class MainApp extends Component<MainAppPropsI> {

      render() {
        return (
            <MainTemplate {...this.props}  />
        )
      }
}

export default MainApp;