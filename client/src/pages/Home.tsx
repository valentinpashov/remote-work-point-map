import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Sidebar from '../components/SideBar'; 
import MapView from '../components/MapView';
import AddLocationModal from '../components/AddLocationModal';
import InstructionToast from '../components/InstructionToast';

interface Location {
  id: number;
  user_id: number;
  title: string;
  description: string;
  latitude: string | number;
  longitude: string | number;
  image_url?: string;
  city?: string;
  street?: string;
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeCoords, setActiveCoords] = useState<[number, number] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');  
  const [newLocationCoords, setNewLocationCoords] = useState<[number, number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${apiUrl}/api/locations`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Error loading:", err));
  }, [apiUrl]);

  const handleModalSubmit = async (title: string, description: string, imageUrl: string, city: string, street: string) => {
    if (!newLocationCoords || !user) return;

    try {
      const response = await fetch(`${apiUrl}/api/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: user.id, 
          title, 
          description, 
          latitude: newLocationCoords[0], 
          longitude: newLocationCoords[1],
          image_url: imageUrl,
          city: city,     
          street: street  
        })
      });

      if (response.ok) {
        const savedLocation = await response.json();
        setLocations([...locations, savedLocation]);
        setIsModalOpen(false);
        setNewLocationCoords(null);
      } else {
        alert('Error saving location.');
      }
    } catch (err) {
      console.error(err);
      alert('No connection to server.');
    }
  };

  const handleDeleteLocation = async (locationId: number) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this workspace?")) return;

    try {
      const response = await fetch(`${apiUrl}/api/locations/${locationId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id })
      });

      if (response.ok) {
        setLocations(locations.filter(loc => loc.id !== locationId));
        setActiveCoords(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Error deleting workspace.');
      }
    } catch (err) {
      console.error(err);
      alert('No connection to server.');
    }
  };

  const filteredLocations = locations.filter((loc) => {
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = loc.title.toLowerCase().includes(searchLower);
    const descMatch = loc.description ? loc.description.toLowerCase().includes(searchLower) : false;
    return titleMatch || descMatch;
  });

  const handleTopBarAddClick = () => {
    const centerOfSofia: [number, number] = [42.6977, 23.3219];
    if (!newLocationCoords) setNewLocationCoords(centerOfSofia); 
    setActiveCoords(centerOfSofia); 
    setShowInstruction(true);
  };

  return (
    <div className="flex flex-col bg-gray-100 p-6 gap-6 font-sans">
      <TopBar 
        user={user} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filteredCount={filteredLocations.length} 
        totalCount={locations.length} 
        onAddClick={handleTopBarAddClick}
      />

      <div className="flex flex-1 gap-6 min-h-[75vh]">
        <Sidebar locations={filteredLocations} onLocationClick={setActiveCoords} />
        
        <MapView 
          locations={filteredLocations} 
          activeCoords={activeCoords}
          setActiveCoords={setActiveCoords}
          user={user}
          newLocationCoords={newLocationCoords}
          setNewLocationCoords={setNewLocationCoords}
          onOpenModal={() => setIsModalOpen(true)}
          onDeleteLocation={handleDeleteLocation} 
        />
      </div>

      <AddLocationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleModalSubmit} 
      />

      <InstructionToast 
        isVisible={showInstruction} 
        onClose={() => setShowInstruction(false)} 
      />
    </div>
  );
}