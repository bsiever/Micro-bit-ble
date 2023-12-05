import React, { useContext, useState, useEffect, createContext } from "react";
import { MicrobitContext } from "./Dashboard";
import PlotBar from "./PlotBar";
import Loadingbar from "./Loadingbar";
import DataTable from "../table/DataTable";
import DisconnectModal from "./modals/DisconnectModal";
import EraseModal from "./modals/EraseModal";
import Graph from "../graph/Graph";

const DashboardView = ({view}) => {
    const {microbits, microbitManager, updateContext} = useContext(MicrobitContext);
    const [tableReady, setTableReady] = useState(null);
    const [modalShown, setModalShown] = useState(null);

    useEffect(() => {
        function ready(e) {
            setTableReady(e.detail.device.rows.slice(-1))
        }

        microbitManager.addEventListener('data-ready', ready);
        return () => {
            microbitManager.removeEventListener('data-ready', ready)
        }
    }, [])

    const whichModal = (microbit, visible) => {
        switch(visible) {
            case 'erase':
                return <EraseModal
                    microbit={microbit}
                    onClose={() => setModalShown(null)}
                    onDelete={() => {
                        microbit.sendErase();
                        setModalShown(null);
                    }}
                    visible={visible}
                />
            case 'disconnect':
                return <DisconnectModal
                    microbit={microbit}
                    onClose={() => setModalShown(null)}
                    onDisconnect={() => {
                        microbit.disconnect();
                        setModalShown(null);
                        updateContext({microbits: microbits.filter((m) => m !== microbit)});
                    }}
                    visible={visible}
                />
            default:
                return <></>
        }
    }

    return (
        <div id='display' style={{overflowY: view === 'graph' ? 'hidden' : 'visible'}}>
            {microbits.map((microbit) => {
                return <div key={microbit.id}>
                    <PlotBar
                        microbit={microbit}
                        onDisconnectClick={() => setModalShown('disconnect')}
                        onEraseClick={() => setModalShown('erase')}
                    />
                    {tableReady
                        ? view != 'table'
                            ? <Graph microbit={microbit}/>
                            : <DataTable microbit={microbit}/>
                        : <Loadingbar microbit={microbit}/>
                    }
                    {whichModal(microbit, modalShown)}
                </div>
            })}
        </div>
    )
}

export default DashboardView;
