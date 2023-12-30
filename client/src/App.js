import { Route,Routes } from 'react-router-dom';
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

function App() {
  return (
    <>
    <Routes>

      <Route path="/" element={<HomePage />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/policy" element={<Policy />}/>

      <Route path="/student-register" element={<StudentRegister />}/>
      <Route path="/student-login" element={<StudentLogin />}/>
      <Route path="/provider-register" element={<ProviderRegister />}/>
      <Route path="/provider-login" element={<ProviderLogin />}/>
      <Route path="/admin-login" element={<AdminLogin />}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />

     <Route path="/dashboard" element={<AdminRoute />} >

      <Route path='admin' element={<AdminDashboard />} />

     </Route>

     <Route path="/dashboard" element={<StudentRoute />}>
       <Route path="student" element={<StudentDashboard />} />
     </Route>

     <Route path="/dashboard" element={<ProviderRoute />}>
      <Route path="provider" element={<ProviderDashboard />} />
     </Route>


    </Routes>
     
    </>
  );
}

export default App;
