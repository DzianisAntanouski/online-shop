import { Card, Col, Image } from "react-bootstrap";
import { BsStar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
    const navigate = useNavigate();
    return (
        <Col md="3" onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card style={{ width: 150, cursor: "pointer" }} border={"light"} className="mt-2">
                <Image width={150} height={220} src={`${process.env.REACT_APP_SERVER_API_URL}${device.img}`} />
                <div className="d-flex justify-content-center">
                    <div className="m-auto text-black-50">{device.name}</div>
                    <div className="d-flex align-items-center">
                        <div className="ml-2 me-1">{device.rating}</div>
                        <BsStar />
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
