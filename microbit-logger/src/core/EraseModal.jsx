import React, { useState, useRef, useEffect, useContext } from 'react'
import { TimerContext } from "./DashboardView";

export const EraseModal = ({ microbit }) => {
    console.log(microbit);
    const { timer } = useContext(TimerContext);

    const handleDeleteButtonClick = async (event) => {
        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");

        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        microbit.sendErase();
    }

    const handleCancelButtonClick = async (event) => {
        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");

        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }


    return <div class="eraseModal"> 
    <section class="hidden modal" id="eraseM">
        
        <div>
            <p>
                    You are about to erase all data from the following device's memory:<br /><br />{microbit.name}
            </p>
        </div>
            {timer === 0 ? <div class="flex-container">
                <button class="modal-button" onClick={(event) => handleCancelButtonClick(event)}>Cancel</button>
                <button class="modal-button-delete"  onClick={(event) => handleDeleteButtonClick(event)}>Delete</button>
            </div> : <div>{ timer }</div>}
        
        </section>

    <div class="hidden overlay"></div>
    </div>
}

export default EraseModal