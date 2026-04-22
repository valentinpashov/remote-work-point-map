import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
}

interface Review {
  id: number;
  user_id: number;
  username: string;
  rating: number;
}

interface LocationReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: number | null;
  locationTitle: string;
  user: User | null;
}

export default function LocationReviewsModal({ isOpen, onClose, locationId, locationTitle, user }: LocationReviewsModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (isOpen && locationId) {
      fetch(`${apiUrl}/api/locations/${locationId}/reviews`)
        .then(res => res.ok ? res.json() : [])
        .then(data => setReviews(data))
        .catch(err => console.error("Error loading ratings:", err));
    }
  }, [isOpen, locationId, apiUrl]);

  if (!isOpen || !locationId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0) {
      alert("Please select a rating from 1 to 5 stars.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/locations/${locationId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: user?.id,
          username: user?.username,
          rating: newRating
        })
      });

      if (response.ok) {
        const savedReview = await response.json();
        setReviews([savedReview, ...reviews]);
        setNewRating(0); 
      } else {
        alert("Error saving rating.");
      }
    } catch (err) {
      console.error(err);
      alert("No connection to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet";

  return (
    <div className="fixed inset-0 z-[6000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 opacity-100 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
        
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 flex justify-between items-center relative shrink-0">
          <div>
            <h3 className="font-extrabold text-white text-xl tracking-tight">Location Rating</h3>
            <p className="text-blue-100 text-xs mt-0.5 font-medium">{locationTitle}</p>
          </div>
          <button onClick={onClose} className="text-blue-100 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 bg-gray-50/50 flex flex-col items-center">
          
          <div className="text-center mb-6">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Average Rating</h4>
            <div className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
              {averageRating !== "No ratings yet" && <span className="text-yellow-400">★</span>}
              {averageRating}
            </div>
            <p className="text-xs text-gray-400 mt-1">{reviews.length} total votes</p>
          </div>

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          {user ? (
            <div className="w-full flex flex-col items-center">
              <h4 className="text-sm font-bold text-gray-800 mb-3">Rate this workspace</h4>
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-full">
                
                <div className="flex gap-2 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`w-10 h-10 transition-transform duration-150 transform hover:scale-110 ${
                        star <= (hoverRating || newRating) ? 'text-yellow-400 drop-shadow-md' : 'text-gray-200'
                      }`} 
                      fill="currentColor" viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading || newRating === 0}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex justify-center items-center"
                >
                  {isLoading ? 'Submitting...' : 'Submit Rating'}
                </button>
              </form>
            </div>
          ) : (
            <div className="w-full bg-blue-50 text-blue-800 p-4 rounded-xl text-center text-sm font-medium border border-blue-100">
              Please log in to rate this place.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}