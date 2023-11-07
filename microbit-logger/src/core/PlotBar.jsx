import React, { useContext } from "react";
import { useState, useEffect, useMemo } from "react";
import { MicrobitContext } from "./Dashboard";

import editLogo from '../images/editLogo.png';
import settingsLogo from '../images/settingsLogo.png';
import downloadLogo from '../images/downloadLogo.png';
import disconnectLogo from '../images/disconnectLogo.png';
import deleteLogo from '../images/deleteLogo.png';
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip';
import UsableTooltip from "./UsableTooltip";


export const PlotBar = ({microbit, onEraseClick}) => {
    const[progress, setProgress] = useState(0);

    const {microbitManager} = useContext(MicrobitContext);

    const handleEditButtonClick = async (event) => {
        // edit button functionality
    }
    const handleDownloadButtonClick = async (event) => {
        const file = new File([microbit.getCSV()], 'uBitData.csv', {
            type: 'text/csv'
        })
        function download() {
            const link = document.createElement('a')
            const url = URL.createObjectURL(file)
          
            link.href = url
            link.download = file.name
            document.body.appendChild(link)
            link.click()
          
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          }
       
        download();
        
    }


    useEffect(() => {
        microbitManager.addEventListener('log-usage', (usage) => {
            if(usage.detail.device === microbit) {
                setProgress(usage.detail.percent);
            }
        })
    }, []);

    const getColor = () => {
        let n;
        n = (progress < 25) ? 1 : Math.max(75-progress, 0)/50;
        let g = [n* 46, n*204, n* 71];
        n = (progress < 75) ? Math.max((progress-25)/50, 0) : Math.max(100-progress, 0)/25;
        let y = [n*255, n*165, n*  0];
        n = Math.max((progress-75)/25, 0);
        let r = [n*255, n*  0, n*  0];
        return "#" +
            ("0" + Math.round(g[0]+y[0]+r[0]).toString(16)).slice(-2) +
            ("0" + Math.round(g[1]+y[1]+r[1]).toString(16)).slice(-2) +
            ("0" + Math.round(g[2]+y[2]+r[2]).toString(16)).slice(-2)
        ;
    };

    return (
        <div id="plot-bar">
            <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '100%'}}>
                <div className="micro-bit-name">{microbit.name}</div>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    {/* <button onClick={(event) => handleEditButtonClick(event)} className='actionButton'>
                        <img src={editLogo} />
                    </button>
                    <button className='actionButton'>
                        <img src={settingsLogo}  />
                    </button> */}
                    <UsableTooltip title='Download CSV' placement='top'><button  onClick={(event) => handleDownloadButtonClick(event)} className='actionButton'>
                        <img src={downloadLogo} />
                    </button></UsableTooltip>
                    {/* <button className='actionButton'>
                        <img src={disconnectLogo} />
                    </button> */}
                    <UsableTooltip title='Clear micro:bit Data' placement='top'><button onClick={onEraseClick} className='actionButton'>
                        <img src={deleteLogo} />
                    </button></UsableTooltip>
                    
                </div>
                <div className="memory-bar">
                    <div className="memory-bar-fill" style={{ width: progress+'%', backgroundColor: getColor(), borderRadius: "10px" }}></div>
                    <div className="memory-bar-label" style={{float: 'right', marginTop: '4px'}}>{progress}% memory used</div>
                </div>
            </div>
        </div>
    )
}

export default PlotBar;