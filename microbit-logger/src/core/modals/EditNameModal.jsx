import { useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const EditNameModal = ({microbit, visible, onClose, onNameChange, onReset}) => {
    const [newMicrobitName, setNewMicrobitName] = useState("");

    const modalActions = <>
        <Button variant='secondary' onClick={onClose}>Go Back</Button>
        <Button variant='success' onClick={onReset}>Default Name</Button>
        <Button variant='primary' onClick={() => onNameChange(newMicrobitName)} disabled={newMicrobitName.trim().length == 0}>Change Name</Button>
    </>

    return <BaseModal title={`Edit Name - ${microbit.name}`} visible={visible} actions={modalActions}>
        Change the name of this microbit:
        <Form.Control type='text' value={newMicrobitName} onChange={(event) => setNewMicrobitName(event.target.value)}/>
    </BaseModal>
}

export default EditNameModal;