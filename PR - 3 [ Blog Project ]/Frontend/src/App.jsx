import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BlogDetail from "./pages/BlogDetail"; 
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AddBlog from "./pages/AddBlog";
import BlogList from "./pages/BlogList";
import Subscriptions from "./pages/Subscriptions";
import AdminLayout from "./component/AdminLayout";
import PrivateRoute from "./Private/PrivateRoute";
import EditBlog from "./pages/EditBlog";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        <Route path="/blog" element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="addblog" element={<AddBlog />} />
            <Route path="bloglist" element={<BlogList />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="editblog/:id" element={<EditBlog />} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
