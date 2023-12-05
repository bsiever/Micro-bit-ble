import icon from "../images/logo.png";
import { useContext, useState } from 'react';
import { MicrobitContext } from "./Dashboard";
import HelpModal from "./modals/HelpModal";
import UsableTooltip from "./UsableTooltip";
import Button from "react-bootstrap/esm/Button";
import "./Navbar.css";

const Navbar = ({adaptive, setView, onConnectClicked}) => {
    const {microbits} = useContext(MicrobitContext);
    const [helpVisible, setHelpVisible] = useState(false);

    return (
        <>
            {adaptive ? (<div id='navbar'>
                <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '50%'}}>
                    <div style={{width: '80px', height: '80px',  marginRight: '2%'}}><img src={icon} style={{width: '100%', height: '100%'}}/></div>
                    <div style={{display: 'flex', width: '50%'}}>
                        <UsableTooltip title="Switch to Graph View" placement='bottom'><div className="tab" onClick={() => setView('graph')}>Graphs</div></UsableTooltip>
                        <UsableTooltip title="Switch to Data Table View" placement='bottom'><div className="tab" onClick={() => setView('table')}>Data</div></UsableTooltip>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '50%'}}>
                    {microbits.length > 0 && <Button onClick={onConnectClicked} variant='primary' style={{border: '2px solid darkblue', width: '10rem', height: '4rem', fontSize: '1.2em', marginRight: '2rem'}}>Connect</Button>}
                    <UsableTooltip title='Help' placement='bottom'><button className="helpButton" onClick={() => setHelpVisible(true)}>?</button></UsableTooltip>
                </div>
            </div>) : (
            <>
                <button className="helpButton" style={{position: 'absolute'}} onClick={() => setHelpVisible(true)}>?</button>
                <div id='navbar'>
                    <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '100%'}}>
                        <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                            {microbits.length > 0 ? <>
                                <div className="tab" onClick={() => setView('graph')}>Graphs</div>
                                <button className="button connectButton" onClick={onConnectClicked}>+</button>
                                <div className="tab" onClick={() => setView('table')}>Data</div>
                            </> : <Button onClick={onConnectClicked} variant='primary' style={{border: '2px solid darkblue', fontSize: '1em'}}>Connect</Button>}
                        </div>
                    </div>
                </div>
            </>
            )}
            <HelpModal visible={helpVisible} setVisible={setHelpVisible}/>
        </>
    )
}

export default Navbar;
