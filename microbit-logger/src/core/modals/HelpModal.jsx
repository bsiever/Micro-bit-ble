import BaseModal from "./BaseModal"
import Accordion from "react-bootstrap/Accordion";

const HelpModal = ({visible, setVisible}) => {
    return (
        <BaseModal title='Help' visible={visible} setVisible={setVisible}>
            <div>
                <Accordion defaultActiveKey={'0'}>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Supported Platforms</Accordion.Header>
                        <Accordion.Body>
                            Communicating with Bluetooth devices from a web page is only supported in Chromium-based desktop
                            web browsers and select Android applications. Firefox for Desktop, Safari for Desktop, and all iOS 
                            applications will not be able to use this application.<br/><br/>
                            Please use Chrome for Desktop or Android, or check the <a href='https://caniuse.com/web-bluetooth'>list of other supported browsers</a>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='1'>
                        <Accordion.Header>Basic Usage</Accordion.Header>
                        <Accordion.Body>
                            <b>Connecting a Micro:bit</b><br/>
                            Click the 'Connect' button on the landing page to connect a micro:bit. The data that is already stored on the micro:bit will be loaded,
                            and any data collected while connected will be added to the graph and table.<br/><br/>
                            <b>Switching Views</b><br/>
                            Selecting "Graphs" or "Data" will switch you to their respective views. The "Graph" view will allow you to view your data
                            on a line graph. The "Data" view shows your data organized into a table.<br/><br/>
                            <b>Plot Options</b><br/>
                            You can manage which time series are shown by selecting or deselecting each series.<br/><br/>
                            <b>Micro:bit Memory Usage</b><br/>
                            The micro:bit's memory usage is visible above the plot. To clear the data on the micro:bit, click the 'Clear' button to the left of the memory usage
                            and confirm that the data is safe to clear.<br/><br/>
                            <b>Accidental Disconnection</b><br/>
                            If for some reason the micro:bit is disconnected while using this app, refresh the page, reconnect the micro:bit, and no data will be lost.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='2'>
                        <Accordion.Header>Graph View</Accordion.Header>
                        <Accordion.Body>
                            <b>Reboots</b><br/>
                            Reboots are indicated by solid black vertical bars.<br/><br/>
                            <b>Zooming on Desktop</b><br/>
                            Click and drag over the portion of the graph you would like to zoom to. Zooming is possible both vertically and horizontally. 
                            To zoom out, double click anywhere on the graph.<br/><br/>
                            <b>Zooming on Mobile</b><br/>
                            Touch two fingers on the graph and spread them apart to zoom in. Touch two fingers on the graph and bring them closer to zoom 
                            out. Double tapping the graph will fully zoom out.<br/><br/>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Data View</Accordion.Header>
                        <Accordion.Body>
                            <b>Reboots</b><br/>
                            Reboots are indicated by solid gray horizontal lines.<br/><br/>
                            <b>Time (local)</b><br/>
                            Micro:bits do not have the ability to store local time. Local time is calculated with how long ago the data entry was taken and 
                            your device's time. Because micro:bits have no way of knowing how long they have been shut off for, local time is not available 
                            for an data recorded before the last reboot.<br/><br/>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Managing Multiple Micro:bits</Accordion.Header>
                        <Accordion.Body>
                            <b>Disconnecting a Micro:bit</b><br/>
                            Clicking disconnect will disconnect the currently listed micro:bit.<br/><br/>
                            <b>Switching between Micro:bits (not currently implemented)</b><br/>
                            Open the dropdown menu near your micro:bit's name and select or deselect which micro:bits you want to be displayed.<br/><br/>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Exporting Data</Accordion.Header>
                        <Accordion.Body>
                            To download the data, use the 'Download CSV' button
                            in the menu above the data table or graph, which will procede to download all of the micro:bit data in .csv format (Comma-Seperated Values). This
                            file can be opened by any spreadsheet viewer.<br/><br/>

                            <b>Emailing your data to yourself from a mobile device</b><br/>
                            Once downloaded, a notification about your file should drop down. Tap
                            this notification to open your file. Select the three dots to open the menu. 
                            Tap share and export. Tap share a copy. Select the format you want to send it in, and then tap ok.
                            Then select the app you would like to send your data too. Use your chosen app to send your data. 
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </BaseModal>
    )
}

export default HelpModal