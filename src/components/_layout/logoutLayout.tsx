import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog'
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from '@app/controller/actions/templateLoadingAction'
import { logoutService } from '@app/controller/services/authService'
import { debug, generateDebugClassModule } from '@app/utils/webUtils/debugUtil'
import { manageAlertModuleError } from '@app/utils/webUtils/httpManagerUtil'
import { redirectLogout } from '@app/utils/webUtils/routeUtil'

const LogoutLayout = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        initLogout();

    }, []);

    const initLogout = () => {

        let debugClass = generateDebugClassModule("init logout");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Logging out..."));
        axios.all([logoutService()])
            .then(axios.spread((logoutData) => {

                debug(debugClass, "result", logoutData);
                
                localStorage.removeItem('userName');
                localStorage.removeItem('token');
                
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, ComponentTypeEnum.MODULE, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            })
            .finally(() => {
                redirectLogout(dispatch, true);
            });
    }

    return (
        <div></div>
    )
}

export default LogoutLayout