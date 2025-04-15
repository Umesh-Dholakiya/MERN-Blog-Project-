import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => (
  <header className="custom-header">
    <div className="logo-container">
      <img src={logo} alt="logo" />
    </div>
    <Link to="/admin/login" className="get-started-btn">
      Get started →
    </Link>
  </header>
);

export default Header;
