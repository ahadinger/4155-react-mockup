import React, { useState, process } from 'react';
import { GoogleMap, LoadScript, MarkerF, PolylineF, InfoWindowF } from '@react-google-maps/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BusStop from './images/small-circle-2.png';
import stops from './stops.json'
import green from './greenroute.json';
import silver from './silverroute.json';

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
            >
              <Container>
                <Row>
                  <Col>{selectedStop.name}</Col>
                </Row>
                <Row>
                  <Col>Route</Col>
                  <Col>{selectedStop.route}</Col>
                </Row>
                <Row>
                  <Col>Next Bus</Col>
                  <Col>5 minutes</Col>
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
              gestureHandling: "greedy"
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
