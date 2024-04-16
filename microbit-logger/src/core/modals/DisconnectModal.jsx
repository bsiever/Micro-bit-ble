import BaseModal from "./BaseModal";
import Button from "react-bootstrap/esm/Button"; 

const DisconnectModal = ({uBit, onClose, onDisconnect, visible}) => {
    const modalActions = <>
        <Button variant='secondary' onClick={onClose}>Cancel</Button>
        <Button variant='danger' onClick={onDisconnect}>Disconnect</Button>
    </>

    return (
        <BaseModal title={`Disconnect Bluetooth - ${uBit.name}`} actions={modalActions} visible={visible}>
            Remove this micro:bit from the app?
            <br/><br/><span style={{fontWeight: 'bold'}} children={`${uBit.label ? uBit.label + " (" + uBit.name + ")" : uBit.name}`}/><br/><br/>
            Connect again later to resume viewing data on this micro:bit.
        </BaseModal>
    )
}

export default DisconnectModal;
