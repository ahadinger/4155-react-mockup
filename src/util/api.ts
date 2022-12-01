import { Stop } from "../types/Stop";
import { Route } from "../types/Route";
import {RoutePoints} from "../types/RoutePoints";

export const getBusLocations = async () => {
  const res = await fetch(
    "https://passio3.com/www/mapGetData.php?getBuses=1&deviceId=3367966&wTransloc=1",
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "json=%7B%22s0%22%3A%221053%22%2C%22sA%22%3A1%2C%22rA%22%3A8%2C%22r0%22%3A%223201%22%2C%22r1%22%3A%2222940%22%2C%22r2%22%3A%2226308%22%2C%22r3%22%3A%223406%22%2C%22r4%22%3A%223474%22%2C%22r5%22%3A%2216380%22%2C%22r6%22%3A%2226294%22%2C%22r7%22%3A%2235130%22%7D",
      method: "POST",
      mode: "cors",
    }
  );
  return (await res.json()).buses;
};

export const getRoutes = async (): Promise<Route[]> => {
  const res = await fetch(
    "https://passio3.com/www/mapGetData.php?getStops=2&deviceId=1720493&withOutdated=1&wBounds=1&showBusInOos=0&lat=35.3083779&lng=-80.7325179&wTransloc=1",
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "json=%7B%22s0%22%3A%221053%22%2C%22sA%22%3A1%2C%22rA%22%3A8%2C%22r0%22%3A%223201%22%2C%22r1%22%3A%2222940%22%2C%22r2%22%3A%2226308%22%2C%22r3%22%3A%223406%22%2C%22r4%22%3A%223474%22%2C%22r5%22%3A%2216380%22%2C%22r6%22%3A%2226294%22%2C%22r7%22%3A%2235130%22%7D",
      method: "POST",
      mode: "cors",
    }
  );

  const raw_routes = (await res.json()).routes;
  let routes:Route[] = [];

  for(const route in raw_routes){
    let list_of_stops_in_route = []
    for(let i = 3; i < raw_routes[route].length; i++){
      list_of_stops_in_route.push(raw_routes[route][i][1])
    }
    //let name = raw_routes[route][0];
    let routeObj: Route = {
      id: route,
      name: raw_routes[route][0],
      stops: list_of_stops_in_route,

    }
    routes.push(routeObj);
  };
  return routes as Route[];
};

export const getAllStops = async (): Promise<Stop[]> => {
  const res = await fetch(
    "https://passio3.com/www/mapGetData.php?getStops=2&deviceId=1720493&withOutdated=1&wBounds=1&showBusInOos=0&lat=35.3083779&lng=-80.7325179&wTransloc=1",
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "json=%7B%22s0%22%3A%221053%22%2C%22sA%22%3A1%2C%22rA%22%3A8%2C%22r0%22%3A%223201%22%2C%22r1%22%3A%2222940%22%2C%22r2%22%3A%2226308%22%2C%22r3%22%3A%223406%22%2C%22r4%22%3A%223474%22%2C%22r5%22%3A%2216380%22%2C%22r6%22%3A%2226294%22%2C%22r7%22%3A%2235130%22%7D",
      method: "POST",
      mode: "cors",
    }
  );
  
  return await Promise.all(Array.from(Object.values((await res.json()).stops))
    .flat()
    .map (async (el: any) => {
      el["location"] = { lat: el.latitude, lng: el.longitude };
      el["routeList"] = await getStopRouteId(el.id)
      el["routeNameList"] = await getStopRouteName(el.id)
      
      return el;
    })) as Stop[];
};


async function getStopRouteId(stopId: string): Promise<string[]> {
  const r_arr: string[] = []

  const result = await getRoutes()
  for (const route of result) {
    for (let i = 0; i < route.stops.length; i++) {

      if (route.stops[i] == stopId) {
        const temp = []
        r_arr.push(route.id);
      }
    }
  }
  return r_arr;
}


async function getStopRouteName(stopId:string): Promise<string[]> {
  const result = await getRoutes()
  const r_arr:string[] = []

      for(const route of result){
        for(let i = 0; i < route.stops.length; i++){
          if (route.stops[i] == stopId){
            const temp = []
            r_arr.push(route.name);
          }
        }
      }

  return r_arr;
}

export const getRoutePoints = async (): Promise<RoutePoints[]> => {
  const res = await fetch(
    "https://passio3.com/www/mapGetData.php?getStops=2&deviceId=1720493&withOutdated=1&wBounds=1&showBusInOos=0&lat=35.3083779&lng=-80.7325179&wTransloc=1",
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "json=%7B%22s0%22%3A%221053%22%2C%22sA%22%3A1%2C%22rA%22%3A8%2C%22r0%22%3A%223201%22%2C%22r1%22%3A%2222940%22%2C%22r2%22%3A%2226308%22%2C%22r3%22%3A%223406%22%2C%22r4%22%3A%223474%22%2C%22r5%22%3A%2216380%22%2C%22r6%22%3A%2226294%22%2C%22r7%22%3A%2235130%22%7D",
      method: "POST",
      mode: "cors",
    }
  );
  

  const raw_data = (await res.json()).routePoints;
  let rp:RoutePoints[] = [];
  
  for(const route in raw_data){
    //let temp_arr:any = raw_data[route][0];
    /* for(let i = 0; i < raw_data[route][0].length; i++){
      let idkwahttonamethis:any = {lat: 0, lng: 0}
      idkwahttonamethis["lat"] = parseFloat(raw_data[route][0][i]["lat"])
      idkwahttonamethis["lng"] = parseFloat(raw_data[route][0][i]["lng"])
      //console.log(idkwahttonamethis)
      temp_arr.push(idkwahttonamethis)
    } */
    //let name = raw_routes[route][0];
    let routeObj: RoutePoints = {
      id: route,
      points: raw_data[route][0],

    }
    
    rp.push(routeObj);
  };
  return rp;
};
