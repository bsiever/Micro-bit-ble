import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { uBit, uBitManager } from "../microbit/ubitwebblelog";
import { MicrobitContext } from "./Dashboard";
import { EraseModal } from "./EraseModal";

import editLogo from '../images/editLogo.png';
import settingsLogo from '../images/settingsLogo.png';
import downloadLogo from '../images/downloadLogo.png';
import disconnectLogo from '../images/disconnectLogo.png';
import deleteLogo from '../images/deleteLogo.png';


export const PlotBar = ({microbit}) => {
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

    const handleEraseButtonClick = async (event) => {
        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");

        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }


    useEffect(() => {
        microbitManager.addEventListener('log-usage', (usage) => {
            if(usage.detail.device === microbit) {
                setProgress(usage.detail.percent);
            }
        })
    }, []);


    return <div className="container">
        
        <div id="plot-bar">
            <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '100%'}}>    
                <div className="micro-bit-name">{microbit.name}</div>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '25%'}}>
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
                    <button onClick={(event) => handleEraseButtonClick(event)} style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px'}}>
                        <img src={deleteLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' ,fontSize: '20px'}} />
                    </button>
                </div>  
            </div>
            <div className="memory-bar-label" style={{marginTop: '-1%',display: 'flex', justifyContent: 'flex-end', width: '98%'}}>{progress}% memory used</div>
        </div>
        <div className="memory-bar">
            <div className="memory-bar-fill" style={{ width: progress+'%' }}></div>
        </div>
    </div>
}

export default PlotBar;