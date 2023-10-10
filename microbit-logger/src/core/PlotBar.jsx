import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { uBit, uBitManager } from "../microbit/ubitwebblelog";
import { MicrobitContext } from "./Dashboard";

import editLogo from '../editLogo.png';
import settingsLogo from '../settingsLogo.png';
import downloadLogo from '../downloadLogo.png';
import disconnectLogo from '../disconnectLogo.png';
import deleteLogo from '../deleteLogo.png';


export const PlotBar = () => {

    const[progress, setProgress] = useState(0);
    const[mircobitname, setName] = useState("Micro:Bit Name");

    const {microbitManager} = useContext(MicrobitContext);

    const handleEditButtonClick = async (event) => {
        if(microbitManager.current.label == null){
            
        }
        else{
            setName(microbitManager.current.name);
        }
    }


    useEffect(() => {
    
        const intervalId = setInterval(() => {
            if (progress < 100){
                setProgress(progress + 1);
            }
            if (progress >= 100){
                setProgress(0);
            }
        }, 1000);
        
       return () => clearInterval(intervalId);
    }, [progress]);


    return <div className="container">
        <div id="plot-bar">
            <div style={{display: 'flex', alignItems: 'center', fontSize: '25px', width: '100%'}}>    
                <div className="micro-bit-name">{mircobitname}</div>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '25%'}}>
                    <button onClick={(event) => handleEditButtonClick(event)}style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px'}}>
                        <img src={editLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' ,fontSize: '20px'}} />
                    </button>
                    <button style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px', color:'white'}}>
                        <img src={settingsLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' , marginTop: '-10%',fontSize: '20px'}} />
                    </button>
                    <button  style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px', color:'white'}}>
                        <img src={downloadLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' ,fontSize: '20px'}} />
                    </button>
                    <button style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px', color:'white'}}>
                        <img src={disconnectLogo} style={{width: '40px', height: '40px', marginLeft: '-35%' ,fontSize: '20px'}} />
                    </button>
                    <button  style={{width: '40px', marginTop: '1%', height: '40px', marginRight: '2%', fontSize: '20px', color:'white'}}>
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