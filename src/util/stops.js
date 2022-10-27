import { useState } from "react";
import { getRoutes, getAllStops } from "./api";

export const GetStops = (id) =>{
    //const [stops, setStops] = useState({});
    const allStops = getAllStops()
    .then((response) => {
        return response;
    });
    const routes = getRoutes()
    .then((response) => {
        return response;
    });
    console.log(allStops);
    //const name = routes[id][0];
    
    //using route_id
    //for x in route
        //for y in stops
            //if x.id == y.id
                //add to stop dict
                //make sure stop's name is equal to the route's name
    
    return routes
}