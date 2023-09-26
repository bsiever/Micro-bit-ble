import { useState } from "react";
import React from "react";
import Navbar from "./Navbar";
import { uBitManager } from "../microbit/ubitwebblelog";

export const MicrobitContext = React.createContext({})

const Dashboard = () => {
    const microbitManager = new uBitManager();
    const [context, setContext] = useState({microbits: []})

    return (
        <MicrobitContext.Provider value={{...context, microbitManager: microbitManager, updateContext: setContext}}>
        <div id='dashboard'><Navbar/><div id='display'></div></div>
        </MicrobitContext.Provider>
    )
}

export default Dashboard;