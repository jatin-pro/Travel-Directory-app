import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import AddMarkers from "./AddMarkers";


const App = () => {
  
  return (
    <MapContainer
   style={{ height: '100vh', width: '100wh' }}
      doubleClickZoom={false}
      id="mapId"
      zoom={6}
      center={{
        lat: 28.6139,
        lng: 77.2090
      }}>

      <TileLayer
     
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"/>
      
      <AddMarkers />
    </MapContainer>
  );
};

export default App;
