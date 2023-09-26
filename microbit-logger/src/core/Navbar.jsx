import { useContext } from "react";
import { uBit, uBitManager } from "../microbit/ubitwebblelog";
import { MicrobitContext } from "./Dashboard";

const Navbar = () => {
    const {microbits, updateContext} = useContext(MicrobitContext);
    const microbitManager = new uBitManager();

    const handleConnectButtonClick = async (event) => {
        await microbitManager.connect();
        console.log(microbitManager.devices);
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