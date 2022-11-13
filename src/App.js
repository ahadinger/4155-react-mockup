import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect } from "react";
import Header from "./Header";
import Banner from "./Banner";
import MapContainer from "./MapContainer";
import { useState } from "react";
function App() {
  const stopState = useState(null)
  return (
    <Fragment>
      <Header stopState={stopState}/>
      <Banner />
      <MapContainer stopState={stopState}/>
    </Fragment>
  );
}

export default App;
