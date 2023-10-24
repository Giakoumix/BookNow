import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapSelection = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const handleMapClick = (event) => {
    const { latLng } = event;
    setSelectedCoordinates({ lat: latLng.lat(), lng: latLng.lng() });
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAceAE9UBlbxzP1b5Z9SxHrINN9fMV_jnA">
        <GoogleMap
          center={{ lat: 37.7749, lng: -122.4194 }} // Initial center
          zoom={10} // Initial zoom level
          onClick={handleMapClick}
        >
          {selectedCoordinates && (
            <Marker position={selectedCoordinates} label="Selected" />
          )}
        </GoogleMap>
      </LoadScript>
      {selectedCoordinates && (
        <div>
          <p>Selected Coordinates:</p>
          <p>Latitude: {selectedCoordinates.lat}</p>
          <p>Longitude: {selectedCoordinates.lng}</p>
        </div>
      )}
    </div>
  );
};

export default MapSelection;