import BaseToast from './BaseToast';

const ConnectErrorToast = ({onClose}) => {
    return (
        <BaseToast onClose={onClose} variant='warning'>
            requestDevice chooser was closed
        </BaseToast>
    )
}

export default ConnectErrorToast;
