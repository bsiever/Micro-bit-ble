import { uBit } from "../microbit/ubitwebblelog";
import { Microbit, MicrobitColumn, MicrobitContextType } from "./types";


enum MicrobitContextAction {
    CONNECT_MICROBIT = 0,
    DISCONNECT_MICROBIT = 1,
    DATA_READY = 2,
    UPDATE_MICROBIT_DISPLAY = 3,
    CHANGE_VIEW = 4,
}

type MicrobitContextActionType = {
    actionType: MicrobitContextAction;
    data?: any;  
}

const createMicrobitObject = (microbit: uBit): Microbit => {
    const headers = microbit.headers.slice(1);

    const columns = headers.map((header) => ({name: header, display: true}));

    return {id: microbit.name, uBit: microbit, columns}
}

const microbitContextReducer = (state: MicrobitContextType, action: MicrobitContextActionType) => {
    const {actionType, data} = action;

    const newState = {...state}; // creates a new object with all of the same attributes as the state
    if(actionType === MicrobitContextAction.CONNECT_MICROBIT) {
        const microbit = data as uBit;
        
        if(!state.microbits.find((searchedMicrobit) => searchedMicrobit.id === microbit.id)) {
            const columns = microbit.headers.map((header) => ({
                name: header,
                display: true
            }))

            newState.microbits = [...state.microbits, {id: microbit.id, uBit: microbit, columns}]
        }
    } else if(actionType === MicrobitContextAction.DISCONNECT_MICROBIT) {
        newState.microbits.findIndex((microbit) => microbit.id === data.id) != -1 
        && newState.microbits.splice(newState.microbits.findIndex((microbit) => microbit.id === data.id), 1)
    } else if(actionType === MicrobitContextAction.DATA_READY) {
        const uBit = data as uBit;
        const microbitObject = state.microbits.find((microbitObject) => microbitObject.id === data.id);

        if(!microbitObject) {
            newState.microbits = [...state.microbits, createMicrobitObject(uBit)]
        } else {
            if(microbitObject.columns.length === 0) {
                newState.microbits[newState.microbits.indexOf(microbitObject)] = {...microbitObject, columns: uBit.headers.slice(1).map((header) => ({name: header, display: true}))}
            }
        }
    } else if(actionType === MicrobitContextAction.UPDATE_MICROBIT_DISPLAY) {
        const microbitObject = data as Microbit;

        // deletes and replaces the existing microbit object with the new one passed in
        newState.microbits.splice(state.microbits.findIndex((microbit) => microbit.id === microbitObject.id), 1, microbitObject);
    } else if(actionType === MicrobitContextAction.CHANGE_VIEW) {
        const newView = data as number[];

        newState.view = newView;
    } else{
        return {...newState, ...data}
    }

    return newState;
}

export {microbitContextReducer, MicrobitContextAction, MicrobitContextActionType};