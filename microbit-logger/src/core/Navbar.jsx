import { useContext } from "react";
import { MicrobitContext } from "./Dashboard";

const Navbar = () => {
    const {microbitManager} = useContext(MicrobitContext);

    const handleConnectButtonClick = async (event) => {
        await microbitManager.current.connect();
        console.log(microbitManager.current.devices);
    }

    return (
        <div id='navbar'>
            <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '50%'}}>
                <div style={{width: '80px', height: '80px', border: '1px solid black', marginRight: '2%'}}></div>
                Micro:Bit Bluetooth Web Logger
                <div style={{display: 'flex', justifyContent: 'space-around', width: '50%'}}>
                    <div className="tab"><a href=''>Graphs</a></div>
                    <div className="tab"><a href="">Data</a></div>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '50%'}}>
                <button className="button connectButton" onClick={(event) => handleConnectButtonClick(event)}>Connect</button>
                <button className="button helpButton">Help</button>
            </div>
        </div>
    )
}

export default Navbar;
