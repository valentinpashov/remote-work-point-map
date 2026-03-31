import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix за иконите на Leaflet (понякога не се зареждат правилно в React)
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// ТУК Е ПОПРАВКАТА: Използваме const вместо let
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  // Координати за центъра на картата (София)
  const center: [number, number] = [42.6977, 23.3219];

  return (
    <div className="flex flex-col h-screen w-full font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md z-[1000]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            Remote<span className="text-blue-600">Point</span>
          </span>
        </div>
        
        <div className="flex gap-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Login
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-shadow shadow-sm">
            Register
          </button>
        </div>
      </nav>

      {/* MAP CONTAINER */}
      <div className="flex-1 relative">
        <MapContainer 
          center={center} 
          zoom={13} 
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <Marker position={center}>
            <Popup>
              {/* ТУК СЪЩО ОПРАВИХ class на className */}
              <div className="font-sans">
                <h3 className="font-bold">Начална точка</h3>
                <p className="text-sm text-gray-600">Добре дошли в RemotePoint!</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;