import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

interface Location {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image_url?: string; 
}

export default function Catalog() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${apiUrl}/api/locations`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Error loading locations:", err));
  }, [apiUrl]);

  const executeDelete = async () => {
    if (!user || deletingId === null) return;

    try {
      const response = await fetch(`${apiUrl}/api/locations/${deletingId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id })
      });

      if (response.ok) {
        setLocations(locations.filter(loc => loc.id !== deletingId));
        setDeletingId(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Error deleting workspace.');
        setDeletingId(null);
      }
    } catch (err) {
      console.error(err);
      alert('No connection to server.');
      setDeletingId(null);
    }
  };

  const filteredLocations = locations.filter(loc => {
    const searchLower = searchTerm.toLowerCase();
    return (
      loc.title.toLowerCase().includes(searchLower) || 
      (loc.description && loc.description.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Discover Your Perfect Workspace
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our curated selection of top locations for remote work. From quiet neighborhood cafes to ultra-modern coworking spaces.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search workspaces by name or info..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredLocations.map(loc => (
            <div key={loc.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col relative">
              
              {user && user.id === loc.user_id && (
                <button 
                  onClick={() => setDeletingId(loc.id)} 
                  className="absolute top-4 left-4 z-30 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full shadow-md backdrop-blur transition-colors"
                  title="Delete Workspace"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              )}

              <div className="h-64 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400/80 bg-red-50/50">
                  <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm font-bold tracking-wide uppercase">Broken Link</span>
                </div>

                <img 
                  src={loc.image_url || `https://picsum.photos/seed/${loc.id + 100}/800/600`} 
                  alt={loc.title} 
                  className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-700" 
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                  }}
                />

                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  Workspace
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {loc.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {loc.description || "No description added for this workspace."}
                </p>

                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 w-max px-4 py-2 rounded-lg mt-auto"
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

      <ConfirmDeleteModal 
        isOpen={deletingId !== null} 
        onClose={() => setDeletingId(null)} 
        onConfirm={executeDelete} 
      />
      
    </div>
  );
}