import React, { useContext, useEffect, useMemo, useState } from "react";
import { MicrobitContext } from "./Dashboard";

import UsableTooltip from "./UsableTooltip";


export const PlotBar = ({microbit, onButtonClick}) => {
    const[progress, setProgress] = useState(0);

    const {microbitManager} = useContext(MicrobitContext);

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
        function usage(e) {
            if(e.detail.device === microbit) {
                setProgress(e.detail.percent);
            }
        }

        microbitManager.addEventListener('log-usage', usage);
        return () => {
            microbitManager.removeEventListener('log-usage', usage);
        }
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
            <div style={{display: 'flex', alignItems: 'center', paddingLeft: '1%', width: '12%', height: '100%', fontSize: '1.75rem'}}>
                <div style={{flexGrow: 1, paddingRight: '2.5%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{microbit.label ?? microbit.name}</div>
                <div style={{marginRight: '10%'}}><IconButton icon='edit_square' onClick={() => onButtonClick('editName')} tooltip="Edit Name"/></div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', width: '60%', height: '100%'}}>
                <div class='memoryBar' style={{flexGrow: 1}}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%', borderRadius: '10px 0 0 10px', width: `${progress}%`, backgroundColor: getColor()}}/>
                    <div style={{position: 'relative', left: '50%', transform: `translateX(-50%)`}}>{progress}% memory full</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around', margin: '0 1% 0 3%', width: '10rem'}}>
                    <IconButton icon='download' color='#1da121' onClick={() => handleDownloadButtonClick()} tooltip='Download CSV'/>
                    <IconButton icon='delete' color='darkred' onClick={() => onButtonClick('erase')} tooltip='Clear micro:bit Data'/>
                    <IconButton icon='cancel' color='red' onClick={() => onButtonClick('disconnect')} tooltip='Disconnect micro:bit'/>
                </div>
            </div>
        </div>
    )
}

const IconButton = ({icon, color, onClick, tooltip}) => {
    return (
        <UsableTooltip title={tooltip}>
            <div className='iconButton' onClick={onClick} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: color ?? '#2f73e0'}}>
                <span class='material-symbols-outlined' style={{fontSize: '2rem'}}>{icon}</span>
            </div>
        </UsableTooltip>
    )
}   

export default PlotBar;
