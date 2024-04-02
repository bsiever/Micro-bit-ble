import React from "react";
import { uBit, uBitManager } from "../microbit/ubitwebblelog"
import { MicrobitContextActionType } from "./contextReducer";

/* 
General structure of our context:
    - microbitManager is an object from Bill's code that lets us operate on a microbit
    - microbits[] is an array of our abstraction of a microbit
    - adaptive is a boolean variable which is true if the page width is less than a certain threshold
    - updateContext is a reducer function which takes an action and will update the context provider with a new value after performing the action
*/

type MicrobitContextType = {
    microbitManager: uBitManager;
    microbits: Microbit[];
    adaptive: boolean;
    view: number[];
    updateContext: (action: MicrobitContextActionType) => void;
}

/* 
    Abstract version of a microbit:

    The main reason for this abstraction is so we can store extra information about a microbit - namely display information - at a high level without interfering with Bill's objects.
        - id is a string value containing the id for the microbit as Bill's code knows it
        - uBit is a reference to the uBit object created in Bill's code
        - columns[] is an array containing display information for each of the data series in a microbit.
            + "name" is the name of the column that is being used as this data series. If there is a column for "Temperature", there will also be a columns entry with the name "Temperature"
            + "display" is a boolean variable which determines whether or not the given data series should be shown or hidden (true = shown, false = hidden)
            + "color" is a string value (hexadecimal color value) which will be used to determine the color that should be used to indicate this data series when being displayed on the graph
*/

type Microbit = {
    id: string;
    uBit: uBit;
    columns: MicrobitColumn[];
}

type MicrobitColumn = {
    name: string;
    display: boolean;
    color?: string; // hexadecimal color string
}

// declares the context here so that it can be exported to other components
const MicrobitContext = React.createContext<MicrobitContextType>({view: [0, 0]} as MicrobitContextType);

export {MicrobitColumn, Microbit, MicrobitContextType, MicrobitContext}