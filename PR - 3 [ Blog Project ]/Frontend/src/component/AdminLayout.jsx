import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './AdminLayout.css';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="adminlayout-container">
      <Sidebar />
      <div className="admin-content">
        <AdminHeader />
        <div className="admin-body">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
