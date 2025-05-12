import { Link } from 'react-router-dom';
import './Sidebar.css';
import logoImg from '../assets/logo.png';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logoImg} alt="Logo" className="logo-img" />
            </div>
            <nav className="sidebar-nav">
                <Link to="/"> 📊 Dashboard</Link>
                <Link to="/blog/addblog">➕ Add blogs</Link>
                <Link to="/blog/bloglist">📝 Blog lists</Link>
                <Link to="/blog/subscriptions">📧 Subscriptions</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
