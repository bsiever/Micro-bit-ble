
import BaseModal from "./BaseModal";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/Spinner";
import {useState, useMemo, useRef, useEffect} from 'react';

const EraseModal = ({microbit, onClose, onDelete, visible}) => {

    const [countdown, setCountdown] = useState(3);
    const timer = useRef(null);
    
    useEffect(() => {
        if(!timer.current) {
            timer.current = setInterval(() => {
                setCountdown((oldTime) => {
                    return oldTime - 1;
                });
            }, 1000);
        }
    }, [])
    
    useEffect(() => {
        if(countdown <= 0) {
            clearInterval(timer.current);
            timer.current = null;
        }
    }, [countdown])

    const modalActions = useMemo(() => <>
        <Button variant='secondary' onClick={onClose}>Go Back</Button>
        <Button variant='danger' disabled={countdown !== 0} onClick={onDelete}>{countdown != 0 ? countdown : 'Delete'}</Button>
    </>, [countdown])

    return (
        <BaseModal title={`Clear Microbit Data - ${microbit.name}`} visible={visible} actions={modalActions}>
            You are about to erase all data from the following device's memory:<br/><br/><span style={{fontWeight: 'bold'}}>{microbit.name}</span><br/><br/>Are you sure you want to continue?
        </BaseModal>
    )
}

export default EraseModal;