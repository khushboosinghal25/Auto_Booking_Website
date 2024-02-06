import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import StudentRegister from './pages/Auth/StudentRegister';
import StudentLogin from './pages/Auth/StudentLogin';
import ProviderRegister from './pages/Auth/ProviderRegister';
import ProviderLogin from './pages/Auth/ProviderLogin';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminLogin from './pages/Auth/AdminLogin';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import StudentRoute from './components/Routes/StudentRoute';
import StudentDashboard from './pages/Student/StudentDashboard';
import ProviderRoute from './components/Routes/ProviderRoute';
import ProviderDashboard from './pages/Provider/ProviderDashboard';
import StudentProfile from './pages/Student/StudentProfile';
import AdminProfile from './pages/Admin/AdminProfile';
import ProviderProfile from './pages/Provider/ProviderProfile';
import Students from './pages/Admin/Students';
import Providers from './pages/Admin/Providers';
import Places from './pages/Admin/Places';
import BookingPage from './pages/BookingPage';
import NotificationPage from './pages/NotificationPage';
import ProviderSetTime from './pages/ProviderSetTime';
import ProviderBookings from './pages/Provider/ProviderBookings';
import StudentBookings from './pages/Student/StudentBookings';
import Pricing from './pages/Pricing';

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/provider-register" element={<ProviderRegister />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<AdminRoute />} >

          <Route path='admin' element={<AdminDashboard />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/students" element={<Students />} />
          <Route path="admin/providers" element={<Providers />} />
          <Route path="admin/places" element={<Places />} />

        </Route>

        <Route path="/dashboard" element={<StudentRoute />}>
          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/profile" element={<StudentProfile />} />
          <Route path="student/student-bookings" element={<StudentBookings />} />
        </Route>

        <Route path="/dashboard" element={<ProviderRoute />}>
          <Route path="provider" element={<ProviderDashboard />} />
          <Route path="provider/provider-profile" element={<ProviderProfile />} />
          <Route path="provider/set-time" element={<ProviderSetTime />} />
          <Route path="provider/provider-bookings" element={<ProviderBookings />} />

        </Route>

        <Route path="/booking/:source/:destination/:providerId" element={<BookingPage />} />
        <Route path="/notification" element={<NotificationPage />} />

      </Routes>

    </>
  );
}

export default App;
