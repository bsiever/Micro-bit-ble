import { useEffect } from "react";
import useGraphData from "../hooks/useGraphData";
import Dygraph from "dygraphs";

const GraphDisplay = ({microbit}) => {

    // calls a dedicated hook which will parse the microbit rows to sort the data correctly into multiple data series
    // and properly wire the events so that updates will update the data
    const graphData = useGraphData(microbit);

    useEffect(() => {
        let reboots = [];

        graphData.forEach((graph, index) => {            
            new Dygraph(document.getElementById(`graph_${index}`), graph, {labels: ['Time (seconds)', microbit.headers[index+1]], legend: 'never'})
        });
    }, [graphData])

    return <div style={{padding: '2rem'}}>
        {graphData.map((_, index) => {
            return (<>
                <h3 style={{width: '100%', textAlign: 'center'}}>{microbit.headers[index+1]}</h3>
                <div id={`graph_${index}`} style={{width: '100%', height: '40rem', marginBottom: '2rem', border: '1px solid black'}}/>
            </>)
        })}
    </div>;
}

export default GraphDisplay;