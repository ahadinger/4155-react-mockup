import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../PopUp.css';
//need to get the data in the future

export const showStopPopup = (stop) => {
    const n = stop.routeName;
    return (
    <Container>
        <Row>
            <Col className="Card-title"><h5>{stop.name}</h5></Col>
        </Row>
        <Row className="Card-cell">
            <Col className="Card-bold">Route</Col>
            <Col className={n.replace(' ', '-')} style={{ textAlign: 'right' }}>{stop.routeName}</Col>
        </Row>
        <Row className="Card-cell">
            <Col className="Card-bold">Next Bus</Col>
            <Col style={{ textAlign: 'right' }}>5 minutes</Col>
        </Row>
        <Row className="Card-cell">
            <Col className="Card-bold">Something</Col>
            <Col style={{ textAlign: 'right' }}>Something else</Col>
        </Row>
        <Row className="Card-cell">
            <Col className="Card-bold">Something</Col>
            <Col style={{ textAlign: 'right' }}>Something else</Col>
        </Row>
    </Container>
    )
}
