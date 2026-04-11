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

  const linkClasses = "text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors py-1 px-2 rounded hover:bg-gray-50";

  return (
    <nav className="grid grid-cols-3 items-center px-6 py-4 bg-white border-b border-gray-100 shadow-sm relative z-[1000] font-sans">
      
      <div className="flex justify-start">
        <Link to="/" className="flex items-center cursor-pointer">
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Remote - Work<span className="text-blue-600">Point</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center gap-6">
        <Link to="/" className={linkClasses}>
          Map
        </Link>
        <Link to="/catalog" className={linkClasses}>
          Catalog
        </Link>
      </div>
      
      <div className="flex justify-end items-center gap-3">
        {user ? (
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="px-5 py-2.5 text-sm font-semibold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-700 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all transform active:scale-95">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}