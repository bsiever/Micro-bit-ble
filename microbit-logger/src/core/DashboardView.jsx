import { useContext, useState, useEffect } from "react";
import { MicrobitContext } from "./Dashboard";
import PlotBar from "./PlotBar";
import Loadingbar from "./Loadingbar";
import DataTable from "../table/DataTable";
import Graph from "../graph/Graph";
import { EraseModal } from "./EraseModal";

const DashboardView = ({view}) => {
    const {microbits, microbitManager} = useContext(MicrobitContext);
    const [tableReady, setTableReady] = useState(null);

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
        <div>
            {microbits.map((microbit) => {
                return <div key={microbit.id}>
                    <EraseModal microbit={microbit} />
                    <PlotBar microbit={microbit}/>
                    {tableReady ? view != 'table' ? <Graph microbit={microbit}/> : <DataTable microbit={microbit}/> : <Loadingbar microbit={microbit}/>}
                </div>
            })}
        </div>
    )
}

export default DashboardView;
