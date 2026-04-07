import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  // check for the logged-in user 
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm relative z-[1000] font-sans">
      
      <Link to="/" className="flex items-center cursor-pointer">
        <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Work<span className="text-blue-600">Station</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              Welcome, <span className="font-bold text-gray-800">{user.username}</span>
            </span>
            <button 
              onClick={handleLogout}
              className="px-5 py-2.5 text-sm font-semibold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link 
              to="/login" 
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-700 transition-colors"
            >
              Login
            </Link>
            
            <Link 
              to="/register" 
              className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all transform active:scale-95"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}