import { useContext, useState, useEffect } from "react";
import { MicrobitContext } from "./Dashboard";
import PlotBar from "./PlotBar";
import Loadingbar from "./Loadingbar";
import Table from "../table/Table";
import Graph from "../graph/Graph";

const DashboardView = ({view}) => {
    const {microbits, microbitManager} = useContext(MicrobitContext);
    const [tableReady, setTableReady] = useState(false);

    useEffect(() => {
        microbitManager.addEventListener('data-ready', () => {
            setTableReady(true);
        }, {once: true});
    }, [])

    return (
        <div>
            {microbits.map((microbit) => {
                return <div key={microbit.id}>
                    <PlotBar microbit={microbit}/>
                    {tableReady ? view != 'table' ? <Graph/> : <Table microbit={microbit}/> : <Loadingbar microbit={microbit}/>}
                </div>
            })}
        </div>
    )
}

export default DashboardView;