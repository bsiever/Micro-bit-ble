import BaseModal from "./BaseModal";
import Button from "react-bootstrap/esm/Button"; 

const DisconnectModal = ({microbit, onClose, onDisconnect, visible}) => {
    const modalActions = <>
        <Button variant='secondary' onClick={onClose}>Cancel</Button>
        <Button variant='danger' onClick={onDisconnect}>Disconnect</Button>
    </>

    return (
        <BaseModal title={`Disconnect Bluetooth - ${microbit.name}`} actions={modalActions} visible={visible}>
            Remove this micro:bit from the app?
            <br/><br/><span style={{fontWeight: 'bold'}}>{microbit.name}</span><br/><br/>
            Connect again later to resume viewing data on this micro:bit.
        </BaseModal>
    )
}

export default DisconnectModal;
