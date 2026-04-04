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
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-6 font-sans">

      <div className="flex flex-1 gap-6 min-h-0">

        <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col hidden md:flex">
          <h2 className="text-lg font-extrabold text-gray-800 border-b border-gray-100 pb-4 mb-4">
            Locations
          </h2>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">

          </div>
        </div>

        <div className="flex-1 rounded-xl shadow-sm border border-gray-200 overflow-hidden relative z-0">
          <MapContainer 
            center={center} 
            zoom={13} 
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={center}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold">Start point</h3>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

      </div>
    </div>
  );
}