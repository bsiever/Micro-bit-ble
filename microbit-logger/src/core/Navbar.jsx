import icon from "../images/logo.png";
import graph from "../images/graph.png";
import data from "../images/data.png";
import menu from "../images/menu.png";
import { useContext, useState } from 'react';
import HelpModal from "./modals/HelpModal";
import UsableTooltip from "./UsableTooltip";
import Button from "react-bootstrap/esm/Button";
import "./Navbar.css";
import { Offcanvas } from "react-bootstrap";
import Accordion from "./Accordian";
import { MicrobitContext } from "../state/types.ts";

const Navbar = ({adaptive, setView, onConnectClicked}) => {
    const {microbits} = useContext(MicrobitContext);
    const [helpVisible, setHelpVisible] = useState(false);
    const [show, setShow] = useState(true);

    const displayed = !!adaptive || show;
    
    return (
        <>
            <Button id="showCanvas" className="d-lg-none" onClick={() => setShow(true)}><img src={menu} style={{ width: '2rem', height: '2rem', marginLeft: '-0.2rem' }} /></Button>

            <Offcanvas show={displayed} onHide={() => setShow(false)} placement="start" backdrop={false} keyboard={false}>
                    {adaptive ? (
                        <Offcanvas.Header style={{ display: 'flex', backgroundColor: 'rgb(71 73 81)', height: '10%', justifyContent: 'flex-start'}}>
                            <img src={icon} />
                            <Offcanvas.Title style={{ marginLeft: '1rem', color: 'white', width: '25%' }}>Micro:bit Web Logger</Offcanvas.Title>
                        </Offcanvas.Header>
                    ) : (
                        <Offcanvas.Header closeButton style={{ display: 'flex', backgroundColor: 'rgb(71 73 81)', height: '10%' }}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={icon} />
                            <Offcanvas.Title style={{ marginLeft: '1rem', color: 'white', width: '40%' }}>Micro:bit Web Logger</Offcanvas.Title>
                            </div>
                        </Offcanvas.Header>
                    )
                }

                <Offcanvas.Body class="drawerNav">
                    <div id='navbar'>
                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '25px', width: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* <div className="accordianWrapper"><Accordion /></div>*/}
                                <UsableTooltip title="Switch to Graph View"><div className="tab" onClick={() => setView('graph')}><img src={graph} style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />Graphs</div></UsableTooltip>
                                <UsableTooltip title="Switch to Data Table View"><div className="tab" onClick={() => setView('table')}><img src={data} style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }} />Data</div></UsableTooltip>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingLeft: '1rem', paddingBottom: '1rem' }}>
                            {microbits.length > 0 && <Button onClick={onConnectClicked} variant='primary' size="lg" style={{ width: '8rem', height: '4rem', marginRight: '1rem', marginBottom: '1rem' }}>Connect</Button>}
                            <div className="helpDiv" onClick={() => setHelpVisible(true)} style={{display: 'flex'}}><IconButton icon={'Help'} tooltip='Help'/><span style={{ marginLeft: '10px', fontSize: '30px', color: 'white', fontWeight: 'bold' }}>Help</span></div>
                        </div>
                    </div>
                    <HelpModal visible={helpVisible} setVisible={setHelpVisible} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
const IconButton = ({icon, onClick, tooltip}) => {
    return (
        <UsableTooltip title={tooltip}>
            <div className='iconButton' onClick={onClick} style={{display: 'flex', alignItems: 'center', transform: 'translateY(5%)', justifyContent: 'center', color: 'white'}}>
                <span class='material-symbols-outlined' style={{fontSize: '2.5rem'}}>{icon}</span>
            </div>
        </UsableTooltip>
    )
}   

export default Navbar;
