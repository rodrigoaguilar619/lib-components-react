import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { AlertTypeEnum } from '@app/catalogs/enumCatalog';
import { removeAlertRedux } from '@app/utils/componentUtils/alertUtil';
import { AlertsComponentI, AlertsDataI } from '@app/@types/components/alerts/alerts';
import { useDispatch } from 'react-redux';

const AlertsComponent: React.FC<AlertsComponentI> = (props) => {
    
    const dispatch = useDispatch();
    const [msgList, setMsgList] = useState<React.ReactNode[]>([]);

    useEffect(() => {

        buildAlerts(props.alertList);

        return () => {
        };
    }, [props.alertList]);

    const buildAlerts = (messages: AlertsDataI[]) => {

        let msgList: React.ReactNode[] = messages.map((message, index) => {
            return buildAlert(message, index);
        });

        setMsgList(msgList);
    }

    const buildAlert = (message: AlertsDataI, key: number) => {
        let severity = "";
    
        if (message.alertType === AlertTypeEnum.ERROR)
            severity = "danger";
    
        if (message.alertType === AlertTypeEnum.SUCCESS)
            severity = "success";
    
        if (message.alertType === AlertTypeEnum.WARNING)
            severity = "warning";
    
        return (<div key={key + "_" + message.id}><Alert variant={severity} onClose={() => { removeAlertRedux(dispatch, props.componentType, props.alertList, message.id) }} dismissible>
        <b>{message.summary}</b> {message.message}
      </Alert></div>)
    }

    return (
        <div className="message">{msgList}</div>
    )
}

export default AlertsComponent