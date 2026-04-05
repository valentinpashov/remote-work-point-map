import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  // check for the logged-in user 
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm relative z-[1000] font-sans">
      
      <Link to="/" className="flex items-center cursor-pointer">
        <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Work<span className="text-blue-600">Station</span>
        </span>
      </Link>
      
      
    </nav>
  );
}