import { useContext, useState, useEffect, createContext } from "react";
import { MicrobitContext } from "./Dashboard";
import PlotBar from "./PlotBar";
import Loadingbar from "./Loadingbar";
import DataTable from "../table/DataTable";
import Graph from "../graph/Graph";
import React from 'react';
import EraseModal from "./modals/EraseModal"

const DashboardView = ({view}) => {
    const {microbits, microbitManager} = useContext(MicrobitContext);
    const [tableReady, setTableReady] = useState(null);
    const [modalShown, setModalShown] = useState(false);

    useEffect(() => {
        function ready(e) {
            setTableReady(e.detail.device.rows.slice(-1))
        }

        microbitManager.addEventListener('data-ready', ready);
        return () => {
            microbitManager.removeEventListener('data-ready', ready)
        }
    }, [])
    
    return (
        <div id='display' style={{overflowY: view === 'graph' ? 'hidden' : 'visible'}}>
            {microbits.map((microbit) => {
                return <div key={microbit.id}>
                    <PlotBar microbit={microbit} onEraseClick={() => setModalShown(true)}/>
                    {tableReady ? view != 'table' ? <Graph microbit={microbit}/> : <DataTable microbit={microbit}/> : <Loadingbar microbit={microbit}/>}
                    <EraseModal microbit={microbit} visible={modalShown} onDelete={() => {
                        microbit.sendErase();
                        setModalShown(false);
                    }} onClose={() => setModalShown(false)}/>
                </div>
            })}
            
        </div>
    )
}

export default DashboardView;
