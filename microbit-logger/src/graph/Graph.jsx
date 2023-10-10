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

        microbitManager.current.addEventListener("data-ready", graph)
        return () => {
            microbitManager.current.removeEventListener("data-ready", graph)
        }
    }, [])

    return (
        <div id="graph"></div>
    )
}

export default Graph;
