import React from 'react';
import { Alert } from 'react-bootstrap';
import { useAlert } from '../../alertContext/AlertContext';

const GlobalAlert = () => {
    // We get the alert state from our context
    const { alert, hideAlert } = useAlert();

    // If alert.show is false, we return null so nothing is rendered
    if (!alert.show) {
        return null;
    }

    return (
        <Alert
            variant={alert.variant}
            onClose={hideAlert}
            dismissible // This is the key
        >
            {alert.message}
        </Alert>
    );
};
export default GlobalAlert;