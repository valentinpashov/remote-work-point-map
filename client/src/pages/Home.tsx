import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Премахнах useMapEvents от тук
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

interface Location {
  id: number;
  title: string;
  description: string;
  latitude: string | number;
  longitude: string | number;
}

export default function Home() {
  const center: [number, number] = [42.6977, 23.3219]; 
  const [locations, setLocations] = useState<Location[]>([]);
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    fetch('http://localhost:5000/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Грешка при зареждане:", err));
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-6 font-sans">
      <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between z-10">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm">
            {user ? `${user.username}` : '👀 Режим Гост'}
          </div>
        </div>
        <div className="text-sm text-gray-500 font-semibold">
          Places: <span className="text-blue-600">{locations.length}</span>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col hidden md:flex">
          <h2 className="text-lg font-extrabold text-gray-800 border-b border-gray-100 pb-4 mb-4">
            List of Places
          </h2>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {locations.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No places added yet.</p>
            ) : (
              locations.map((loc) => (
                <div key={loc.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all">
                  <h3 className="font-bold text-gray-800 text-sm">{loc.title}</h3>
                  {loc.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{loc.description}</p>}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 rounded-xl shadow-sm border border-gray-200 overflow-hidden relative z-0">
          <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {locations.map((loc) => (
              <Marker key={loc.id} position={[Number(loc.latitude), Number(loc.longitude)]}>
                <Popup>
                  <div className="font-sans min-w-[200px]">
                    <h3 className="font-bold text-lg text-gray-800">{loc.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{loc.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>
      </div>
    </div>
  );
}