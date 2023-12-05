import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import "./Landing.css"

const Landing = ({adaptive, onConnectClicked}) => {
    const [compatible, setCompatible] = useState();

    useEffect(() => {
        navigator.bluetooth.getAvailability().then((available) => {
            setCompatible(available);
        })
    }, [])

    return (
        <div id={adaptive ? 'landing-wide' : 'landing'}>
            <h2>Web Bluetooth Logger for micro:bit</h2>
            <p>This application uses experimental browser features to connect with the <a style={{textDecoration: 'underline'}} href='https://microbit.org/get-started/getting-started/introduction/'>BBC micro:bit</a> and display its data.</p>

            {compatible ? (<>
            <p>To get started and connect a micro:bit, tap the Connect button below.</p>
            {adaptive ? <Button onClick={onConnectClicked} variant='primary' style={{border: '2px solid darkblue'}}>Connect</Button> : <></>}
            </>
            ) : compatible === false ?
            <p style={{color: '#FE4747', fontWeight: 'bold'}}>This browser is not compatible with WebBluetooth. Please reference <span style={{textDecoration: 'underline'}}>this page</span> for browsers which are compatible.</p> : <></>}
        </div>

    )
}

export default Landing;
