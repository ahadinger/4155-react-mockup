import React, { useState, process, Fragment } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
  InfoWindowF,
} from "@react-google-maps/api";

import BusStop from "./images/small-circle-2.png";
import stopsJson from "./stops.json";
import greenPath from "./greenroute.json";
import silverPath from "./silverroute.json";
import shoppingPath from "./shoppingroute.json";
import { useQuery } from "react-query";
import { getAllStops } from "./util/api";
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
import { setMap as setGlobalMap } from "./constants/map";

export const MapContainer = ({ stopState }) => {
  const [map, setMap] = React.useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedStop, setSelectedStop] = stopState;
  const [locations, setLocations] = useState([]);
  const [markers, setMarkers] = useState({});

  const onLoad = useCallback((map) => {
    setLoaded(true);
    setMap(map);
    setGlobalMap(map);
  }, []);

  const CAMPUS_BOUNDS = {
    north: 35.315439301120726,
    south: 35.29118909848325,
    west: -80.75576478679214,
    east: -80.71247424385233,
  };

  const { data, isLoading } = useQuery("getStops", () => getAllStops());
  const stops = isLoading ? [] : data;

  const handleLocations = (json) => {
    setLocations(Object.values(json).flat());
  };

  const styles = {
    default: [],
    hide: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "on" }],
      },
    ],
  };

  useEffect(() => {
    setInterval(() => getBusLocations().then(handleLocations), 2000);
    getBusLocations().then(handleLocations);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    // eslint-disable-next-line no-undef

    const markerData = getBusMarkerData(locations);

    markerData.forEach((m) => {
      if (markers[m.id]) {
        markers[m.id].updateMarkerPosition(m);
      } else {
        // eslint-disable-next-line no-undef

        markers[m.id] = new SlidingMarker({ ...m, map });
      }
    });
  }, [locations, loaded, markers, map]);

  const getStopsContent = (stops) =>
    stops.map((item) => {
      if(item.routeName == "Charter"){
        return;
      }
      return (
        <MarkerF
          icon={BusStop}
          position={item.location}
          onClick={() => {
            setSelectedStop(item);
          }}
        >
          {selectedStop === item ? (
            <InfoWindowF
              onCloseClick={() => setSelectedStop(null)}
              position={selectedStop.location}
              options={{
                shouldFocus: true,
                minWidth: 350,
                maxWidth: 350,
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
              strictBounds: true,
            },
          }}
          onLoad={onLoad}
          onClick={() => setSelectedStop(null)}
          mapContainerStyle={mapStyles}
          zoom={16}
          center={defaultCenter}
        >
          {getStopsContent(stops)}

          <PolylineF path={greenPath} options={greenOptions} />
          <PolylineF path={silverPath} options={silverOptions} />
          <PolylineF path={shoppingPath} options={shoppingShuttleOptions} />
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
};

export default MapContainer;
