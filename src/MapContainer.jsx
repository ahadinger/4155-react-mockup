import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function MapContainer() {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 35.308053, lng: -80.733733
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyBLQfsdho-FW3f2lJuUIXFzfwWgsDDBCaw'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default MapContainer;
