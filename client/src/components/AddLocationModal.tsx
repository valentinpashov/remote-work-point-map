import { useState } from 'react';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, imageUrl: string, city: string, street: string) => void; 
}

export default function AddLocationModal({ isOpen, onClose, onSubmit }: AddLocationModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setCity(''); 
    setStreet(''); 
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, imageUrl, city, street); 
    setTitle('');
    setDescription('');
    setImageUrl('');
    setCity('');
    setStreet('');
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 opacity-100 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 flex justify-between items-center relative shrink-0">
          <div>
            <h3 className="font-extrabold text-white text-xl tracking-tight">Location Details</h3>
            <p className="text-blue-100 text-xs mt-0.5 font-medium">You picked a great spot!</p>
          </div>
          <button onClick={handleClose} className="text-blue-100 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 bg-gray-50/50 overflow-y-auto">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">Name of the place</label>
            <input 
              type="text" 
              placeholder="e.g. Starbucks Center" 
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">🏙️ City</label>
            <input 
              type="text" 
              placeholder="e.g. Sofia" 
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">🏠 Street & Number</label>
            <input 
              type="text" 
              placeholder="e.g. 12 Vitosha Blvd" 
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">Image URL</label>
            <input 
              type="url" 
              placeholder="https://imgur.com/your-photo.jpg" 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">Useful info</label>
            <textarea 
              placeholder="Good Wi-Fi? Quiet? Outlets available?" 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none h-20"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 mt-2 pt-4 border-t border-gray-100 shrink-0">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 text-sm">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 text-sm">
              Save Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}