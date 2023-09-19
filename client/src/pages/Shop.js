import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../index";
import { getTypes, getBrands, getDevices } from "../http/deviceAPI.js";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { devices } = useContext(Context);

    useEffect(() => {
        getTypes().then((data) => devices.setTypes(data));
        getBrands().then((data) => devices.setBrands(data));
        getDevices(null, null, 1, 2).then((data) => {
            devices.setDevices(data.rows);
            devices.setTotalCount(data.count);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        debugger;
        getDevices(devices.selectedType.id, devices.selectedBrand.id, devices.page, 2).then((data) => {
            devices.setDevices(data.rows);
            devices.setTotalCount(data.count);
        });
    }, [devices.page, devices.selectedType, devices.selectedBrand]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md="3">
                    <TypeBar />
                </Col>
                <Col md="9">
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
