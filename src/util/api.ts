import { Stop } from "../types/Stop";
import { Route } from "../types/Route";
import { RoutePoints } from "../types/RoutePoints";
import { ApiStop, RouteAPIResponse } from "../types/api";

const routeblacklist = ["3406", "26294"];
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
export const fetchRoutes = async (): Promise<RouteAPIResponse> => {
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
  const json = await res.json();
  return json;
};
export const mapToStop = (apiStop: ApiStop) => {
  const s: Partial<Stop> = apiStop;
  s["location"] = { lat: apiStop.latitude, lng: apiStop.longitude };
  // s['routeList'] = await getStopRouteId()
};
export const getRoutes = async (
  apiBody: RouteAPIResponse
): Promise<Route[]> => {
  if(!apiBody) return [];
  const raw_routes = apiBody.routes;

  let routes: Route[] = [];
  const filtered_routes = Object.keys(raw_routes).filter(
    (el) => !routeblacklist.includes(el)
  );
  // return []
  return filtered_routes.map((routeId) => {
    const routeStops: string[] = filtered_routes
      .slice(3)
      .map((el) => el[1])
      // .map((el) => mapToStop(apiBody.stops[`ID${el}`]));

    let routeObj: Route = {
      id: routeId,
      name: raw_routes[routeId][0] as string,
      color: raw_routes[routeId][1] as string,
      stops: routeStops,
    };
    return routeObj;
    // return null
  });
  // return routes as Route[];
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
  const routes = await res.json();

  return [] as Stop[];
};

async function getStopRouteId(
  routes: Route[],
  stopId: string
): Promise<string[]> {
  const r_arr: string[] = [];

  for (const route of routes) {
    for (let i = 0; i < route.stops.length; i++) {
      if (route.stops[i] == stopId) {
        const temp = [];
        r_arr.push(route.id);
      }
    }
  }
  return r_arr;
}

async function getStopRouteName(
  routes: Route[],
  stopId: string
): Promise<string[]> {
  const r_arr: string[] = [];

  for (const route of routes) {
    for (let i = 0; i < route.stops.length; i++) {
      if (route.stops[i] == stopId) {
        const temp = [];
        r_arr.push(route.name);
      }
    }
  }

  return r_arr;
}

export const getRoutePoints = async (apiBody:RouteAPIResponse): Promise<RoutePoints[]> => {


  const raw_data = apiBody.routePoints;
  let rp: RoutePoints[] = [];

  for (const route in raw_data) {
    //let name = raw_routes[route][0];
    if (routeblacklist.includes(route)) {
      continue;
    }
    let routeObj: RoutePoints = {
      id: route,
      points: raw_data[route][0] as any,
    };
    rp.push(routeObj);
  }
  return rp;
};
