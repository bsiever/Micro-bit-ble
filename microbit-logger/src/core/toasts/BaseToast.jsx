import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

const BaseToast = ({children, onClose, variant}) => {
    return (
        <Toast bg={variant} className='d-flex justify-content-between'>
            <div style={{marginBottom: 'auto', marginLeft: '5%', marginTop: 'auto'}}>
                {children}
            </div>
            <Button onClick={onClose} variant={variant}>Dismiss</Button>
        </Toast>
    )
}

export default BaseToast;
