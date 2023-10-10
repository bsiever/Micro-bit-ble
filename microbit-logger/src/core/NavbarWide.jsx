import { useContext } from "react";
import { MicrobitContext } from "./Dashboard";
import icon from "../images/icon.png";

const NavbarWide = ({setView}) => {
    const {microbitManager, updateContext} = useContext(MicrobitContext);

    const handleConnectButtonClick = async (event) => {
        try {
            microbitManager.connect().then(() => {
                updateContext({microbits: Array.from(microbitManager.devices.values())});
            });
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div id='navbar'>
            <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '50%'}}>
                <div style={{width: '80px', height: '80px', border: '1px solid black', marginRight: '2%'}}><img src={icon} style={{width: '100%', height: '100%'}}/></div>
                Micro:Bit Bluetooth Web Logger
                <div style={{display: 'flex', justifyContent: 'space-around', width: '50%'}}>
                    <div className="tab" onClick={() => setView('graph')}>Graphs</div>
                    <div className="tab" onClick={() => setView('table')}>Data</div>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '50%'}}>
                <button className="button connectButton" onClick={(event) => handleConnectButtonClick(event)}>Connect</button>
                <button className="button helpButton">Help</button>
            </div>
        </div>
    )
}

export default NavbarWide;
