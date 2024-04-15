import React from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import { TemplateLoadingStateI } from '@app/@types/controller/reducers/templateLoadingReducer';

const LoadingFreezePageComponent: React.FC<TemplateLoadingStateI> = (props) => {

        return (
            <LoadingOverlay
                active={props.isActive}
                spinner
                text={props.text}
                styles={{
                    wrapper: (base: any) => ({
                        ...base,
                        position: 'unset',
                        zIndex: '1600'
                    }),
                    overlay: (base: any) => ({
                        ...base,
                        position: 'fixed',
                        zIndex: '1600',
                    })
                }}
            >
            </LoadingOverlay>
        )
}

export default LoadingFreezePageComponent