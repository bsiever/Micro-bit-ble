import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BaseModal = ({title, visible, setVisible, actions, children}) => {

    const defaultActions = (<>
        <Button onClick={() => setVisible && setVisible(false)} variant='secondary'>Cancel</Button>
    </>);

    return (
        <Modal show={visible}>
            <div style={{border: '2px solid black', borderRadius: '7px'}}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {actions ?? defaultActions}
            </Modal.Footer>
            </div>
        </Modal>
    )
}

export default BaseModal