import React, { useState, process } from 'react';
import { GoogleMap, LoadScript, MarkerF, PolylineF, InfoWindowF } from '@react-google-maps/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BusStop from './images/small-circle-2.png';
import stops from './stops.json'
import greenPath from './greenroute.json';
import silverPath from './silverroute.json';
import { silverOptions,greenOptions,mapStyles,defaultCenter } from './constants/map';
export const MapContainer = () => {
  const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };
  
  const [selectedStop, setSelectedStop] = useState(null);

  const getStopsContent = stops => stops.map(item=>{
      
      return <MarkerF
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
  });


  return (
    
      <LoadScript
        googleMapsApiKey = {process.env.REACT_APP_MAP_API_KEY}
      >
        
        <GoogleMap
          options={{
              mapTypeControl: false,
              StreetViewPanorama: false,
              streetViewControl: false,
              disableDefaultUI: true
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
