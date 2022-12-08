import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './PopUp.css';
import { CreateRouteForm } from "./util/CreateRouteForm";
import { MapFilterForm } from "./util/MapFilter";

export const CreateRouteButton = ({ mapFilters, setMapFilters}) => {
    const [showCRPopup,setCRPopup] =  useState(false)
    var right = 0 + 'px';
    var left = 0 + 'px';
    var bottom = 0 + 'px';
    var padding = 10 + 'px';
    return (
        <>
        {showCRPopup === false ? (
          <>
          <div style={{padding, left, bottom, zIndex: 2, display: 'flex'}}>
            <MapFilterForm mapFilters={mapFilters} setMapFilters = {setMapFilters}/>
          </div>
          
          <div style={{padding, right, bottom,position:'absolute', zIndex: 1, display: 'flex'}}>
            <Button 
            variant="success"
            size="lg"
            onClick={() => {
              setCRPopup(true);
            }}
            >Create a Route</Button>
          </div>
          </>
        ) : null}
        {showCRPopup === true ? (
          <>
          <div style={{padding, left, bottom, zIndex: 2, display: 'flex'}}></div>
          <div style={{padding, right, bottom,position:'absolute', zIndex: 1, display: 'flex'}}>
          <Container style={{padding:'-10px'}}>
            <Container style={{padding:'-10px'}}>
            <Button 
            className="float-sm-end"
            variant="outline-danger"
            onClick={() => {
              setCRPopup(false);
            }}
            >X</Button>
            </Container>
            <Card border="success"  style={{ width: '40rem'}}>
              <Card.Body>
                <Card.Title>Create Route</Card.Title>
                <CreateRouteForm mapFilters={mapFilters} setMapFilters = {setMapFilters}/>
              </Card.Body>
            </Card>
          </Container>
          </div>
          </>
        ) : null}
        </>
    );
  }
  
  export default CreateRouteButton;