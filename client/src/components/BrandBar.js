import { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
    const { devices } = useContext(Context);

    return (
        <Row className="d-flex">
            <Card
                bg={!devices.selectedBrand.id ? "primary" : "none"}
                onClick={() => devices.setSelectedBrand({ brand: { id: null } })}
                text={!devices.selectedBrand.id ? "white" : "dark"}
                className="p-2 me-2"
                style={{ width: "auto", cursor: "pointer" }}
            >
                All brands
            </Card>
            {devices.brands.map((brand) => (
                <Card
                    bg={brand.id === devices.selectedBrand.id ? "primary" : "none"}
                    onClick={() => devices.setSelectedBrand(brand)}
                    text={brand.id === devices.selectedBrand.id ? "white" : "dark"}
                    key={brand.id}
                    className="p-2 me-2"
                    style={{ width: "auto", cursor: "pointer" }}
                >
                    {brand.name}
                </Card>
            ))}
        </Row>
    );
});

export default BrandBar;
