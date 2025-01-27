import Table from "react-bootstrap/Table";

const DataTable = ({ microbit }) => {
    const headers = microbit.getHeaders();
    const renderHeaders = headers.map((item, index) =>
        <th key={"header_" + index}>{item}</th>);

    renderHeaders.splice(1, 1); // removes reboot time header

    const rows = microbit.getData();
 
    return (
        <div className='table' style={{height: "100%", overflowY: 'scroll'}}>
            <Table bordered style={{ fontSize: '1.25em', height: '100%' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid black', position: 'sticky', top: 0, background: 'white' }}>
                        {renderHeaders}
                    </tr>
                </thead>
                <tbody key={'table_body'}>
                    {rows.map((value, rowIndex) => {
                        const displayedValues = [value[0], ...value.slice(2, value.length)]; // filters out reboot time value
                        const reboot = value[1] === 'true';
                        return (
                            <tr key={"row_" + rowIndex}>
                                {displayedValues.map((items, dataIndex) => {
                                    return (
                                        <td style={{ borderTop: reboot ? '10px solid grey' : undefined }} key={"row_" + rowIndex + "_" + dataIndex}>
                                            {items}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default DataTable;
