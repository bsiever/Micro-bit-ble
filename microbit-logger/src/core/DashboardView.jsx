import React, { useContext, useState, useEffect, createContext } from "react";
import { MicrobitContext } from "./Dashboard";
import PlotBar from "./PlotBar";
import Loadingbar from "./Loadingbar";
import DataTable from "../table/DataTable";
import DisconnectModal from "./modals/DisconnectModal";
import EraseModal from "./modals/EraseModal";
import Graph from "../graph/Graph";
import EditNameModal from "./modals/EditNameModal";
import GraphDisplay from "../graph/GraphDisplay";

const DashboardView = ({adaptive, view}) => {
    const {microbits, microbitManager, updateContext} = useContext(MicrobitContext);
    const [tableReady, setTableReady] = useState(null);
    const [modalShown, setModalShown] = useState(null);

    useEffect(() => {
        function ready(e) {
            setTableReady(e.detail.device.rows.slice(-1))
        }

        microbitManager.addEventListener('data-ready', ready);
    }, [])

    const renderModal = (microbit, visible) => {
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

            case 'editName':
                return <EditNameModal
                    microbit={microbit}
                    onClose={() => setModalShown(null)}
                    onNameChange={(newName) => {
                        microbit.setLabel(newName)
                        setModalShown(null);
                    }}
                    onReset={() => {
                        microbit.setLabel(null);
                        setModalShown(null);
                    }}
                    visible={visible}
                    />
            default:
                return <></>
        }
    }

    return (
        <div id='display'>
            {microbits.map((microbit) => {
                return <div key={microbit.id}>
                    <PlotBar
                        adaptive={adaptive}
                        microbit={microbit}
                        onButtonClick={(type) => setModalShown(type)}
                    />
                    <div style={{height: '58rem', overflowY: 'scroll'}}>
                    {tableReady
                        ? view != 'table'
                            ? <GraphDisplay microbit={microbit}/>
                            : <DataTable microbit={microbit}/>
                        : <Loadingbar microbit={microbit}/>
                    }
                    </div>
                    {renderModal(microbit, modalShown)}
                </div>
            })}
        </div>
    )
}

export default DashboardView;
