import BaseToast from './BaseToast';

const ConnectErrorToast = ({onClose}) => {
    return (
        <BaseToast onClose={onClose} variant='warning'>
            Bluetooth device selector was closed
        </BaseToast>
    )
}

export default ConnectErrorToast;
