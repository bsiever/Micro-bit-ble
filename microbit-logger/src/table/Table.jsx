const Table = ({microbit}) => {
    console.log(microbit);


        const headers = microbit.getHeaders();
        const renderHeaders = headers.map((item) =>
                                        <th >{item}</th>);
        
        const rows = microbit.getData();

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

export default Table