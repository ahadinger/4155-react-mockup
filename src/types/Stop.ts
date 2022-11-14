  export interface Stop {
    routeId:        string;
    stopId:         string;
    name:           string;
    id:             string;
    userId:         string;
    radius:         number;
    routeName:      string;
    routeShortname: string;
    routeGroupId:   number;
    location: { lat: number; lng: number };
    position:string;
    route_list: [];
    route_name_list: [];
  }

