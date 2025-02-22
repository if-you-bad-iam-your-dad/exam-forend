
import { Router,Routes,Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import LoginForm from './pages/login/login';
import Questions from './pages/questions/Question'
import SocialMediaPost from './component/socialMediaPost/socialMediaPost';
import Dashboard from './pages/dashboard/dashboard';
import ExamSchedule from './pages/examSchedule/ExamSchedule';
import './App.css';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import RegisterForm from './pages/register/RegisterForm';



function App() {
  // const location = useLocation();
  // const hideSidebar = location.pathname === "/login";
  return (

    <div>
    <Routes>
    <Route path='/login' element={<LoginForm/>}/>
    <Route path='/register' element={<RegisterForm/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
    <Route path='/question' element={<Questions/>}/>
    <Route path='/exam-schedule' element={<ExamSchedule/>}/>
    <Route path='/media-post' element={<SocialMediaPost/>}/>
    </Routes>
  </div>
    
  );
}

export default App;
