import { useState } from "react";
import BaseModal from "./BaseModal";
import { Button, Form } from "react-bootstrap";

const PlotOptionsModal = ({ microbit, visible, onClose, onBoxChecked }) => {
    // const [boxChecked, setBoxChecked] = useState([true, true]);
    const modalActions = (
        <>
            <Button variant='secondary' onClick={onClose}>Cancel</Button>
        </>
    );

    return (
        <BaseModal visible={visible} actions={modalActions}>
            Change which plot options are shown:
            {microbit.headers.slice(1).map((one, index) => (
                <div key={index}>
                    <Form.Check type='checkbox' label={one} value={true} onChange={() => {}} />
                </div>
            ))}
        </BaseModal>
    );
}

export default PlotOptionsModal;
