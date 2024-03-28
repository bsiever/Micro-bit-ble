import { useEffect } from "react";
import Dygraph from 'dygraphs';
import {
    dateAxisLabelFormatter,
    numberAxisLabelFormatter
} from 'dygraphs/src/dygraph-utils'

// Milliseconds between graph updates
const REFRESH_RATE = 1000;

const Graph = ({microbit}) => {
    const uBit = microbit.uBit;

    const filteredHeaders = [
        uBit.headers[0],
        ...uBit.headers.slice(1).filter(
            (_, index) => microbit.columns[index]?.display
        )
    ]

    useEffect(() => {
        let highlight = null;
        let reboots = [];

        function plotReboots(rows) {
            let data = rows.map((r) => {
                // Extract one or more y-axes
                const s = r.slice(4);
                return [
                    // Use third column as x-axis
                    r[2] ? new Date(r[2]) : null,
                    // Convert empty fields to null instead of NaN
                    // filters the data for columns that are toggled off
                    ...s.map(t => t.length ? parseFloat(t) : null).filter(
                        (_, index) => {
                            return index == 0
                                || microbit.columns[index - 1]?.display
                        }
                    )
                ]
            });

            // Work backwards to calculate psuedotime before reboots
            const last = rows.length - 1;
            for (let i = last - 1; i >= 0; i--) {
                console.assert(data[i + 1][0] !== null,
                    "Local time error: unable to retrace from null timestamp")
                if (data[i][0] === null) {
                    const first = rows[i][3];
                    const second = rows[i + 1][3];
                    // Fall back to most recent interval at reboot
                    const delta = second > first
                        ? second - first
                        : rows[last][3] - rows[last - 1][3];
                    // Convert to milliseconds for Date arithmetic
                    const timestamp = data[i + 1][0].getTime() - delta * 1000;
                    data[i][0] = new Date(timestamp)
                }

                // Preserve reboot time for graphical indicator
                if (rows[i][1] === "true") {
                    if (!reboots.some(r => r.down === data[i][0].getTime())) {
                        reboots.push({
                            down: data[i][0].getTime(),
                            up: data[i + 1][0].getTime()
                        })
                    }
                }
            }

            return data
        }

        const data = plotReboots(uBit.rows);
        // Get timestamp of most recent boot
        const boot = reboots.length
            ? reboots[reboots.length - 1].up
            : data[0][0]

        // Display micro:bit time instead of pseudotime
        function switcher(x, dateCall, numberCall) {
            // x is only a fuzzy approximation of the actual value
            const lastIndex = data.findLastIndex(
                (d) => d[0] <= x
            );

            if (lastIndex >= 0 && data[lastIndex][0] < boot) {
                return numberCall(microbit.rows[lastIndex][3])
            }
            return dateCall(x)
        }

        const g = new Dygraph(
            document.getElementById("graph"),
            data,
            {
                axes: {
                    x: {
                        axisLabelFormatter: function(x, granularity, opts) {
                            return switcher(
                                x,
                                (d) => dateAxisLabelFormatter(
                                    d,
                                    granularity,
                                    opts
                                ),
                                (n) => numberAxisLabelFormatter(
                                    n,
                                    granularity,
                                    opts
                                )
                            )
                        },
                        valueFormatter: function(x) {
                            return switcher(
                                x,
                                (d) => new Date(d),
                                (n) => n
                            )
                        }
                    },
                },
                connectSeparatedPoints: true,
                labels: filteredHeaders,
                labelsDiv: 'legend',
                legend: 'always',
                highlightCallback: (event) => highlight = event,
                underlayCallback: function(canvas, area, g) {
                    canvas.fillStyle = "rgba(0, 0, 0, 1)";
                    reboots.forEach((x) => canvas.fillRect(
                        g.toDomXCoord(x.down),
                        area.y,
                        g.toDomXCoord(x.up) - g.toDomXCoord(x.down),
                        area.h
                    ))
                },
                unhighlightCallback: (event) => highlight = null
            }
        );

        const interval = setInterval(() => {
            g.updateOptions({
                file: plotReboots(uBit.rows)
            });

            // Fix legend details disappearing every update
            if (highlight !== null) {
                g.mouseMove_(highlight)
            }
        }, REFRESH_RATE);

        return () => {
            clearInterval(interval)
        }
    }, [filteredHeaders, uBit.rows]);

    return (
        <>
            <div id="graph" style={{width: '100%', height: '95%'}}></div>
            <div id="legend"></div>
        </>
    )
};

export default Graph;
