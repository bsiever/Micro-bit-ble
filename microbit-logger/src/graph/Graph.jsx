import { useEffect } from "react";
import Dygraph from 'dygraphs';

const Graph = ({microbit}) => {
    useEffect(() => {
        let reboots = [];

        function plotReboots(rows) {
            let data = rows.map(r => [
                // Skip first three columns to retrieve raw data
                ...r.slice(3).map(s => parseFloat(s))
            ]);

            // Track cumulative microbit time across reboots
            let basetime = 0;
            data.forEach((d, i) => {
                // Always bump each point to the correct position
                d[0] += basetime;
                // Right-shift all future points after a reboot
                if (i < rows.length - 1 && rows[i + 1][1] === "true") basetime = d[0];
                // Preserve reboot time for graphical indicator
                if (rows[i][1] === "true") reboots.push([basetime, d[0]])
            });

            return data
        }

        new Dygraph(
            document.getElementById("graph"),
            plotReboots(microbit.rows),
            {
                labels: microbit.headers,
                legend: 'always',
                underlayCallback: function(canvas, area, g) {
                    canvas.fillStyle = "rgba(0, 0, 0, 0.1)";
                    reboots.forEach(([x, w]) => canvas.fillRect(
                        g.toDomXCoord(x),
                        area.y,
                        g.toDomXCoord(w) - g.toDomXCoord(x),
                        area.h
                    ))
                }
            }
        )
    }, [microbit.headers, microbit.rows]);

    return (
        <div id="graph" style={{width: '85vw', height: '60vh'}}></div>
    )
};

export default Graph;
