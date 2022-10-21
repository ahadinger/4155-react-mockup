import BusIcon from '../images/ic_bus_2019_white.png'
import BusStop from '../images/small-circle.png'

import { MarkerF } from '@react-google-maps/api';
export const BusLocations = ({locations}) => {
  //todo: fetch from api, then update state somehow???????
    return Object.values(locations).map(bus=>{
        return (
          <MarkerF
            icon={{url:BusIcon,scaledSize:{height:50,width:50}}}
            position={{lat:parseFloat(bus.latitude),lng:parseFloat(bus.longitude)}}
            
          >
           
          </MarkerF>
        );
      });

    
};
