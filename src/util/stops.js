import { useState } from "react";
import { getRoutes, getAllStops } from "./api";

export const GetStops = (id) =>{
    const [stops, setStops] = useState({});
    const allStops = getAllStops();
    const routes = getRoutes();
    //const name = routes[id][0];
    
    //using route_id
    //for stop in stops
        //if stop.id == id
            //add to stop dict
            //make sure stop's name is equal to the route's name
    
    return stops
}