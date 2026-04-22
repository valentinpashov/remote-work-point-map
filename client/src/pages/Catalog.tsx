import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import LocationReviewsModal from '../components/LocationReviewsModal';

interface Location {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image_url?: string; 
  city?: string;
}

export default function Catalog() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [reviewLocation, setReviewLocation] = useState<{id: number, title: string} | null>(null);
  
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
      setDeletingId(null);
    }
  };

  const uniqueCities = ['All', ...new Set(locations.map(loc => loc.city).filter(Boolean) as string[])];

  const filteredLocations = locations.filter(loc => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      loc.title.toLowerCase().includes(searchLower) || 
      (loc.description && loc.description.toLowerCase().includes(searchLower));

    const matchesCity = selectedCity === 'All' || loc.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Discover Your Perfect Workspace
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our curated selection of top locations for remote work.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 max-w-3xl mx-auto">
          
          <div className="relative w-full flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search workspaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
          </div>

          {uniqueCities.length > 1 && (
            <div className="w-full md:w-auto relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="block w-full md:w-48 pl-4 pr-10 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer shadow-sm"
              >
                {uniqueCities.map(city => (
                  <option key={city} value={city}>
                    {city === 'All' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredLocations.map(loc => (
            <div key={loc.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col relative">
              
              {user && user.id === loc.user_id && (
                <button 
                  onClick={() => setDeletingId(loc.id)} 
                  className="absolute top-4 left-4 z-30 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full shadow-md backdrop-blur transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              )}

              <div className="h-64 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                <img 
                  src={loc.image_url || `https://picsum.photos/seed/${loc.id + 100}/800/600`} 
                  alt={loc.title} 
                  className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-700" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />

                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  {loc.city ? `🏙️ ${loc.city}` : 'Workspace'}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {loc.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                  {loc.description || "No description added."}
                </p>

                <div className="flex gap-3 mt-auto">
                  <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg"
                  >
                    Map <span>→</span>
                  </Link>
                  
                  <button 
                    onClick={() => setReviewLocation({ id: loc.id, title: loc.title })}
                    className="inline-flex items-center gap-1.5 text-slate-600 font-bold text-sm hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg"
                  >
                    <span className="text-yellow-500 text-base">★</span> Reviews
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredLocations.length === 0 && locations.length > 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-inner">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-gray-800 text-xl mb-2">No workspaces found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or selecting a different city.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCity('All'); }}
                className="mt-6 px-6 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

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

      <LocationReviewsModal
        isOpen={reviewLocation !== null}
        onClose={() => setReviewLocation(null)}
        locationId={reviewLocation?.id || null}
        locationTitle={reviewLocation?.title || ''}
        user={user}
      />
      
    </div>
  );
}