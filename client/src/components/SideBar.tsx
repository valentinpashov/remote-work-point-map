interface Location {
  id: number;
  title: string;
  description: string;
  latitude: string | number;
  longitude: string | number;
}

interface SidebarProps {
  locations: Location[];
  onLocationClick: (coords: [number, number]) => void;
}

export default function Sidebar({ locations, onLocationClick }: SidebarProps) {
  return (
    <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col hidden md:flex">
      <h2 className="text-lg font-extrabold text-gray-800 border-b border-gray-100 pb-4 mb-4">
        List of Locations
      </h2>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {locations.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No locations found.</p>
        ) : (
          locations.map((loc) => (
            <div 
              key={loc.id} 
              onClick={() => onLocationClick([Number(loc.latitude), Number(loc.longitude)])}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md cursor-pointer transition-all"
            >
              <h3 className="font-bold text-gray-800 text-sm">{loc.title}</h3>
              {loc.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{loc.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}