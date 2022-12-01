import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useQuery } from "react-query";
import { getRoutes, getRoutePoints } from "./api";
import '../PopUp.css';
//import routes from "../routes.json";




export const MapFilterForm = () => {
    const [selectedRoute,setSelectedRoute] =  useState(null)

    const { data:routes_data, isLoading:areRoutesLoading } = useQuery("getRoutes", () => getRoutes());
    const routes = areRoutesLoading ? [] : routes_data;

    const { data:points_data, isLoading:arePointsLoaded } = useQuery("getRoutePoints", () => getRoutePoints());
    const points = arePointsLoaded ? [] : points_data;

    function handleChange(e) {
        setStartStop(e.target.value)
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
                    
                </Form>
            </Container>
    )
}
