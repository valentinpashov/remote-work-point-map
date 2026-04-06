import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Sidebar from '../components/SideBar'; 
import MapView from '../components/MapView';

interface Location {
  id: number;
  title: string;
  description: string;
  latitude: string | number;
  longitude: string | number;
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeCoords, setActiveCoords] = useState<[number, number] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    fetch('http://localhost:5000/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Error loading locations:", err));
  }, []);

  const handleAddLocation = async (title: string, description: string, lat: number, lng: number) => {
    try {
      const response = await fetch('http://localhost:5000/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, title, description, latitude: lat, longitude: lng })
      });

      if (response.ok) {
        const savedLocation = await response.json();
        setLocations([...locations, savedLocation]);
        return true;
      } else {
        alert('Error saving location.');
        return false;
      }
    } catch (err) {
      console.error(err);
      alert('No connection to the server.');
      return false;
    }
  };

  const filteredLocations = locations.filter((loc) => {
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = loc.title.toLowerCase().includes(searchLower);
    const descMatch = loc.description ? loc.description.toLowerCase().includes(searchLower) : false;
    return titleMatch || descMatch;
  });

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6 gap-6 font-sans">
      
      <TopBar 
        user={user} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filteredCount={filteredLocations.length} 
        totalCount={locations.length} 
      />

      <div className="flex flex-1 gap-6 min-h-0">
        
        <Sidebar 
          locations={filteredLocations} 
          onLocationClick={setActiveCoords} 
        />
        
        <MapView 
          locations={filteredLocations} 
          activeCoords={activeCoords}
          setActiveCoords={setActiveCoords}
          user={user}
          onAddLocation={handleAddLocation}
        />

      </div>
    </div>
  );
}