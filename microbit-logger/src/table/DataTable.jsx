import Table from "react-bootstrap/Table";

const DataTable = ({microbit}) => {
        const headers = microbit.getHeaders();
        const renderHeaders = headers.map((item) =>
                                        <th >{item}</th>);

        renderHeaders.splice(1, 1); // removes reboot time header
        
        const rows = microbit.getData();

        return (
		<div className='table'>
			<Table bordered style={{fontSize: '1.25em', height: '50rem', overflowY: 'scroll'}}>
                <tr style={{borderBottom: '1px solid black'}}>{renderHeaders}</tr>
                {rows.map((value, _) => {
                    const displayedValues = [value[0], ...value.slice(2, value.length)]; // filters out reboot time value
                    const reboot = value[1] === 'true';
                    return (
                        <tr>
                            {displayedValues.map((items) => {
                                return (
                                    <td style={{borderTop: reboot ? '10px solid grey' : undefined}}>
                                        {items}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </Table>
		</div>
	)
}

export default DataTable