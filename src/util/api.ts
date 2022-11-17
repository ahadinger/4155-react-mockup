import { Stop } from "../types/Stop";
import routes from "../routes.json";

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

export const getRoutes = async () => {
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
  return (await res.json()).routes;
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
  return Array.from(Object.values((await res.json()).stops))
    .flat()
    .map((el: any) => {
      el["location"] = { lat: el.latitude, lng: el.longitude };
      el["routeList"] = getStopRouteId(el.id);
      el["routeNameList"] = getStopRouteName(el.id);
      return el;
    }) as Stop[];
};


function getStopRouteId(stopId:string):string[] {
  const r_arr:string[] = []
  for(const route of routes){
    for(let i = 0; i < route['stops'].length; i++){
      if (route['stops'][i] == stopId){
        const temp = []
        r_arr.push(route.id);
      }
    }
  }
  return r_arr;
}

function getStopRouteName(stopId:string):string[] {
  const r_arr:string[] = []
  for(const route of routes){
    for(let i = 0; i < route['stops'].length; i++){
      if (route['stops'][i] == stopId){
        const temp = []
        r_arr.push(route.name);
      }
    }
  }
  return r_arr;
}