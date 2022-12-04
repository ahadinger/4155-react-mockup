import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useQuery } from "react-query";
import { getAllStops, getRoutes,fetchRoutes } from "./api";
import '../PopUp.css';

//import routes from "../routes.json";




export const CreateRouteForm = ({ mapFilters, setMapFilters}) => {
    console.log(mapFilters)
    const [selectedRoute,setSelectedRoute] =  useState(null)

    const [startStop,setStartStop] =  useState(null)
    const [endStop,setEndStop] =  useState(null)
    const [stopList,setStopList] =  useState(null)

    const [minuteTimes,setTimes] =  useState(null)

    const { data: res } = useQuery("getRouteStops", () => fetchRoutes())

    const { data: routes_data } = useQuery("getRoutes", () => getRoutes(res), { enabled: !!res });

    const routes = !routes_data ? [] : routes_data;

    const { data:stops_data } = useQuery("getStops", () => getAllStops(res),{ enabled: !!res });
    const stops = !stops_data ? [] : stops_data;

    const route_list = [];
    for (let i = 0; i < routes.length; i++) {
        route_list.push(
            <>
                <option value={routes[i].id}
                    >{routes[i].name}</option>
            </>
        )
    }


    function handleRoute(e) {
        setSelectedRoute(e.target.value)
        if(selectedRoute !== e.target.value){ //avoid updating the stops list if it's not needed.
            updateStopsList(e.target.value)
        }
        setMapFilters([e.target.value])
    }

    function handleStart(e) {
        setStartStop(e.target.value)
    }
    function handleEnd(e) {
        setEndStop(e.target.value)
    }

    async function handleSubmit() {
        console.log("Route " + selectedRoute)
        if(startStop === null || endStop === null){
            //error validation
            console.log("please select two stops")
        }
        else if(startStop == endStop){
            //error validation
            console.log("please select two different stops")
        }
        else{
            setTimes(await getTimeForRoute(startStop, endStop, selectedRoute))
        }
        
        console.log("Starting from " + startStop);
        console.log("Ending at " +endStop);
    }

    function updateStopsList(routeId){
        setStartStop(null)
        setEndStop(null)
        setTimes(0)
        const tempList = []
        console.log("STOPS",stops)

        for(let i = 0; i < stops.length; i++){
            
            if (stops[i]['routeList'].includes(routeId)){
                tempList.push(
                    <>
                        <option value={stops[i]['id']}
                            >{stops[i]['name']}</option>
                    </>
                )
            } 
        }
        console.log("TEMPLIST",tempList)
        setStopList(tempList)
    }

    function getListofStops(routeId){
        const tempList = []
        for(let stop of stops){
            if (stop['routeList'].includes(routeId)){
                tempList.push(
                    stop['id']
                )
            } 
        }
        console.log(tempList)
        return tempList
    }

    async function getTimeForRoute(startID, endID, selectedRoute){
        let total = 0
        const stopList = getListofStops(selectedRoute)
        const startIndex = stopList.findIndex(obj => obj === startID)
        const endIndex = stopList.findIndex(obj => obj === endID)
        let i = startIndex
        while(i != endIndex){
            const resp = await fetch(`http://198.71.63.67:4100/stops/timetostop/${stopList[i]}/${stopList[(i+1)%stopList.length]}`)
            const json = await resp.json()
            console.log(json.timeTaken)
            i= (i+1)%stopList.length;
            if(resp.status != 404){
                total = total + json.timeTaken
            }
            
        }
        
        return total 
    }

    useEffect(()=>{
        const startStop = document.querySelector("#startStop")
        const endStop = document.querySelector("#endStop")
        startStop.value = startStop.defaultSelected
        endStop.value = endStop.defaultSelected
    },[stopList])

    return (
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Select a Route</Form.Label>
                            <Form.Select
                            onChange={handleRoute}
                            onSelect={handleRoute}
                            >
                            <option>Select a Route</option>
                            {route_list}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="start_stop">Starting at: </Form.Label>
                            <Form.Select id="startStop"
                            onChange={handleStart}
                            onSelect={handleStart}
                            >
                            {/* <option selected>Select a stop</option> */}
                            {stopList}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="end_stop">Ending at: </Form.Label>
                            <Form.Select id="endStop"
                            onChange={handleEnd}
                            onSelect={handleStart}
                            
                            >
                            {/* <option selected >Select a stop</option> */}
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
                            <Col style={{ textAlign: 'right' }}> Still WIP</Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Expected transit time</Col>
                            <Col style={{ textAlign: 'right' }}>{minuteTimes/60000} minutes</Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Expected time of Arrival</Col>
                            <Col style={{ textAlign: 'right' }}>Still WIP</Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
    )
}
