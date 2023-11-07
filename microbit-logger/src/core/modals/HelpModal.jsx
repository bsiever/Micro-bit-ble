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
                        <Accordion.Header>Basic Functions</Accordion.Header>
                        <Accordion.Body>
                            Click the 'Connect' button on the landing page to connect a micro:bit. The data that is already stored on the micro:bit will be loaded,
                            and any data collected while connected will be added to the graph and table.<br/><br/>
                            The micro:bit's memory usage is visible above the plot. To clear the data on the micro:bit, click the 'Clear' button to the left of the memory usage
                            and confirm that the data is safe to clear.<br/><br/>
                            If for some reason the micro:bit is disconnected while using this app, refresh the page, reconnect the micro:bit, and no data will be lost.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='2'>
                        <Accordion.Header>micro:bit Reboot Indicators and Time</Accordion.Header>
                        <Accordion.Body>
                            Reboots are indicated on the plot by a vertical bar. They are indicated on the table by a horizontal bar.<br/><br/>
                            The micro:bit does not record the passage of time while it is turned off. This means that time data is only available for data collected since it
                            was turned on last. When a reboot occurs, the new time will be dated based on the time of the device being used.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Exporting Data</Accordion.Header>
                        <Accordion.Body>
                            The table hides some rows and colums from the table which provide information about reboots. To download the data, use the 'Download CSV' button
                            in the menu above the data table or graph, which will procede to download all of the micro:bit data in .csv format (Comma-Seperated Values). This
                            file can be opened by any spreadsheet viewer.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </BaseModal>
    )
}

export default HelpModal