import { useEffect, useRef, useState } from "react";
import React from "react";
import Navbar from "./Navbar";
import NavbarWide from "./NavbarWide";
import { uBitManager } from "../microbit/ubitwebblelog";
import { PlotBar, ProgressBar } from "./PlotBar";

export const MicrobitContext = React.createContext({})

const Dashboard = () => {
    const mediaQuery = window.matchMedia("(min-width: 600px)")
    const microbitManager = useRef(new uBitManager())
    const [adaptive, setAdaptive] = useState(mediaQuery.matches)
    const [context, setContext] = useState({microbits: []})

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
        <MicrobitContext.Provider value={{...context, microbitManager: microbitManager, updateContext: setContext}}>
        <div id='dashboard'>
            {adaptive ? <><NavbarWide/><PlotBar/></> : <button className="button helpButton">Help</button>}
            <div id='display'></div>
            {!adaptive && <Navbar/>}
        </div>
        </MicrobitContext.Provider>
    )
}

export default Dashboard;