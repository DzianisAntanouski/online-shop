import { Button, Card, Col, Container, Image, Row, ListGroup } from "react-bootstrap";
import Star from "../asserts/star.jpg";
import { getOneDevice } from "../http/deviceAPI";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const DevicePage = () => {
    const { id } = useParams()
    
    const [device, setDevice] = useState({info: []})

    useEffect(() => {
        getOneDevice(id).then(data => setDevice(data))       
        // eslint-disable-next-line
    }, [])    

    return (
        <Container className="mt-4">
            <Row>
                <Col md="4" className="d-flex justify-content-left">
                    <Image width={295} height={300} src={`${process.env.REACT_APP_SERVER_API_URL}${device.img}`} />
                </Col>
                <Col md="4">
                    <Row className="justify-content-center">
                        <h2 style={{display: 'block', textAlign: 'center'}}>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center mt-2"
                            style={{ background: `url(${Star}) no-repeat center center`, width: 240, height: 240, backgroundSize: "contain" }}
                        >
                            <div className="d-flex justify-content-center mt-2" style={{ border: "1px solid", borderRadius: "50%", width: 25, height: 25 }}>
                                {device.rating}
                            </div>
                        </div>
                    </Row>
                </Col>
                <Col md="4" className="d-flex justify-content-end">
                    <Card className="d-flex flex-column" style={{width: 300, height: 300, textAlign: 'center', border: '5px solid lightgray'}}>
                        <Card.Header as='h5' style={{width: '100%'}} >Price</Card.Header>
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <Card.Text style={{fontSize: 24}}>{device.price} USD</Card.Text>
                            <Button variant="outline-dark"> Add devise </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column mt-2">
                <ListGroup variant="flush" className="ms-2">
                    <ListGroup.Item variant="primary"> Description: </ListGroup.Item>
                    {device.info.map(desc => 
                        <ListGroup.Item variant={desc.id % 2 ? 'light' : 'dark' } key={desc.id}> {desc.title} : {desc.description}</ListGroup.Item>                       
                    )}
                </ListGroup>
                
            </Row>
        </Container>
    );
};

export default DevicePage;
