import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import profileImg from '../assets/profile.png';

const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const adminName = 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="admin-header">
      <div className="left">
        <h2>Admin Panel</h2>
      </div>
      <div className="right">
        <img
          src={profileImg}
          alt="Admin"
          className="admin-avatar"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <p className="admin-name">👤 {adminName}</p>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
