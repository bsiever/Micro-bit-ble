import { useEffect, useRef, useState, useReducer } from "react";
import React from "react";
import Navbar from "./Navbar";
import { uBitManager } from "../microbit/ubitwebblelog";
import DashboardView from "./DashboardView";
import Landing from "./Landing";
import ToastContainer from "react-bootstrap/ToastContainer";
import ConnectErrorToast from "./toasts/ConnectErrorToast";
import DisconnectToast from "./toasts/DisconnectToast";

export const MicrobitContext = React.createContext({})

const microbitContextReducer = (state, action) => {
    return {...state, ...action};
}

const Dashboard = () => {
    // Define breakpoint for adaptive rendering
    const mediaQuery = window.matchMedia("(min-width: 600px)");
    // Adapt to current display width
    const [adaptive, setAdaptive] = useState(mediaQuery.matches);
    // Dismissal status of connection error notification
    const [connectError, setConnectError] = useState(false)
    // Name of most recently disconnected micro:bit
    const [disconnect, setDisconnect] = useState(null);

    const microbitManager = useRef(new uBitManager());
    const [view, setView] = useState("graph");
    const [context, dispatch] = useReducer(microbitContextReducer, {microbits: [], microbitManager: microbitManager.current, updateContext: (object) => dispatch(object)})

    useEffect(() => {
        function resize(e) {
            setAdaptive(e.matches)
        }

        mediaQuery.addEventListener("change", resize)
        return () => {
            mediaQuery.removeEventListener("change", resize)
        }
    }, [mediaQuery])

    useEffect(() => {
        function showConnectError(e) {
            setConnectError(true)
        }

        function showDisconnect(e) {
            setDisconnect(e.detail.device.name)
        }

        context.microbitManager.addEventListener('connect-error', showConnectError)
        context.microbitManager.addEventListener('disconnected', showDisconnect)
        return () => {
            context.microbitManager.removeEventListener('connect-error', showConnectError)
            context.microbitManager.removeEventListener('disconnected', showDisconnect)
        }
    }, [microbitManager.current])

    const handleConnectMicrobitButton = async (event) => {
        try {
            context.microbitManager.connect().then(() => {
                dispatch({microbits: Array.from(context.microbitManager.devices.values())});
            });
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <MicrobitContext.Provider value={context}>
            <ToastContainer position={adaptive ? 'bottom-center' : 'top-center'}>
                {connectError && <ConnectErrorToast onClose={() => setConnectError(false)}/>}
                {disconnect && context.microbits.length > 0 &&
                    // TODO: Support multiple persistent disconnection notices
                    <DisconnectToast uBit={disconnect} onClose={() => setDisconnect(null)}/>
                }
            </ToastContainer>
            <div id='dashboard'>
                <Navbar adaptive={adaptive} setView={setView} onConnectClicked={handleConnectMicrobitButton}/>
                {context.microbits.length === 0
                    ? <Landing adaptive={adaptive} onConnectClicked={handleConnectMicrobitButton}/>
                    : <DashboardView view={view}/>
                }
            </div>
        </MicrobitContext.Provider>
    )
}

export default Dashboard;
