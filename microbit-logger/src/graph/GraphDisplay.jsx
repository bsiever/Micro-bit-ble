import { useEffect } from "react";
import useGraphData from "../hooks/useGraphData";
import Dygraph from "dygraphs";

const GraphDisplay = ({microbit}) => {

    // calls a dedicated hook which will parse the microbit rows to sort the data correctly into multiple data series
    // and properly wire the events so that updates will update the data
    const graphData = useGraphData(microbit);

    useEffect(() => {
        new Dygraph(document.getElementById('testGraph'),
            graphData[0], {labels: ['Time (seconds)', microbit.headers[1]], legend: 'always'});
        
        new Dygraph(document.getElementById('testGraph2'),
            graphData[1], {labels: ['Time (seconds)', microbit.headers[2]], legend: 'always'});
    }, [graphData])

    return <>
        <div id='testGraph' style={{width: '100%', height: '67vh', border: '1px solid black', margin: "5 5"}}/>
        <div id='testGraph2' style={{width: '100%', height: '67vh', border: '1px solid black', margin: "5 5"}}/>
    </>;
}

export default GraphDisplay;