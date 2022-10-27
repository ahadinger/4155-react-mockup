import React, { useState, process, Fragment } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
  InfoWindowF,
} from "@react-google-maps/api";

import BusStop from "./images/small-circle-2.png";
import stops from "./stops.json";
import greenPath from "./greenroute.json";
import silverPath from "./silverroute.json";
import shoppingPath from "./shoppingroute.json";
import {
  silverOptions,
  greenOptions,
  shoppingShuttleOptions,
  mapStyles,
  defaultCenter,
} from "./constants/map";

import { getBusLocations } from "./util/api";
import { useEffect } from "react";
import { useCallback } from "react";
import { getBusMarkerData } from "./util/bus";
import { SlidingMarker } from "./util/SlidingMarker";

import { showStopPopup } from "./util/stopsPopup";

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

    const styles: Record<string, google.maps.MapTypeStyle[]> = {
        default: [],
        hide: [
            {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            },
        ],
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
              options={{
                shouldFocus: true,
                minWidth: 350,
                maxWidth: 350
              }}
            >
              {showStopPopup(selectedStop)}
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
              styles: styles["hide"],
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

          <PolylineF path={greenPath} options={greenOptions} />
          <PolylineF
            path={silverPath}
            options={silverOptions}
          />
          <PolylineF
            path={shoppingPath}
            options={shoppingShuttleOptions}
          />

        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
};

export default MapContainer;
