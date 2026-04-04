import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // save user data to localStorage
        localStorage.setItem('user', JSON.stringify(data));
        
        navigate('/');
      } else {
        setError(data.error || 'Грешка при вход.');
      }
    } catch (err) {
      console.error(err); 
      setError('Cannot connect to the server. Please check if it is running!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign in</h2>
        
        {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email"  
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"  
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="auth-submit">Sign In</button>
        </form>
        
        <div className="auth-links">
          Don't have an account? 
          <Link to="/register" className="auth-link">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}