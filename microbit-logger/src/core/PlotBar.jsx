import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { uBit, uBitManager } from "../microbit/ubitwebblelog";
import { MicrobitContext } from "./Dashboard";
import { TimerContext } from "./DashboardView";

import editLogo from '../images/editLogo.png';
import settingsLogo from '../images/settingsLogo.png';
import downloadLogo from '../images/downloadLogo.png';
import disconnectLogo from '../images/disconnectLogo.png';
import deleteLogo from '../images/deleteLogo.png';


export const PlotBar = ({ microbit }, {startTimer}) => {
    const [progress, setProgress] = useState(0);
    const { setTimer } = useContext(TimerContext);

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

    const handleEraseButtonClick = async (event) => {
        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");
        setTimer(clearTimer(getDeadTime()));
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }


    const Ref = useRef(null);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        return {
            total
        };
    }

    const beginTimer = (e) => {
        let { total }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                total/1000
            )
        }
    }

    const clearTimer = (e) => {
        setTimer(3);

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            beginTimer(e);
        }, 50)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 4);
        return deadline;
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

    return <div className="container">
        <div id="plot-bar">
            <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '100%'}}>
                <div className="micro-bit-name">{microbit.name}</div>
                <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '25%'}}>
                    <button onClick={(event) => handleEditButtonClick(event)}style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px'}}>
                        <img src={editLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' ,fontSize: '20px'}} />
                    </button>
                    <button style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px'}}>
                        <img src={settingsLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' , marginTop: '-10%',fontSize: '20px'}} />
                    </button>
                    <button  onClick={(event) => handleDownloadButtonClick(event)} style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px'}}>
                        <img src={downloadLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' ,fontSize: '20px'}} />
                    </button>
                    <button style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px'}}>
                        <img src={disconnectLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' ,fontSize: '20px'}} />
                    </button>
                    <button onClick={handleEraseButtonClick} style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px'}}>
                        <img src={deleteLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' ,fontSize: '20px'}} />
                    </button>
                </div>
                <div className="memory-bar">
                    <div className="memory-bar-fill" style={{ width: progress+'%', backgroundColor: getColor(), borderRadius: "10px" }}></div>
                    <div className="memory-bar-label" style={{float: 'right', marginTop: '4px'}}>{progress}% memory used</div>
                </div>
            </div>
        </div>
    </div>
}

export default PlotBar;