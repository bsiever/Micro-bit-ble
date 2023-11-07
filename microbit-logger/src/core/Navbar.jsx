import icon from "../images/logo.png";
import { useState } from 'react';
import HelpModal from "./modals/HelpModal";
import UsableTooltip from "./UsableTooltip";
import Button from "react-bootstrap/esm/Button";

const Navbar = ({adaptive, setView, onConnectClicked}) => {

    const [helpVisible, setHelpVisible] = useState(false);

    return (
        <div id='navbar'>
            {adaptive ? (<>
                <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '50%'}}>
                    <div style={{width: '80px', height: '80px',  marginRight: '2%'}}><img src={icon} style={{width: '100%', height: '100%'}}/></div>
                    <div style={{display: 'flex', width: '50%'}}>
                        <UsableTooltip title="Switch to Graph View" placement='bottom'><div className="tab" onClick={() => setView('graph')}>Graphs</div></UsableTooltip>
                        <UsableTooltip title="Switch to Data Table View" placement='bottom'><div className="tab" onClick={() => setView('table')}>Data</div></UsableTooltip>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '50%'}}>
                    {onConnectClicked && <Button onClick={onConnectClicked} variant='primary' style={{border: '2px solid darkblue', width: '5vw', height: '5vh', fontSize: '1.2em', marginRight: '1.5vw'}}>Connect</Button>}
                    <UsableTooltip title='Help' placement='bottom'><button className="helpButton" onClick={() => setHelpVisible(true)}>?</button></UsableTooltip>
                </div>
            </>) : (
            <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                    <div className="tab" onClick={() => setView('graph')}>Graphs</div>
                    <button className="button connectButton" onClick={onConnectClicked}>+</button>
                    <div className="tab" onClick={() => setView('table')}>Data</div>
                </div>
            </div>
            )}
            <HelpModal visible={helpVisible} setVisible={setHelpVisible}/>
        </div>
    )
}

export default Navbar;
