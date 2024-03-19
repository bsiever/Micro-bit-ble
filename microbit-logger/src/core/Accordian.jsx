import React, { useContext, useEffect, useState } from "react";
import { MicrobitContext } from "../state/types.ts";

const Accordion = () => {
    const {microbits} = useContext(MicrobitContext);
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedMicrobit, setSelectedMicrobit] = useState(null);
    
    useEffect(() => {
        if (microbits.length > 0) {
          setSelectedMicrobit(microbits[0]);
        }
      }, [microbits]);
  
    const renderedItems = microbits.map((microbit, index) => {
      const active = microbit === selectedMicrobit ? 'active' : '';
      const onTitleClick = (index, microbit) => {
        setSelectedMicrobit(microbit);
        setActiveIndex(null);
      };
  
      return (
        <div key={microbit.name}>
          <div className={"microbit " + (active ? "active" : "")}
            onClick={() => onTitleClick(index, microbit)}>
            {microbit.name}
          </div>
        </div>
      );
    });
  
    if (microbits.length > 0) {
        return (
          <div className="accordian">
            <div onClick={() => setActiveIndex(activeIndex === 0 ? null : 0)}><div className="acItem">
              Selected Microbit: {selectedMicrobit ? selectedMicrobit.name : ''} </div>
            </div>
            <div className="acItem">{activeIndex === 0 && renderedItems}</div>
          </div>
        );
      } else {
        return null;
      }
  };
  
  export default Accordion;