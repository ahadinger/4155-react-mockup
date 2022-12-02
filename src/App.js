import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect } from "react";
import Header from "./Header";
import Banner from "./Banner";
import MapContainer from "./MapContainer";
import CreateRouteButton from "./CreateRoute";
import { MapFilterForm } from "./util/MapFilter";
import { useState } from "react";
function App() {
  const stopState = useState(null)
  return (
    <Fragment>
      <Header stopState={stopState}/>
      <Banner />
      <CreateRouteButton/>
      <MapFilterForm/>
      <MapContainer stopState={stopState}/>
    </Fragment>
  );
}

export default App;