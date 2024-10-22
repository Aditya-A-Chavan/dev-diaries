import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
// import '@fontsource/roboto/400.css';
import './bootstrap-grid.min.css';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import ForgetPassword from './components/Forget';
import VerifyOTP from './components/Verify';
import ResetPassword from './components/Reset';
import CreateBlog from './components/CreateBlog';
import BlogDisplay from './components/DisplayBlog';
import BlogDashboard from './components/BlogDashboard';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<BlogDashboard />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/verify" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/display" element={<BlogDisplay />} />
          </Routes>
        </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;