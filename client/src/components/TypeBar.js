import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const { devices } = useContext(Context);
    return (
        <ListGroup as="ol">
            <ListGroup.Item className="mb-1 border" as="li" style={{ cursor: "pointer" }} onClick={() => devices.setSelectedType({ type: { id: null } })} active={!devices.selectedType.id}>
                All types
            </ListGroup.Item>
            {devices.types.map((type) => {
                return (
                    <ListGroup.Item
                        className="mb-1 border"
                        as="li"
                        style={{ cursor: "pointer" }}
                        key={type.id}
                        onClick={() => devices.setSelectedType(type)}
                        active={type.id === devices.selectedType.id}
                    >
                        {type.name}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
});

export default TypeBar;
