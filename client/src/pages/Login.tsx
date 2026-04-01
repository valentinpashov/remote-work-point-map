import { Link } from 'react-router-dom';
import './Login.css'; 

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign in to WorkStation</h2>
        
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="name@example.com" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required />
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