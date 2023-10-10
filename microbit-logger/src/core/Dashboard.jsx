import { useEffect, useRef, useState, useReducer } from "react";
import React from "react";
import Navbar from "./Navbar";
import NavbarWide from "./NavbarWide";
import { uBitManager } from "../microbit/ubitwebblelog";
import DashboardView from "./DashboardView";

export const MicrobitContext = React.createContext({})

const microbitContextReducer = (state, action) => {
    return {...state, ...action};
}

const Dashboard = () => {
    const mediaQuery = window.matchMedia("(min-width: 600px)")
    const microbitManager = useRef(new uBitManager())
    const [adaptive, setAdaptive] = useState(mediaQuery.matches);
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

    return (
        <MicrobitContext.Provider value={context}>
        <div id='dashboard'>
            {adaptive ? <NavbarWide setView={setView}/> : <button className="button helpButton">Help</button>}
            <div id='display'><DashboardView view={view}/></div>
            {!adaptive && <Navbar setView={setView}/>}
        </div>
        </MicrobitContext.Provider>
    )
}

export default Dashboard;