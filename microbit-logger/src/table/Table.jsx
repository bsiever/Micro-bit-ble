import { useContext, useEffect } from "react";
import { MicrobitContext } from "../core/Dashboard";

const Table = () => {
	const {microbitManager} = useContext(MicrobitContext);
	const {microbits, updateContext} = useContext(MicrobitContext);


	var map = microbitManager.current.devices;
	const bitName= map

	for(let [key, value] of map){
        const headers = value.getHeaders();
		console.log(value.getHeaders());
        const renderHeaders = headers.map((item) =>
                                        <th >{item}</th>);
        
        const rows = value.getData();
        console.log(rows);

        return (
		<div className='table'>
            <center>
			    <table>
                    <tr>
                        {renderHeaders}
                    </tr>
                        {rows.map((value, key) => {
                            return (
                                <tr>
                                    {value.map((items) => {
                                        return (
                                            <td>
                                            {items}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                </table>
            </center>
            <br/>
		</div>
	)
	}

    

	
}

export default Table