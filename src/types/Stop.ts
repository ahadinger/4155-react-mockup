export interface Stop {
  deviceId: number;
  created: string;
  createdTime: string;
  paxLoad: number;
  bus: string;
  busId: number;
  userId: string;
  routeBlockId: string;

  calculatedCourse: string;
  outOfService: number;
  more: null;
  createdDebug: Date;
  totalCap: number;
  color: string;
  busName: string;
  busType: string;
  routeId: string;
  route: string;
  outdated: number;
  position: { lat: number; lng: number };
}
