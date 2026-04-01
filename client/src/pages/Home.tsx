import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Home() {
  const center: [number, number] = [42.6977, 23.3219];

  return (
    <div className="h-full w-full">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={center}>
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold">Начална точка</h3>
              <p className="text-sm text-gray-600">Добре дошли!</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}