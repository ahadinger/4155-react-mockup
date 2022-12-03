import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useQuery } from "react-query";
import { getRoutes, getRoutePoints, fetchRoutes } from "./api";
import '../PopUp.css';
//import routes from "../routes.json";
export const MapFilterForm = ({ mapFilters, setMapFilters }) => {

    const { data: res, isLoading: apiLoading } = useQuery("getRouteStops", () => fetchRoutes())

    const { data: routes_data, isLoading: areRoutesLoading, status } = useQuery("getRoutes", () => getRoutes(res), { enabled: !!res });
    const routes = !routes_data ? [] : routes_data;


    function handleChange(e) {
        console.log("CHANGING")
        if (!e.target.checked) {
            const index = mapFilters.indexOf(e.target.id);
            if (index > -1) { // only splice array when item is found
                mapFilters.splice(index, 1); // 2nd parameter means remove one item only

            }
            setMapFilters(mapFilters)
        }
        else {
            mapFilters.push(e.target.id)
            setMapFilters(mapFilters)
        }
    }

    const route_list = [];
    for (let i = 0; i < routes.length; i++) {
        let checked = false
        if (routes[i]['name'] == "Silver" || routes[i]['name'] == "Route Green") {
            checked = true
        }
        route_list.push(
            <>
                <Form.Check
                    type={"checkbox"}
                    onChange={handleChange}
                    label={`${routes[i].name}`}
                    id={`${routes[i].id}`}
                    defaultChecked={checked}
                />
            </>
        )
    }

    var left = 0 + 'px';
    var bottom = 0 + 'px';
    var padding = 10 + 'px';
    return (
        <div style={{ padding, left, bottom, position: 'absolute', zIndex: 1, display: 'flex' }}>
            <Card>
                <Card.Body>
                    <Form>
                        {route_list}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}