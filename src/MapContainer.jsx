import React from 'react';
import { GoogleMap, LoadScript, MarkerF, PolylineF } from '@react-google-maps/api';
import BusStop from './images/small-circle-2.png';
import PopUp from './Popup';
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
  
  function getPopUpForStop (item) {
    const name = item.name;
    const route = item.route;
    //const data = getDataForStop(name)
    return (
      <PopUp title={{name}} 
        body = {
          <Container>
            <Row>
              <Col>Route</Col>
              <Col>{route}</Col>
            </Row>
            <Row>
              <Col>Next Bus</Col>
              <Col>5 minutes</Col>
            </Row>
          </Container>
        }
      />
    );
  }

  function togglePopUp (item) {
    const position = item.position;

  }

  const getStopsContent = stops => {
    let content = [];

    for (let i = 0; i < stops.length; i++) {
      const item = stops[i];
      const name = item.name;
      
      
      content.push(
      <MarkerF
        icon={BusStop}
        position={item.position}
        onClick={togglePopUp(item)}
      />
      );
    }
    return content;
  };
  

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

  return (
    
      <LoadScript
        googleMapsApiKey='AIzaSyBLQfsdho-FW3f2lJuUIXFzfwWgsDDBCaw'>
        
        <GoogleMap
          options={{
              mapTypeControl: false,
              StreetViewPanorama: false,
              streetViewControl: false,
              disableDefaultUI: true
            }}
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
