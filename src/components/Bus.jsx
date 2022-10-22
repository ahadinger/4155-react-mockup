import { MarkerF } from "@react-google-maps/api";
import { getCorrectedBusStyle } from "../util/bus";
export const BusLocations = ({ locations }) => {
  //todo: fetch from api, then update state somehow???????

  return Object.values(locations).map((bus) => {
    const busIcon = getCorrectedBusStyle(bus);
    return (
      <MarkerF

        options={{
          zIndex:200,
          shape:{
            type: "rect",
            coords: [0, 0, 60, 60],
          },
          optimized: false,
          icon: {
            url: busIcon.url,
            size: { width: 60, height: 60 },
            scaledSize: { width: 60, height: 60 },
            anchor: { x: busIcon.width, y: busIcon.height }

          },
          anchorPoint: {
            lat: parseFloat(bus.latitude),
            lng: parseFloat(bus.longitude),
          },
          position: {
            lat: parseFloat(bus.latitude),
            lng: parseFloat(bus.longitude),
          },
        }}
      ></MarkerF>
    );
  });
};
