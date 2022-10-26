import React, { useState, process, Fragment } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
  InfoWindowF,
} from "@react-google-maps/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BusStop from "./images/small-circle-2.png";
import stops from "./stops.json";
import greenPath from "./greenroute.json";
import silverPath from "./silverroute.json";
import {
  silverOptions,
  greenOptions,
  mapStyles,
  defaultCenter,
} from "./constants/map";
import { getBusLocations } from "./util/api";
import { useEffect } from "react";
import { useCallback } from "react";
import { getBusMarkerData } from "./util/bus";
import { SlidingMarker } from "./util/SlidingMarker";




export const MapContainer = () => {
  const [map, setMap] = React.useState(null)
  const [loaded,setLoaded] =  useState(false)
  const onLoad = useCallback((map) => {
    setLoaded(true);
    setMap(map);
    console.log(loaded)
  },[loaded]);
  const [markers, setMarkers] = useState({});

  const CAMPUS_BOUNDS = {
    north: 35.315439301120726,
    south: 35.29918909848325,
    west: -80.75176478679214,
    east: -80.71247424385233,
  };

  const [selectedStop, setSelectedStop] = useState(null);
  const [locations, setLocations] = useState([]);


  const handleLocations = (json) => {
    setLocations(Object.values(json).flat());
  };
  useEffect(() => {
    setInterval(() => getBusLocations().then(handleLocations), 2000);
    getBusLocations().then(handleLocations);
  }, []);


  useEffect(() => {
    if(!loaded) return;
      // eslint-disable-next-line no-undef

    const markerData = getBusMarkerData(locations)

    markerData.forEach(m=>{
      if(markers[m.id]){
        markers[m.id].updateMarkerPosition(m)
        console.log('exists')
      }else{
        // eslint-disable-next-line no-undef

        markers[m.id] = new SlidingMarker({...m,map});
      }
    })
  }, [locations,loaded,markers,map]);


  const getStopsContent = (stops) =>
    stops.map((item) => {
      return (
        <MarkerF
          icon={BusStop}
          position={item.position}
          onClick={() => {
            setSelectedStop(item);
          }}
        >
          {selectedStop === item ? (
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
    });

  return (
    <Fragment>
      <canvas
        id="rotCanvas"
        width={60}
        height={60}
        style={{ display: "none" }}
      ></canvas>
      <canvas
        id="busCanvas"
        width={60}
        height={60}
        style={{ display: "none" }}
      ></canvas>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
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
          onLoad={onLoad}

          onClick={() => setSelectedStop(null)}
          mapContainerStyle={mapStyles}
          zoom={16}
          center={defaultCenter}
        >
          {getStopsContent(stops)}

          <PolylineF onLoad={onLoad} path={greenPath} options={greenOptions} />
          <PolylineF
            path={silverPath}
            options={silverOptions}
          />

        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
};

export default MapContainer;
