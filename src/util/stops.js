import { useState } from "react";
import { getRoutes, getAllStops } from "./api";

export const GetStops = (id) =>{
    //const [stops, setStops] = useState({});
    

    //The return type of getAllStops has changed to return an array instead of an object -Kareem
    const allStops = getAllStops()
    .then((response) => {
        return response;
    });
    const routes = getRoutes()
    .then((response) => {
        return response;
    });
    //const name = routes[id][0];
    
    //using route_id
    //for x in route
        //for y in stops
            //if x.id == y.id
                //add to stop dict
                //make sure stop's name is equal to the route's name
    
    return routes
}