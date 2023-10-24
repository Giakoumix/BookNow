import React, { useEffect, useState } from 'react';
import {useMemo} from 'react'
import {useParams} from 'react-router-dom'
import { GoogleMap, useLoadScript, Marker, MarkerF } from '@react-google-maps/api';

import './GoogleMaps.css'

const GoogleMaps = ({area_details}) => {
  
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: 'AIzaSyAceAE9UBlbxzP1b5Z9SxHrINN9fMV_jnA'
  })

  const center = useMemo(() => ({
    lat: typeof area_details.latitude === undefined ? 0 : area_details.latitude, // Latitude of the map center
    lng: typeof area_details.longtitude === undefined ? 0 : area_details.longtitude, // Longitude of the map center
  }), []);

  const handleClickMarker = () => {
    // Generate the Google Maps URL with the latitude and longitude
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;

    // Open the Google Maps URL in a new window
    window.open(googleMapsURL, '_blank');
  };

  return (
    <div className="App">
    {!isLoaded ? (
      <h1>Loading...</h1>
    ) : (
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={10}
      > 
        <MarkerF position={center} onClick={handleClickMarker}></MarkerF> 
      </GoogleMap>
    )}
  </div>
  )
}

export default GoogleMaps;