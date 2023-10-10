import { useContext } from "react";
import { MicrobitContext } from "./Dashboard";

const Navbar = () => {
    const {microbitManager, updateContext} = useContext(MicrobitContext);

    const handleConnectButtonClick = async (event) => {
        await microbitManager.connect();
        
    }

    return (
        <div id='navbar'>
            <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                    <div className="tab"><a href=''>Graphs</a></div>
                    <button className="button connectButton" onClick={(event) => handleConnectButtonClick(event)}>+</button>
                    <div className="tab"><a href="">Data</a></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
