
import { MarkerF } from "@react-google-maps/api";
import { getCorrectedBusStyle } from "../util/bus";
export const BusLocations = ({ locations }) => {
  //todo: fetch from api, then update state somehow???????

  return Object.values(locations)
    .map((bus) => {
      const busIcon = getCorrectedBusStyle(bus);
      return (
        <MarkerF
          options={{
            optimized: false,
            icon: {
              url: busIcon.url,
              size: { width: busIcon.width, height: busIcon.height },
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
