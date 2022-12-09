import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
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
    const [startTime,setStartTime] =  useState(null)
    const [distance,setDistance] =  useState(null)
    const [warningMessage,setMessage] =  useState(null)

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
        setMessage(displayInformationAboutStop(e.target.value))
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
            let temp = await getTimeForRoute(startStop, endStop, selectedRoute)
            setTimes(temp[0])
            setDistance(temp[1])
            console.log([temp[0], temp[1]] )
            setStartTime(await getTimeForBus(startStop, selectedRoute))
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
        let total_time = 0
        let total_distance = 0
        const stopList = getListofStops(selectedRoute)
        const startIndex = stopList.findIndex(obj => obj === startID)
        const endIndex = stopList.findIndex(obj => obj === endID)
        let i = startIndex
        while(i != endIndex){
            const resp = await fetch(`http://198.71.63.67:4100/stops/averagestoptimings/${stopList[i]}/${stopList[(i+1)%stopList.length]}`)
            const json = await resp.json()
            //console.log(json)
            i= (i+1)%stopList.length;
            if(resp.status != 404){
                total_time = total_time + json.timeTaken
                total_distance = total_distance + json.distance
            }
            
        }
        //console.log([total_time, total_distance] )
        return [total_time, total_distance] 
    }

    async function getTimeForBus(startID, selectedRoute){
        let total = 0
        const resp = await fetch(`http://198.71.63.67:4100/stops/timetostop/${startID}/`)
        const json = await resp.json();
        for(let i = 0; i < json.length; i++){
            if (json[i].routeId == selectedRoute){
                total = json[i].timeLeft
            }
        }
        return total
    }


    function getTimeOfArrivalString(milliseconds){
        const date = new Date();
        date.setMilliseconds(date.getMilliseconds() + milliseconds)
        const hour = ((date.getHours() + 11) % 12 + 1)
        let minutes = date.getMinutes()
        if(minutes < 10){
            minutes = "0"+minutes;
        }
        const outputstr = `${hour}:${minutes}`
        return outputstr;
    }

    function areBussesRunning(){
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const date = new Date();
        let day = weekday[date.getDay()];
        let hour = date.getHours()+1; 
        if (day === "Saturday" || day === "Sunday") {
            if(hour <= 9)
                return false
        } else {
            if(hour <= 6)
                return false
        }
        return true
    }

    function displayInformationAboutStop(id){
        let message = ""
        let footballroutes = ["22940", "3474"]
        if(areBussesRunning() == false){
            message = "Buses are not currently running."
        }
        else if(footballroutes.includes(id)){
            message = "This route only runs when there is a Charlotte 49ers home football game. \n Information will be inacurrate if route is not currently running"
        }
        else if(id == "26308"){ //shopping shuttle
            message = "This route runs Friday through Sunday from 5 p.m. to 9 p.m. \n Information will be inacurrate if route is not currently running"
        }

        else if(id == "35130"){ //greek village
            message = "This route runs on a limited schedule weekdays from 7:30 a.m. to 5:30 p.m. \n Information will be inacurrate if route is not currently running"
        }
        else{
            return null;
        }
        return (

            <Alert key={"warning"} variant={"warning"}>
                {message}
            </Alert>
        )
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
                            {warningMessage}
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
                            <Col style={{ textAlign: 'right' }}> {getTimeOfArrivalString(startTime)} </Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Expected transit time</Col>
                            <Col style={{ textAlign: 'right' }}>{(minuteTimes/60000).toFixed(2)} minutes</Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Expected time of Arrival</Col>
                            <Col style={{ textAlign: 'right' }}>{ getTimeOfArrivalString(startTime + minuteTimes) }</Col>
                        </Row>
                        <Row className="Card-cell">
                            <Col className="Card-bold">Faster to walk:</Col>
                            {console.log((distance/3)+  " " + (minuteTimes + startTime))}
                            <Col style={{ textAlign: 'right' }}> { ((minuteTimes + startTime) > (distance/3)).toString().replace("t", "T").replace("f", "F")}</Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
    )
}
