import React from 'react'
import { LoginChildrenPropsI } from '@app/@types/components/layout/loginLayout'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Message } from 'primereact/message'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CSpinner,
} from '@coreui/react'
import { ComponentLoginMessageTypeEnum } from '@app/catalogs/enumCatalog'

const LoginCoreUI: React.FC<LoginChildrenPropsI> = (props) => {

    const renderMessage = () => {

        if (props.currentMessage === undefined || props.isLoading)
            return;
       
        let message = "";
        let severity: "error" | "success" | "warn" | undefined = undefined;

        if(props.messageType === ComponentLoginMessageTypeEnum.ERROR) {
            severity = "error";
            message = props.currentMessage;
        }
        else if(props.messageType === ComponentLoginMessageTypeEnum.LOGOUT) {
            severity = "success";
            message = "Logout success";
        }
        else if(props.messageType === ComponentLoginMessageTypeEnum.SESSION_EXPIRED || props.messageType === ComponentLoginMessageTypeEnum.SESSION_EXPIRED_APP) {
            severity = "warn";
            message = "Session expired";
        }
        
        if(severity !== undefined)
            return (
                <Message severity={severity} text={message} />
            )
    }

    const renderLoading = () => {
        if (props.isLoading) {
            return (
                <CButton color="primary" disabled>
                    <CSpinner size="sm" variant="grow" aria-hidden="true" />
                    {props.loadingText}
                </CButton>
            )
        }
    }

    const renderLoginTitle = () => {

        if(process.env.APP_LOGIN_TITLE === undefined)
            return;

        return process.env.APP_LOGIN_TITLE
    }

    return (
        <div>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={4}>
                            <CCardGroup>
                                <CCard className="p-4">
                                    {renderLoading()}
                                    {renderMessage()}
                                    <CCardBody>
                                        <CForm>
                                            <h1>{renderLoginTitle()}</h1>
                                            <p className="text-medium-emphasis">Sign In to your account</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Username"
                                                    autoComplete="username"
                                                    disabled={props.isLoading}
                                                    onChange={(e: any) => { props.updateUserName(e.target.value); }}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    disabled={props.isLoading}
                                                    onChange={(e: any) => { props.updatePassword(e.target.value); }}
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={2}>
                                                    <CButton
                                                        color="primary"
                                                        className="px-4"
                                                        disabled={props.isLoading}
                                                        onClick={() => { props.executeSubmitLogin() }}
                                                    >
                                                        Login
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </div>
    )
}

export default LoginCoreUI