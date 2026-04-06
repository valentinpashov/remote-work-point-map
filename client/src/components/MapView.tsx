import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
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

interface User {
  id: number;
  username: string;
  email: string;
}

interface MapViewProps {
  locations: Location[];
  activeCoords: [number, number] | null;
  setActiveCoords: (coords: [number, number] | null) => void;
  user: User | null; 
  onAddLocation: (title: string, description: string, lat: number, lng: number) => Promise<boolean>;
}

function MapFlyController({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 16, { duration: 1.5 });
  }, [coords, map]);
  return null;
}

export default function MapView({ locations, activeCoords, setActiveCoords, user, onAddLocation }: MapViewProps) {
  const center: [number, number] = [42.6977, 23.3219];
  const [newLocationCoords, setNewLocationCoords] = useState<{lat: number, lng: number} | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (user) {
          setNewLocationCoords(e.latlng);
          setActiveCoords(null);
        } else {
          alert('You need to be logged in to add new locations!');
        }
      }
    });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocationCoords) return;

    const success = await onAddLocation(title, description, newLocationCoords.lat, newLocationCoords.lng);
    
    if (success) {
      setNewLocationCoords(null);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="flex-1 rounded-xl shadow-sm border border-gray-200 overflow-hidden relative z-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <MapFlyController coords={activeCoords} />
        <MapClickHandler />

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

        {newLocationCoords && (
          <Marker position={newLocationCoords}>
            <Popup eventHandlers={{ remove: () => setNewLocationCoords(null) }}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 min-w-[200px] p-1 font-sans">
                <h3 className="font-bold text-gray-800 border-b pb-2">New Work Location</h3>
                <input type="text" placeholder="Location name" required className="w-full px-3 py-2 border rounded text-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Brief description..." className="w-full px-3 py-2 border rounded text-sm resize-none h-20" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded text-sm">Save Location</button>
              </form>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}