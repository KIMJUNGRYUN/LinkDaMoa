// App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adult_Tiktok from './components/Adult_Tiktok';
import AdultList from './components/AdultList';
import Animation from './components/Animaion';
import Drama from './components/Drama';
import Foreign from './components/Foreign';
import Pleasure from './components/Pleasure';
import Sports from './components/Sports';
import WebToon from './components/WebToon';
import AdminPage from './components/Admin/AdminPage';
import AdminBannerList from './components/Admin/AdminBannerList';
import UserBannerList from './components/BannerList';
import AdminLogin from './components/Admin/AdminLogin';
import Footer from './components/Footer';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import ChangePasswordForm from './components/Admin/ChangePasswordForm';

function HomePage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto space-y-10 ">
      {/* 배너*/}
      <UserBannerList />

      {/*  콘텐츠 목록*/}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-start auto-rows-auto">
        <AdultList /> 
        <Foreign />
        <Adult_Tiktok /> 
        <Pleasure />
        <Animation />
        <Drama />
        <Sports />
        <WebToon />
       
      </div>
    </div>
  );
}


function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

         <Route
          path="/admin/changepassword"
          element={
            <ProtectedRoute>
              <ChangePasswordForm />
            </ProtectedRoute>
          }
        />

     

        <Route
          path="/admin/banner"
          element={
            <ProtectedRoute>
              <AdminBannerList />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
