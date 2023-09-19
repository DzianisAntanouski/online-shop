import { useContext, useState, useEffect } from "react";
import { Modal, Button, Card, Form, Dropdown, Col, Row } from "react-bootstrap";
import { Context } from "../../index";
import { BiNoEntry } from "react-icons/bi";
import { observer } from "mobx-react-lite";
import { createDevice, createType, getBrands, getTypes, createBrand } from "../../http/deviceAPI";

const CreateModal = observer((props) => {
    const { showModal, handleClose, modalType } = props.props;
    const [name, setName] = useState("");
    const [type, setType] = useState({ name: "Choose type" });
    const [brand, setBrand] = useState({ name: "Choose brand" });
    const [file, setFile] = useState(null);
    const [price, setPrice] = useState(0);
    const postDataByModalType = {
        type: async () => {
            try {
                createType(name).then((data) => handleClose());
            } catch (error) {
                alert("error");
            }
        },
        brand: () => {
            try {
                createBrand(name).then((data) => handleClose());
            } catch (error) {
                alert("error");
            }
        },
        device: () => {
            try {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("typeId", type.id);
                formData.append("brandId", brand.id);
                formData.append("img", file);
                formData.append("price", `${price}`);
                formData.append("info", JSON.stringify(info));
                createDevice(formData).then((data) => handleClose());
            } catch (error) {
                alert("error");
            }
        },
    };
    const handleSend = () => {
        postDataByModalType[`${modalType}`]();

        setName("");
        setPrice(0);
        setFile({});
        setBrand("Choose brand");
        setType("Choose brand");
    };

    const changeInfo = (key, value, date) => {
        setInfo(info.map((i) => (i.date === date ? { ...i, [key]: value } : i)));
    };

    const { devices } = useContext(Context);
    const [info, setInfo] = useState([]);
    const addInfo = () => {
        setInfo([...info, { title: "", description: "", date: Date.now() }]);
    };

    useEffect(() => {
        getTypes().then((data) => devices.setTypes(data));
        getBrands().then((data) => devices.setBrands(data));
        // eslint-disable-next-line
    }, []);

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new {modalType}</Modal.Title>
            </Modal.Header>
            <Card className="p-3">
                <Form className="d-flex flex-column ">
                    <Form.Control placeholder={`Enter ${modalType} name`} value={name} onChange={(e) => setName(e.target.value)} className="mt-3 mb-2" />
                    {modalType === "device" && (
                        <>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{type.name}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {devices.types.map((type) => (
                                        <Dropdown.Item
                                            key={type.id}
                                            onClick={() => {
                                                setType(type);
                                            }}
                                        >
                                            {type.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{brand.name}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {devices.brands.map((brand) => (
                                        <Dropdown.Item
                                            key={brand.id}
                                            onClick={() => {
                                                setBrand(brand);
                                            }}
                                        >
                                            {brand.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Control
                                type="file"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                }}
                                placeholder={`Enter ${modalType} image`}
                                className="mt-3 mb-2"
                            />
                            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={`Enter ${modalType} price`} className="mt-3 mb-2" />
                            <hr />
                            <Button variant="outline-dark" onClick={addInfo} className="mt-2 mb-2">
                                Add description
                            </Button>
                            {info.map((description) => (
                                <Row key={description.date} className="mt-2 mb-2">
                                    <Col md={4}>
                                        <Form.Control placeholder="Add title" value={description.title} onChange={(e) => changeInfo("title", e.target.value, description.date)} />
                                    </Col>
                                    <Col md={7}>
                                        <Form.Control placeholder="Add description" value={description.description} onChange={(e) => changeInfo("description", e.target.value, description.date)} />
                                    </Col>
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <BiNoEntry onClick={() => setInfo(info.filter((el) => el.date !== description.date))} style={{ cursor: "pointer", color: "red" }} />
                                    </Col>
                                </Row>
                            ))}
                        </>
                    )}
                </Form>
            </Card>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={handleSend}>
                    Create
                </Button>
                <Button variant="outline-danger" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateModal;
