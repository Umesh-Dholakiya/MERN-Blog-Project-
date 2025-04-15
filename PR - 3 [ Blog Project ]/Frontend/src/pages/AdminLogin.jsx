import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:9000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      const { token, user } = data;
      setAuth({ token, user }); 
      localStorage.setItem('auth', JSON.stringify({ token, user }));
      navigate('/blog/addblog'); 
    } else {
      alert(data.msg || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon-wrapper">
          <HiOutlineArrowRightOnRectangle className="login-icon" />
        </div>
        <h2 className="login-title">Sign in with email</h2>
        <p className="login-subtext">Make a new doc to bring your words, data, and teams together. For free</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="forgot-password">Forgot password?</div>
          <button type="submit" className="login-button">Get Started</button>
        </form>

        <p className="switch-link">
          Don’t have an account?{' '}
          <span className="register-link" onClick={() => navigate('/admin/register')}>
            Register here
          </span>
        </p>

        <div className="login-or">Or sign in with</div>
        <div className="social-login">
          <button><FaGoogle /></button>
          <button><FaFacebookF /></button>
          <button><FaApple /></button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
