import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import SilverMarker from './images/marker-silver.png';
import GreenMarker from './images/marker-green.png';
import stops from './stops.json'

export const MapContainer = () => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: 35.308053, lng: -80.733733
  }
  
  const getStopsContent = stops => {
    let content = [];

    for (let i = 0; i < stops.length; i++) {
      const item = stops[i];
      content.push(
      <MarkerF
        icon={GreenMarker}
        position={item.position}
      />
      );

    }
    return content;
  };
    
    

  return (
    
     <LoadScript
       googleMapsApiKey='AIzaSyBLQfsdho-FW3f2lJuUIXFzfwWgsDDBCaw'>
        
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={16}
          center={defaultCenter}
          >
          {getStopsContent(stops)}
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;
