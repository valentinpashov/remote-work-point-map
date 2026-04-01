import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm relative z-[1000] font-sans">
      
      <Link to="/" className="flex items-center cursor-pointer">
        <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Work<span className="text-blue-600">Station</span>
        </span>
      </Link>
      
      <div className="flex items-center gap-3">
        <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-700 transition-colors">
          Login
        </Link>
        
        <Link to="/register" className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all transform active:scale-95">
          Register
        </Link>
      </div>
    </nav>
  );
}