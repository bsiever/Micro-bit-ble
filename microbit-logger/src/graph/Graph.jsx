import { useEffect } from "react";
import Dygraph from 'dygraphs';

const Graph = ({microbit}) => {
    const uBit = microbit.uBit;

    const filteredHeaders = [uBit.headers[0], ...uBit.headers.slice(1).filter((_, index) => microbit.columns[index]?.display)]

    useEffect(() => {
        let reboots = [];

        function plotReboots(rows) {
            let data = rows.map((r) => {
                // Skip first three columns to retrieve raw data
                const s = r.slice(3);
                return [
                    // Convert empty fields to null instead of NaN
                    // filters the data for columns that are toggled off
                    ...s.map(t => t.length ? parseFloat(t) : null).filter((_, index) => {
                        return index == 0 || microbit.columns[index-1]?.display
                    })
                ]
            });

            // Track cumulative uBit time across reboots
            let basetime = 0;
            data.forEach((d, i) => {
                // Always bump each point to the correct position
                d[0] += basetime;
                // Right-shift all future points after a reboot
                if (i < rows.length - 1 && rows[i + 1][1] === "true") basetime = d[0];
                // Preserve reboot time for graphical indicator
                if (rows[i][1] === "true") {
                    if (!reboots.some(r => r.down === basetime)) {
                        reboots.push({
                            down: basetime,
                            up: d[0]
                        })
                    }
                }
            });

            return data
        }

        const g = new Dygraph(
            document.getElementById("graph"),
            plotReboots(uBit.rows),
            {
                connectSeparatedPoints: true,
                labels: filteredHeaders,
                labelsDiv: 'legend',
                legend: 'always',
                underlayCallback: function(canvas, area, g) {
                    canvas.fillStyle = "rgba(0, 0, 0, 1)";
                    reboots.forEach((x) => canvas.fillRect(
                        g.toDomXCoord(x.down),
                        area.y,
                        g.toDomXCoord(x.up) - g.toDomXCoord(x.down),
                        area.h
                    ))
                }
            }
        );

        const interval = setInterval(() => {
            g.updateOptions({
                file: plotReboots(uBit.rows)
            })
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [filteredHeaders, uBit.rows]);

    return (
        <>
            <div id="legend"></div>
            <div id="graph" style={{width: '100%', height: '40rem'}}></div>
        </>
    )
};

export default Graph;
