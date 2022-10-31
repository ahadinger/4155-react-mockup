import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MapContainer from './MapContainer';
import Header from './Header';
import Banner from "./Banner";
import App from './App';

import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

    <App/>
    </QueryClientProvider>

  </React.StrictMode>
);


