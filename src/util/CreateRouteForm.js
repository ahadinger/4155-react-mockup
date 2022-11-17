import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useQuery } from "react-query";
import { getAllStops } from "./api";
import '../PopUp.css';
import routes from "../routes.json";



export const CreateRouteForm = () => {
    const [selectedRoute,setSelectedRoute] =  useState(null)

    const [startStop,setStartStop] =  useState(null)
    const [endStop,setEndStop] =  useState(null)
    const [stopList,setStopList] =  useState(null)

    const { data, isLoading } = useQuery("getStops", () => getAllStops());
    const stops = isLoading ? [] : data;

    const route_list = [];

    for (let i = 0; i < routes.length; i++) {
        route_list.push(
            <>
                <option value={routes[i]['name']}>{routes[i]['name']}</option>
            </>
        )
    }


    function handleRoute(e) {
        console.log("user selected " + e.target.value)
        setSelectedRoute(e.target.value)
        if(selectedRoute !== e.target.value){
            updateStopsList(e.target.value)
        }
        //in the future, selecting a route will only show stops that are in the route
        //will probably be an extension of future filter feature.
    }

    function handleStart(e) {
        setStartStop(e.target.value)
    }
    function handleEnd(e) {
        setEndStop(e.target.value)
    }

    function handleSubmit() {
        console.log("Route " + selectedRoute)
        console.log("Starting from " + startStop);
        console.log("Ending at " +endStop);
    }

    function updateStopsList(routeName){
        const tempList = []
        for(const stop of stops){
            console.log(selectedRoute)
            if (stop['routeNameList'].includes(routeName)){
                console.log(stop['routeNameList'])
                tempList.push(
                    <>
                        <option value={stop['name']}>{stop['name']}</option>
                    </>
                )
            } 
        }
        setStopList(tempList)
    }

    return (
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Select a Route</Form.Label>
                            <Form.Select
                            onChange={handleRoute}
                            >
                            <option>Select a Route</option>
                            {route_list}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="start_stop">Starting at: </Form.Label>
                            <Form.Select
                            onChange={handleStart}
                            >
                            
                            {stopList}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="end_stop">Ending at: </Form.Label>
                            <Form.Select
                            onChange={handleEnd}
                            >
                            
                            {stopList}
                            </Form.Select>
                    </Form.Group>
                    <Button variant="success" onClick={handleSubmit}>Submit</Button>
                </Form>
                <br/>
                <Card>
                    <Card.Body>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Bus Arrives: </Col>
                            <Col style={{ textAlign: 'right' }}>5:21 PM</Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Expected transit time</Col>
                            <Col style={{ textAlign: 'right' }}>15 minutes</Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Expected time of Arrival</Col>
                            <Col style={{ textAlign: 'right' }}>5:36</Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
    )
}
