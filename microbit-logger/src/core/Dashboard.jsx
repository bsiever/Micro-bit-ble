import { useEffect, useRef, useState, useReducer } from "react";
import React from "react";
import Navbar from "./Navbar";
import { uBitManager } from "../microbit/ubitwebblelog";
import DashboardView from "./DashboardView";
import Landing from "./Landing";

export const MicrobitContext = React.createContext({})

const microbitContextReducer = (state, action) => {
    return {...state, ...action};
}

const Dashboard = () => {
    // Define breakpoint for adaptive rendering
    const mediaQuery = window.matchMedia("(min-width: 600px)");
    // Adapt to current display width
    const [adaptive, setAdaptive] = useState(mediaQuery.matches);

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
        if(microbitManager.current) {
            microbitManager.current.addEventListener('connect-error', () => {
                // add toast to display error nicely, for now just print to console
                console.log('requestDevice chooser was closed');
            })
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
        <div id='dashboard'>
            <Navbar adaptive={adaptive} setView={setView} onConnectClicked={context.microbits.length > 0 && handleConnectMicrobitButton}/>
            {context.microbits.length === 0 ? <Landing onConnectClicked={handleConnectMicrobitButton}/> : <DashboardView view={view}/>}
        </div>
        </MicrobitContext.Provider>
    )
}

export default Dashboard;
