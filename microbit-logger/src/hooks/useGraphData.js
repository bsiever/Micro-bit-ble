import { useContext, useEffect, useState } from "react";
import { MicrobitContext } from "../core/Dashboard";

/*
        All existing microbit data is mapped to an array that looks something like:
        [
            // Graph 1 data
            [
                [<time>, <data>],
                [<time>, <data>],
                [<time>, <data>],
                [<time>, <data>],
                [<time>, <data>],
            ],

            // Graph 2 Data
            [
                [<time>, <data>],
                [<time>, <data>],
                [<time>, <data>],
                [<time>, <data>],
                [<time>, <data>],
            ],

            ...
        ]
    */

const useGraphData = (microbit) => {
    const [graphData, setGraphData] = useState([]);
    const {microbitManager} = useContext(MicrobitContext);

    useEffect(() => {
        const rows = microbit.rows;
        if(rows.length > 0) {
            const graphData = [];

            // we want to create graph data arrays for each column that is not within the first four since they are allocated for name, reboot, and time(s)
            for(let i = 4; i < rows[0].length; i++) {
                graphData.push([]);
            }

            // now we want to iterate through each row in the microbit data and sort that into the appropriate graph
            rows.forEach((row) => {

                const time = parseFloat(row[3]);
                // within each row, we get the graph data array corresponding to that column (graphData[i-4]) and then push a new row into that array using the time (row[3]) and the actual data (row[i]) 
                // row array looks something like: [<name>, <reboot occured>, <local time>, <time in seconds since start>, <data 1>, <data 2>, ..., <data n>]
                for(let i = 4; i < row.length; i++) {
                    graphData[i-4].push([time, parseFloat(row[i])]);
                }
            })

            // at this point, graphData would be expected to be an array with x arrays within it, where x is the number of graphs we are rendering. Within each of the x arrays, there should be further arrays formatted as [<time>, <data>]
            // so when we render a graph for <data 1>, Dygraphs will be able to accept graphData[0].
            setGraphData(graphData);
        }

        // TODO: wire up the events so that this data will be updated when the proper events are called

    }, [])

    return graphData;
}

export default useGraphData;