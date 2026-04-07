import { useEffect } from 'react';
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
  newLocationCoords: [number, number] | null;
  setNewLocationCoords: (coords: [number, number] | null) => void;
  onOpenModal: () => void;
}

function MapFlyController({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 16, { duration: 1.5 });
  }, [coords, map]);
  return null;
}

export default function MapView({ 
  locations, activeCoords, setActiveCoords, user, newLocationCoords, setNewLocationCoords, onOpenModal
}: MapViewProps) {
  const center: [number, number] = [42.6977, 23.3219];

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (user) {
          setNewLocationCoords([e.latlng.lat, e.latlng.lng]);
          setActiveCoords(null);
        } else {
          alert('You must be logged in to add locations!');
        }
      }
    });
    return null;
  }

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
          <Marker 
            position={newLocationCoords}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                setNewLocationCoords([position.lat, position.lng]);
              }
            }}
          >
            <Popup eventHandlers={{ remove: () => setNewLocationCoords(null) }}>
              <div className="text-center font-sans p-2 min-w-[180px]">
                <div className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
                  Selection Mode
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-snug">Drag this pin to the exact location, then click below.</p>
                <button 
                  onClick={onOpenModal}
                  className="w-full px-4 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-transform active:scale-95 text-sm shadow-md flex items-center justify-center gap-2"
                >
                Confirm Spot
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}