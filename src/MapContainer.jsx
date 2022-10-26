import React, { useState, process } from 'react';
import { GoogleMap, LoadScript, MarkerF, PolylineF, InfoWindowF } from '@react-google-maps/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BusStop from './images/small-circle-2.png';
import stops from './stops.json'
import green from './greenroute.json';
import silver from './silverroute.json';

import './App.css';

export const MapContainer = () => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  

  const defaultCenter = { //TODO change to user's position
    lat: 35.308053, lng: -80.733733
  }
  
  const greenPath = green;
  const silverPath = silver;
  
  const greenOptions = {
    strokeColor: '#007c00',
    strokeOpacity: 0.8,
    strokeWeight: 5,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  
  const silverOptions = {
    strokeColor: '#a8a8a8',
    strokeOpacity: 0.8,
    strokeWeight: 5,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };

  const CAMPUS_BOUNDS = {
    north: 35.315439301120726,
    south: 35.29918909848325,
    west: -80.75176478679214,
    east: -80.71247424385233,
  };

  const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };
  
  const [selectedStop, setSelectedStop] = useState(null);

  const getStopsContent = stops => {
    let content = [];

    for (let i = 0; i < stops.length; i++) {
      const item = stops[i];
      
      content.push(
      <MarkerF
        icon={BusStop}
        position={item.position}
        onClick={() => {
          setSelectedStop(item);
        }}
      >
        {selectedStop === item ?  (
          <InfoWindowF
            onCloseClick={() => setSelectedStop(null)}
            position={selectedStop.position}
            
            options={{
              shouldFocus: true,
              minWidth: 350,
              maxWidth: 350
            }}
            >
              <Container>
                <Row>
                  <Col className ="Card-title"><h5>{selectedStop.name}</h5></Col>
                </Row>
                <Row className ="Card-cell">
                  <Col className ="Card-bold">Route</Col>
                  <Col className = {selectedStop.route} style={{ textAlign: 'right' }}>{selectedStop.route}</Col>
                </Row>
                <Row className ="Card-cell">
                  <Col className ="Card-bold">Next Bus</Col>
                  <Col style={{ textAlign: 'right' }}>5 minutes</Col>
                </Row>
                <Row className ="Card-cell">
                  <Col className ="Card-bold">Something</Col>
                  <Col style={{ textAlign: 'right' }}>Something else</Col>
                </Row>
                <Row className ="Card-cell">
                  <Col className ="Card-bold">Something</Col>
                  <Col style={{ textAlign: 'right' }}>Something else</Col>
                </Row>
              </Container>
          </InfoWindowF>
        ) : null}
      </MarkerF>
      );
    }
    return content;
  };
  

  return (
    
      <LoadScript
        googleMapsApiKey = {process.env.REACT_APP_MAP_API_KEY}
      >
        
        <GoogleMap
          options={{
              mapTypeControl: false,
              StreetViewPanorama: false,
              streetViewControl: false,
              disableDefaultUI: true,
              gestureHandling: "greedy",
              restriction: {
                latLngBounds: CAMPUS_BOUNDS,
                strictBounds: false
              }
            }}
          onClick={() => setSelectedStop(null)}
          mapContainerStyle={mapStyles}
          zoom={16}
          center={defaultCenter}
          >
          {getStopsContent(stops)} 

          <PolylineF
          onLoad={onLoad}
          path={greenPath}
          options={greenOptions}
          />
          <PolylineF
          onLoad={onLoad}
          path={silverPath}
          options={silverOptions}
          />

        </GoogleMap>
      </LoadScript>
  )
}


export default MapContainer;
