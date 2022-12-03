export interface RouteAPIResponse {
  stops: { [key: string]: ApiStop };
  routes: { [key: string]: Array<Array<number | string> | number | string> };
  routePoints: { [key: string]: Array<Array<RoutePoint | null>> };
  groupRoutes: boolean;
  routeShortNames: { [key: string]: string };
  routeSchedules: { [key: string]: string };
  routesRR: any[];
  excludedRoutesID: { [key: string]: number };
  stopsRR: any[];
  center: Center;
}

export interface Center {
  latitude: string;
  longitude: string;
  latitudeMin: string;
  longitudeMin: string;
  latitudeMax: string;
  longitudeMax: string;
  amount: string;
  d: number;
  amountYard: string;
  hub: string[];
  t: number;
}

export interface RoutePoint {
  lat: string;
  lng: string;
}

export interface ApiStop {
  routeId: string;
  stopId: string;
  position: string;
  name: string;
  latitude: number;
  longitude: number;
  id: string;
  userId: string;
  radius: number;
  routeName: string;
  routeShortname: string;
  routeGroupId: number;
}
