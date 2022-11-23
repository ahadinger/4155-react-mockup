import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../PopUp.css';

//need to get the data in the future

export const showStopPopup = (stop) => {
    const rows = [];
    for(let i = 0; i < stop['routeList'].length; i++){
        
        rows.push(
            <>
            <Row className="Card-cell">
                <Col className="Card-bold">Route</Col>
                <Col className={stop['routeNameList'][i].replace(' ', '-')} style={{ textAlign: 'right' }}>{stop['routeNameList'][i]}</Col>
            </Row>
            <Row className="Card-cell">
                <Col className="Card-bold">Next Bus</Col>
                <Col style={{ textAlign: 'right' }}>5 minutes</Col>
            </Row>
            </>
        )
    }
    return (
    <Container>
        <Row>
            <Col className="Card-title"><h5>{stop.name}</h5></Col>
        </Row>
        {rows}
    </Container>
    )
}
