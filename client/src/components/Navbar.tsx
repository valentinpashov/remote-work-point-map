import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); 
    window.location.reload(); 
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[5000] bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
            Work<span className="text-blue-600">Station</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`font-bold text-sm transition-all duration-300 relative py-2 ${
              isActive('/') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Map Explorer
            {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full animate-pulse"></span>}
          </Link>
          
          <Link 
            to="/catalog" 
            className={`font-bold text-sm transition-all duration-300 relative py-2 ${
              isActive('/catalog') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Workspace Gallery
            {isActive('/catalog') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full animate-pulse"></span>}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 py-1.5 px-2 rounded-2xl shadow-inner">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-7 h-7 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full font-bold text-xs">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-gray-700 pr-2 border-r border-gray-200">
                  {user.username}
                </span>
              </div>
              <button 
                onClick={handleLogout} 
                className="text-sm font-bold text-red-500 hover:text-white hover:bg-red-500 px-4 py-1.5 rounded-xl transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
              >
                Log in
              </Link>
              <Link 
                to="/register" 
                className="text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 px-6 py-2.5 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}