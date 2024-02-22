import { useState } from "react";
import BaseModal from "./BaseModal";
import { Button, Form } from "react-bootstrap";

const PlotOptionsModal = ({ microbit, visible, onClose, onBoxChecked }) => {
    // const [boxChecked, setBoxChecked] = useState([true, true]);
    const modalActions = (
        <>
            <Button variant='secondary' onClick={onClose}>Close</Button>
        </>
    );

    return (
        <BaseModal visible={visible} actions={modalActions}>
            Current Time Series:
            {microbit.columns.map((column, index) => (
                <div key={`${microbit.id}_plotOptions_${index}`}>
                    <Form.Check type='checkbox' checked={column.display} label={column.name} value={column.display} onChange={() => onBoxChecked(column)} />
                </div>
            ))}
        </BaseModal>
    );
}

export default PlotOptionsModal;
