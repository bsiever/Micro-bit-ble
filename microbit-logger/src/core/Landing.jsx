import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

const Landing = ({onConnectClicked}) => {
    const [compatible, setCompatible] = useState();

    useEffect(() => {
        navigator.bluetooth.getAvailability().then((available) => {
            setCompatible(available);
        })
    }, [])

    return (
        <div id='landing'>
                <h2>micro:bit Web Bluetooth Logger</h2>
                <p>This application uses experimental browser features to connect with a <a style={{textDecoration: 'underline'}} href='https://microbit.org/get-started/getting-started/introduction/'>BBC micro:bit</a> using Bluetooth and displays it's data.</p>
                
                {compatible ? (<>
                <p>To get started and connect a micro:bit, click the Connect button below.</p>
                <Button onClick={onConnectClicked} variant='primary' style={{border: '2px solid darkblue'}}>Connect</Button>
                </>
                ) : compatible === false ?
                <p style={{color: '#FE4747', fontWeight: 'bold'}}>This browser is not compatible with WebBluetooth. Please reference <span style={{textDecoration: 'underline'}}>this page</span> for browsers which are compatible.</p> : <></>}
            </div>
            
    )
}

export default Landing;