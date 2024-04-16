import React, { useContext, useState, useEffect } from "react";
import PlotBar from "./PlotBar";
import Loadingbar from "./Loadingbar";
import DataTable from "../table/DataTable";
import DisconnectModal from "./modals/DisconnectModal";
import EraseModal from "./modals/EraseModal";
import Graph from "../graph/Graph";
import EditNameModal from "./modals/EditNameModal";
import PlotOptionsModal from "./modals/PlotOptionsModal";
import { MicrobitContext } from "../state/types.ts";
import { MicrobitContextAction } from "../state/contextReducer.ts";

const DashboardView = ({adaptive}) => {
    const {microbits, microbitManager, updateContext, view} = useContext(MicrobitContext);
    const [tableReady, setTableReady] = useState(null);
    const [modalShown, setModalShown] = useState(null);

    const selectedMicrobit = microbits[view[0]]

    useEffect(() => {
        function ready(e) {
            setTableReady(e.detail.device.rows.slice(-1))
            updateContext({actionType: MicrobitContextAction.DATA_READY, data: e.detail.device})
        }

        microbitManager.addEventListener('data-ready', ready);
    }, [])

    const renderModal = (uBit, visible) => {
        switch(visible) {
            case 'erase':
                return <EraseModal
                    uBit={uBit}
                    onClose={() => setModalShown(null)}
                    onDelete={() => {
                        uBit.sendErase();
                        setModalShown(null);
                    }}
                    visible={visible}
                />
            case 'disconnect':
                return <DisconnectModal
                    uBit={uBit}
                    onClose={() => setModalShown(null)}
                    onDisconnect={() => {
                        uBit.disconnect();
                        setModalShown(null);
                    }}
                    visible={visible}
                />

            case 'editName':
                return <EditNameModal
                    uBit={uBit}
                    onClose={() => setModalShown(null)}
                    onNameChange={(newName) => {
                        uBit.setLabel(newName)
                        setModalShown(null);
                    }}
                    onReset={() => {
                        uBit.setLabel(null);
                        setModalShown(null);
                    }}
                    visible={visible}
                    />
            //added code
            case 'plotOptions':
                return <PlotOptionsModal
                    microbit={selectedMicrobit}
                    onClose={() => setModalShown(null)}
                    onBoxChecked={(column) => {
                        column.display = !column.display;

                        const newColumns = selectedMicrobit.columns.slice();
                        newColumns.splice(newColumns.findIndex((columnSearched) => columnSearched.name === column.name), 1, column);

                        updateContext({actionType: MicrobitContextAction.UPDATE_MICROBIT_DISPLAY, data: {...selectedMicrobit, columns: newColumns}})
                    }}
                    visible={visible}
                    />
            
            default:
                return <></>
        }
    }

    return (
        <div id='display'>
                <div key={selectedMicrobit.id}>
                    <PlotBar
                        adaptive={adaptive}
                        microbit={selectedMicrobit.uBit}
                        onButtonClick={(type) => setModalShown(type)}
                    />
                    <div style={{height: '88vh'}}>
                    {tableReady
                        ? view[1] != 1
                            ? <Graph microbit={selectedMicrobit}/>
                            : <DataTable microbit={selectedMicrobit.uBit}/>
                        : <Loadingbar microbit={selectedMicrobit.uBit}/>
                    }   
                    </div>
                    {renderModal(selectedMicrobit.uBit, modalShown)}
                </div>
            </div>
    )
}

export default DashboardView;
