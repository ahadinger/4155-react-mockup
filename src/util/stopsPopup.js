import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../PopUp.css';
import { useQuery } from "react-query";
//need to get the data in the future

export const showStopPopup = (stop, timeArray) => {

    function getTimingForRoute (routeId){
        if(timeArray == undefined){return "No timing is availble for that stop, please refresh"}
        for(let i = 0; i < timeArray.length; i++){
            if(timeArray[i].routeId == routeId){
                return timeArray[i].timeLeft
            }
        }
    }
    
    const rows = [];
    rows.push(
        <>
        <Row className="Card-cell">
            <Col className="Card-bold">Route</Col>
            <Col className="Card-bold" style={{ textAlign: 'right' }}>Next Bus</Col>
        </Row>
        </>
    )
    for(let i = 0; i < stop['routeList'].length; i++){
        
        rows.push(
            <>
            <Row className="Card-cell">
                <Col className={stop['routeNameList'][i].replace(' ', '-')}>{stop['routeNameList'][i]}</Col>
                <Col style={{ textAlign: 'right' }}> {`${(getTimingForRoute(stop['routeList'][i])/60000).toFixed(2)} minutes`} </Col>
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
