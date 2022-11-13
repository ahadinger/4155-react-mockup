import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MapContainer from './MapContainer';
import Header from './Header';
import Banner from "./Banner";
import CreateRouteButton from "./CreateRoute";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Header/>
      <Banner/>
      <CreateRouteButton/>
      <MapContainer/>
  </React.StrictMode>
);


