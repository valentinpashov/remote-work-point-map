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