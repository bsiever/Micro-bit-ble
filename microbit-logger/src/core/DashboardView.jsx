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

const DashboardView = ({adaptive, view}) => {
    const {microbits, microbitManager, updateContext} = useContext(MicrobitContext);
    const [tableReady, setTableReady] = useState(null);
    const [modalShown, setModalShown] = useState(null);

    useEffect(() => {
        function ready(e) {
            setTableReady(e.detail.device.rows.slice(-1))
            updateContext({actionType: MicrobitContextAction.DATA_READY, data: e.detail.device})
        }

        microbitManager.addEventListener('data-ready', ready);
    }, [])

    const renderModal = (uBit, visible) => {
        const microbit = microbits.find((microbit) => microbit.id === uBit.id);
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
                    microbit={microbit}
                    onClose={() => setModalShown(null)}
                    onBoxChecked={(column) => {
                        column.display = !column.display;

                        const newColumns = microbit.columns.slice();
                        newColumns.splice(newColumns.findIndex((columnSearched) => columnSearched.name === column.name), 1, column);

                        updateContext({actionType: MicrobitContextAction.UPDATE_MICROBIT_DISPLAY, data: {...microbit, columns: newColumns}})
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
                        microbit={microbit.uBit}
                        onButtonClick={(type) => setModalShown(type)}
                    />
                    <div style={{height: '91vh', overflowY: 'scroll'}}>
                    {tableReady
                        ? view != 'table'
                            ? <Graph microbit={microbit}/>
                            : <DataTable microbit={microbit.uBit}/>
                        : <Loadingbar microbit={microbit.uBit}/>
                    }   
                    </div>
                    {renderModal(microbit.uBit, modalShown)}
                </div>
            })}
        </div>
    )
}

export default DashboardView;
