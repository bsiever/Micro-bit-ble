import BaseToast from './BaseToast';

const DisconnectToast = ({uBit, onClose}) => {
    return (
        <BaseToast onClose={onClose} variant='info'>
            {uBit} disconnected
        </BaseToast>
    )
}

export default DisconnectToast;
