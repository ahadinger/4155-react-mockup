import React, { useState, process, Fragment } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
  InfoWindowF,
  TrafficLayerF,
} from "@react-google-maps/api";

import BusStop from "./images/stop-marker.png";
import stopsJson from "./stops.json";
import greenPath from "./greenroute.json";
import silverPath from "./silverroute.json";
import shoppingPath from "./shoppingroute.json";
import { useQuery } from "react-query";
import {
  silverOptions,
  greenOptions,
  shoppingShuttleOptions,
  mapStyles,
  defaultCenter,
} from "./constants/map";

import { getBusLocations, getAllStops, getRoutePoints, getRoutes,fetchRoutes } from "./util/api";
import { useEffect } from "react";
import { useCallback } from "react";
import { getBusMarkerData } from "./util/bus";
import { SlidingMarker } from "./util/SlidingMarker";

import { showStopPopup } from "./util/stopsPopup";
import { setMap as setGlobalMap } from "./constants/map";

export const MapContainer = ({ stopState, mapFilters}) => {
  const [map, setMap] = React.useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedStop, setSelectedStop] = stopState;
  const [timeForStop, setTimeForStop] = useState(false);
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
  const { data: res } = useQuery("getRouteStops", () => fetchRoutes())

  const { data, isLoading } = useQuery("getStops", () => getAllStops(res), { enabled: !!res });
  const stops = !data ? [] : data;

  const { data: points_data } = useQuery("getRoutePoints", () => getRoutePoints(res), { enabled: !!res });
  const points = !points_data ? [] : points_data;

  const { data:routes_data, isLoading:areRoutesLoading } = useQuery("getRoutes", () => getRoutes(res));
  const all_routes = areRoutesLoading ? [] : routes_data;



  const getPointsFromId =(id)=>{
    for (let i = 0; i < points.length; i++){
      if(points[i].id == id){
        return cleanLngAndLat(points[i].points);
      }
    }
  }

  const getRouteFromId = (id)=>{
    for (let i = 0; i < all_routes.length; i++){
      if(all_routes[i].id == id){
        return all_routes[i];
      }
    }
  }

  const getOptionsForPath = (id)=>{
    let route = getRouteFromId(id);
    let color = "";
    if(route == undefined){
      color = "#a8a8a8"
    }
    else{
      color = route['color']
    }
    const options = {
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 5,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
    };
    return options;
  }

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

  const getRouteLines = (input) => {
    //console.log("GETTING LINES",input)
    if(input == "Select a Route"){return} 
    return input.map(el=>
          <PolylineF path={getPointsFromId(el)} options={getOptionsForPath(el)} />
      )

  }



  function cleanLngAndLat(points){
    for(let i = 0; i < points.length; i++){
      let temp_x = points[i]["lat"]
      let temp_y = points[i]["lng"]
      points[i]["lat"] = parseFloat(temp_x)
      points[i]["lng"] = parseFloat(temp_y)
    }
    return points
  }

  async function getTimeForStop(stop){
    const resp = await fetch(`http://198.71.63.67:4100/stops/timetostop/${stop["id"]}/`)
    const json = await resp.json()
    console.log(json)
    return json
  }

  const getStopsContent = (stops) =>
    stops.map( (item) => {
      if(item.routeName == "Charter"){
        return;
      }
      for (let i = 0; i < mapFilters.length; i++){
        if(item.routeList.includes(mapFilters[i])){
          return (
            <MarkerF
              icon={{
                url: BusStop,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              position={item.location}
              onClick={async () => {
                setSelectedStop(item);
                {setTimeForStop(await getTimeForStop(item))}
              }}
            >
              {selectedStop === item ? (
                <InfoWindowF
                  onCloseClick={() => {
                    setSelectedStop(null)
                    setTimeForStop(null)
                  }}
                  position={selectedStop.location}
                  options={{
                    shouldFocus: true,
                    minWidth: 350,
                    maxWidth: 350,
                  }}
                > 
                  { showStopPopup(selectedStop, timeForStop)}
                </InfoWindowF>
              ) : null}
            </MarkerF>
          );
        }
      }
      
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
          {getRouteLines(mapFilters)}
         
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
};

export default MapContainer;
