import { useEffect, useRef, useState, useReducer, useCallback } from "react";
import React from "react";
import Navbar from "./Navbar";
import { uBitManager } from "../microbit/ubitwebblelog";
import DashboardView from "./DashboardView";
import Landing from "./Landing";
import ToastContainer from "react-bootstrap/ToastContainer";
import ConnectErrorToast from "./toasts/ConnectErrorToast";
import DisconnectToast from "./toasts/DisconnectToast";
import { MicrobitContextAction, microbitContextReducer } from "../state/contextReducer.ts";
import { MicrobitContext } from "../state/types.ts";
import {debounce} from "lodash"

const Dashboard = () => {
    // Define breakpoint for adaptive rendering
    const mediaQuery = window.matchMedia("(min-width: 800px)");
    // Adapt to current display width
    const [adaptive, setAdaptive] = useState(mediaQuery.matches);
    // Dismissal status of connection error notification
    const [connectError, setConnectError] = useState(false)
    // Name of most recently disconnected micro:bit
    const [disconnect, setDisconnect] = useState(null);

    const microbitManager = useRef(new uBitManager());
    const [view, setView] = useState([0, 0]);
    const [context, dispatch] = useReducer(microbitContextReducer, {adaptive, microbits: [], microbitManager: microbitManager.current, view: [0, 0], updateContext: (action) => dispatch(action)})

    // function that makes sure the call to update state isnt being called more than once every 100ms (necessary for the way some events are handled)
    const updateState = useCallback(
        debounce((action) => {
            dispatch(action);
        }, 100), [dispatch])

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
            const microbit = e.detail.device;
            setDisconnect(microbit.name)
            updateState({actionType: MicrobitContextAction.DISCONNECT_MICROBIT, data: microbit})    
        }

        const onConnect = (event) => {
            const microbit = event.detail.device;
            updateState({actionType: MicrobitContextAction.CONNECT_MICROBIT, data: microbit})
        }

        context.microbitManager.addEventListener('connect-error', showConnectError)
        context.microbitManager.addEventListener('disconnected', showDisconnect)
        context.microbitManager.addEventListener('connected', onConnect)
        return () => {
            context.microbitManager.removeEventListener('connect-error', showConnectError)
            context.microbitManager.removeEventListener('disconnected', showDisconnect) 
        }
    }, [microbitManager.current])

    const handleConnectMicrobitButton = async (event) => {
        try {
            context.microbitManager.connect()
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
                    : <DashboardView adaptive={adaptive}/>
                }
            </div>
        </MicrobitContext.Provider>
    )
}

export default Dashboard;
