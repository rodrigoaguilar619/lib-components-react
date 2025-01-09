import { Component } from 'react';
import MainTemplate from '@app/templates/environments/primeReact/template/mainTemplate';
import '@app/scss/environments/primeReact/style.scss';
import '@app/scss/environments/primeReact/styleApp.scss';
import { MainAppPropsI } from '@app/@types/templates/environments/primeReact/template/mainAppLayout';

class MainApp extends Component<MainAppPropsI> {

      render() {
        return (
            <MainTemplate {...this.props}  />
        )
      }
}

export default MainApp;