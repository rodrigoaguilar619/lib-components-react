import React from 'react'
import { LoginChildrenPropsI } from '@app/@types/components/layout/loginLayout'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
import { Message } from 'primereact/message'

const LoginCoreUI: React.FC<LoginChildrenPropsI> = (props) => {

    const renderMessageSessionExpired = () => {

        if (props.isSessionExpired) {
            return (
                <Message severity="warn" text={props.currentMessage} />
            )
        }
    }

    const renderMessageLoginError = () => {

        if (props.isLoginError) {
            return (
                <Message severity="error" text={props.currentMessage} />
            )
        }
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
                                    {renderMessageSessionExpired()}
                                    {renderMessageLoginError()}
                                    {renderLoading()}
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