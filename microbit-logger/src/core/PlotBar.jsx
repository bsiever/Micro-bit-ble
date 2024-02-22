import React, { useContext, useEffect, useMemo, useState } from "react";

import UsableTooltip from "./UsableTooltip";
import { Dropdown } from "react-bootstrap";
import { MicrobitContext } from "../state/types.ts";


export const PlotBar = ({adaptive, microbit, onButtonClick}) => {
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
            <div style={{display: 'flex', alignItems: 'center', paddingLeft: '1%', width: '40%', height: '100%', fontSize: '1.75rem'}}>
                <div style={{paddingRight: '2.5%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{microbit.label ?? microbit.name}</div>
                {adaptive && <div style={{marginRight: '10%'}}><IconButton icon='edit_square' onClick={() => onButtonClick('editName')} tooltip="Edit Name"/></div>}
            </div>
            <div style={{display: 'flex', alignItems: 'center', width: '60%', height: '100%'}}>
                <div class='memoryBar' style={{flexGrow: 1, minWidth: '25%'}}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%', borderRadius: '10px 0 0 10px', width: `${progress}%`, backgroundColor: getColor()}}/>
                    <div style={{position: 'relative', left: '50%', transform: `translateX(-50%)`}}>{`${progress}% ${adaptive ? 'memory full' : ''}`}</div>
                </div>
                {adaptive ? (
                    <div style={{display: 'flex', justifyContent: 'space-around', margin: '0 1% 0 3%', width: '10rem'}}>
                        <IconButton icon='download' color='#1da121' onClick={() => handleDownloadButtonClick()} tooltip='Download CSV'/>
                        <IconButton icon='delete' color='darkred' onClick={() => onButtonClick('erase')} tooltip='Clear micro:bit Data'/>
                        <IconButton icon='cancel' color='red' onClick={() => onButtonClick('disconnect')} tooltip='Disconnect micro:bit'/>
                        {/*added in */}
                        <IconButton icon='settings' color='#575757' onClick={() => onButtonClick('plotOptions')} tooltip="Plot Options"/>
                    </div>
                ) : <Dropdown style={{marginLeft: '1rem'}}>
                    <Dropdown.Toggle as={CustomDropdownToggle}/>
                    <Dropdown.Menu align='end'>
                        <Dropdown.Item onClick={() => onButtonClick('editName')} class='dropdownOption'>
                            <Icon icon='edit_square'/>
                            Edit Name
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onButtonClick('plotOptions')} class='dropdownOption'>
                            <Icon icon='settings'/>
                            Change Plot Options
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={() => handleDownloadButtonClick()} class='dropdownOption'>
                            <Icon icon='download'/>
                            Download CSV
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onButtonClick('erase')} class='dropdownOption'>
                            <Icon icon='delete'/>
                            Clear micro:bit Data
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onButtonClick('disconnect')} class='dropdownOption'>
                            <Icon icon='cancel'/>
                            Disconnect micro:bit
                        </Dropdown.Item>
                        {/*added in */}
                        
                        
                    </Dropdown.Menu>
                    </Dropdown>}
            </div>
        </div>
    )
}

const CustomDropdownToggle = React.forwardRef(({onClick}, ref) => (
    <div style={{border: '1px solid black', borderRadius: '12.5%'}} onClick={onClick} ref={ref}>
        <IconButton icon='more_horiz' color='black' tooltip="Actions"/>
    </div>
))

const Icon = ({icon, color, size}) => {
    return <span class='material-symbols-outlined' style={{position: 'relative', fontSize: size ?? '1rem', transform: 'translateY(10%)', marginRight: '.25rem', color: color ?? "black"}}>{icon}</span>;
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
