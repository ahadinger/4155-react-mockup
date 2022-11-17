import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './PopUp.css';
import { CreateRouteForm } from "./util/CreateRouteForm";

function CreateRouteButton() {
    const [showCRPopup,setCRPopup] =  useState(false)
    var right = 0 + 'px';
    var bottom = 0 + 'px';
    var padding = 10 + 'px';
    return (
      <div style={{padding, right, bottom,position:'absolute', zIndex: 1, display: 'flex'}}>
        {showCRPopup === false ? (
          <Button 
          variant="success"
          size="lg"
          onClick={() => {
            setCRPopup(true);
          }}
          >Create a Route</Button>
        ) : null}
        {showCRPopup === true ? (
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
                <CreateRouteForm/>
              </Card.Body>
            </Card>
          </Container>
        ) : null}
      </div>
    );
  }
  
  export default CreateRouteButton;