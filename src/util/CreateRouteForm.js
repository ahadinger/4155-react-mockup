import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../PopUp.css';
import stops from "../stops.json";
//need to get the data in the future

export const CreateRouteForm = (stops) => {
    const green_stops = [];
    const silver_stops = [];

    for (let i = 0; i < stops.length; i++) {
        //stop_list.push(
        //    <>
        //        <option value={stop.name}>{stop.name}</option>
        //    </>
        //)
    }
    
    return (
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Select a Route</Form.Label>
                        <Form.Select id="disabledSelect">
                            <option>Green</option>
                            <option>Silver</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="start_stop">Starting at: </Form.Label>
                        <Form.Control id="start_stop" placeholder="Student Union East" /> 
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="end_stop">Ending at: </Form.Label>
                        <Form.Control id="end_stop" placeholder="North Deck" />
                    </Form.Group>
                    <Button variant="success" type="submit">Submit</Button>
                </Form>
                <br/>
                <Card>
                    <Card.Body>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Next Bus</Col>
                            <Col style={{ textAlign: 'right' }}>5 minutes</Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Next Bus</Col>
                            <Col style={{ textAlign: 'right' }}>5 minutes</Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Next Bus</Col>
                            <Col style={{ textAlign: 'right' }}>5 minutes</Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
    )
}
