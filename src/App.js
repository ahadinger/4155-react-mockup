import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect } from "react";
import Header from "./Header";
import Banner from "./Banner";
import MapContainer from "./MapContainer";

function App() {
  return (
    <Fragment>
      <Header />
      <Banner />
      <MapContainer />
    </Fragment>
  );
}

export default App;
