import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Location {
  id: number;
  title: string;
  description: string;
}

export default function Catalog() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Error loading locations:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Discover Your Perfect Workspace
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our curated selection of top locations for remote work. From quiet neighborhood cafes to ultra-modern coworking spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {locations.map(loc => (
            <div key={loc.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col">
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {loc.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {loc.description || "No description added for this workspace."}
                </p>
                
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 w-max px-4 py-2 rounded-lg"
                >
                  View on Map <span>→</span>
                </Link>
              </div>

            </div>
          ))}

          {locations.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100 shadow-inner">
              <h3 className="font-bold text-gray-800 text-lg mb-2">No locations yet.</h3>
              <p className="text-sm text-gray-500">Be the first to add a workspace on the map!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}