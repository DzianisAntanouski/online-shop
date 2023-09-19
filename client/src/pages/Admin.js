import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateModal from "../components/modals/CreateModal";
import { observer } from "mobx-react-lite";

const Admin = observer(() => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");

    const handleClose = () => setShowModal(false);
    const handleShow = function () {
        setModalType(this.type);
        setShowModal(true);
    };

    return (
        <Container className="d-flex flex-column">
            <Button variant="outline-dark" className="mt-3 p-2" onClick={handleShow.bind({ type: "type" })}>
                Add type
            </Button>
            <Button variant="outline-dark" className="mt-3 p-2" onClick={handleShow.bind({ type: "brand" })}>
                Add brand
            </Button>
            <Button variant="outline-dark" className="mt-3 p-2" onClick={handleShow.bind({ type: "device" })}>
                Add device
            </Button>

            <CreateModal props={{ showModal, handleClose, modalType }} />
        </Container>
    );
});

export default Admin;
