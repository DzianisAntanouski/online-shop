import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { devices } = useContext(Context);
    return (
        <Row className="d-flex mt-2">
            {devices.devices.map((device) => (
                <DeviceItem key={device.id} device={device} />
            ))}
        </Row>
    );
});

export default DeviceList;
