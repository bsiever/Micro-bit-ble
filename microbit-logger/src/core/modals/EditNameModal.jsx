import { useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const EditNameModal = ({uBit, visible, onClose, onNameChange, onReset}) => {
    const [newMicrobitName, setNewMicrobitName] = useState("");

    const modalActions = <>
        <Button variant='secondary' onClick={onClose}>Cancel</Button>
        <Button onClick={onReset} style={{backgroundColor: '#de720d', borderColor: '#de720d'}}>Default Name</Button>
        <Button variant='primary' onClick={() => onNameChange(newMicrobitName)} disabled={newMicrobitName.trim().length == 0}>Change Name</Button>
    </>

    return <BaseModal title={`Edit Name - ${uBit.name}`} visible={visible} actions={modalActions}>
        Change the name of this microbit:
        <Form.Control type='text' value={newMicrobitName} onChange={(event) => setNewMicrobitName(event.target.value)}/>
    </BaseModal>
}

export default EditNameModal;