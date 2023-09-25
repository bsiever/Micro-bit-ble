const Navbar = () => {
    return <div id='navbar'>
        <div style={{display: 'flex', alignItems: 'center', fontSize: '25px'}}>
            <div style={{width: '70px', height: '70px', border: '1px solid black', marginRight: '20px' }}/>
            Micro:Bit Bluetooth Web Logger
        </div>
        <div className='tab'>Graphs</div>
        <div className='tab'>Data</div>
    </div>
}

export default Navbar;