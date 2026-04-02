import { Link } from 'react-router-dom';
import './Register.css'; 

export default function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create an account</h2>
        
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
            <p className="register-hint">Password must be at least 6 characters.</p>
          </div>
          
          <button type="submit" className="auth-submit">Sign Up</button>
        </form>
        
        <div className="auth-links">
          Already have an account? 
          <Link to="/login" className="auth-link">Log in here</Link>
        </div>
      </div>
    </div>
  );
}