import { useContext, useState, useEffect } from "react";
import { MicrobitContext } from "./Dashboard";
import PlotBar from "./PlotBar";
import Loadingbar from "./Loadingbar";
import DataTable from "../table/DataTable";
import Graph from "../graph/Graph";
import { EraseModal } from "./EraseModal";
import React from 'react';
import Accordion from './Accordion';

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
    const accordionData = [
        {
          title: 'About the App',
          content: `This is an application to view and download data from your Micro-Bit. Instead of having to manually reterive data off of your Micro-Bit, this app will connect to your
          device, reterive the data, graph it, and offer a way to download your data to your device. This app was designed as part of Michigan Technological University's Senior Design program.`
        },
        {
          title: 'How to Connect a Micro:Bit',
          content: `Click the 'connect' button in the upper right corner on desktop or at the bottom of the screen on mobile to pair and/or connect a Micro-Bit. 
          The data already on the Micro-Bit will be loaded, and any data collected while the device is connected will be continually added to the plot and table.`
        },
        
      ];
    
      
    
    return (
        <div>

            {microbits.length>0 ? microbits.map((microbit) => {
                return <div key={microbit.id}>
                    
                    <EraseModal microbit={microbit} />
                    <PlotBar microbit={microbit}/>
                    {tableReady ? view != 'table' ? <Graph microbit={microbit}/> : <DataTable microbit={microbit}/> : <Loadingbar microbit={microbit}/>}
                </div>
            }):
            <div>
            <h7>Micro:Bit Bluetooth Web Logger </h7>
            <div className="accordion">
              {accordionData.map(({ title, content }) => (
                <Accordion title={title} content={content} />
              ))}
            </div>
            </div>}
          </div>
    )
}

export default DashboardView;
