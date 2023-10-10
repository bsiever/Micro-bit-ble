import { useContext, useEffect } from "react";
import { MicrobitContext } from "../core/Dashboard";
import Dygraph from 'dygraphs';

const Graph = () => {
    const {microbitManager} = useContext(MicrobitContext)

    useEffect(() => {
        function graph(e) {
            const g = new Dygraph(
                document.getElementById("graph"),
                e.detail.device.getRawCSV(),
                {
                    legend: 'always'
                }
            )
        }

        microbitManager.addEventListener("data-ready", graph)
        return () => {
            microbitManager.removeEventListener("data-ready", graph)
        }
    }, [])

    return (
        <div id="graph" style={{width: '85vw', height: '60vh'}}></div>
    )
}

export default Graph;
