import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

const truckIcon = new L.DivIcon({
  html: '<div style="font-size:24px;">🚛</div>',
  className: 'truck-map-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function MapComponent({ pickupCoords, dropCoords, currentCoords, height = '350px' }) {
  const defaultCenter = [18.5204, 73.8567]; // Pune, India
  const center = pickupCoords || currentCoords || defaultCenter;

  const positions = [
    pickupCoords && [pickupCoords.lat, pickupCoords.lng],
    dropCoords && [dropCoords.lat, dropCoords.lng],
  ].filter(Boolean);

  return (
    <MapContainer center={[center.lat || center[0], center.lng || center[1]]} zoom={12} style={{ height, width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pickupCoords && (
        <Marker position={[pickupCoords.lat, pickupCoords.lng]}>
          <Popup>📍 Pickup Location</Popup>
        </Marker>
      )}
      {dropCoords && (
        <Marker position={[dropCoords.lat, dropCoords.lng]}>
          <Popup>🏁 Drop Location</Popup>
        </Marker>
      )}
      {currentCoords && (
        <Marker position={[currentCoords.lat, currentCoords.lng]} icon={truckIcon}>
          <Popup>🚛 Truck Location</Popup>
        </Marker>
      )}
      {positions.length === 2 && (
        <Polyline positions={positions} color="#2563eb" dashArray="8, 8" />
      )}
    </MapContainer>
  );
}

export default MapComponent;
