import React, { useContext } from "react";
import { Accordion, AccordionButton, Button } from "react-bootstrap";
import { MicrobitContext } from "../state/types.ts";
import { MicrobitContextAction } from "../state/contextReducer.ts";

// Handles the accordions on the sidenav that display the microbits
const NavbarMicrobitDisplay = () => {
    const {microbits, updateContext} = useContext(MicrobitContext);


    return <Accordion defaultActiveKey={microbits.map((_, index) => index.toString())} alwaysOpen className='styledAccordion'>
        {microbits.map((microbit, index) => {
            const uBit = microbit.uBit;
            return (
                <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header style={{borderBottom: "none"}}>{uBit.label ?? uBit.name}</Accordion.Header>
                    <Accordion.Body>
                        <ul style={{listStyleType: 'none'}} className='buttonList'>
                            <li><button onClick={() => updateContext({actionType: MicrobitContextAction.CHANGE_VIEW, data: [index, 0]})}>Graph</button></li>
                            <li><button onClick={() => updateContext({actionType: MicrobitContextAction.CHANGE_VIEW, data: [index, 1]})}>Data Table</button></li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            )
        })}
    </Accordion>
}

export default NavbarMicrobitDisplay;