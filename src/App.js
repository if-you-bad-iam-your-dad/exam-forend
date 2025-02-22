import { Router,Routes,Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import LoginForm from './pages/login/login';
import Questions from './pages/questions/Question'
import Dashboard from './pages/dashboard/dashboard';
import ExamSchedule from './pages/examSchedule/ExamSchedule';
import './App.css';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import RegisterForm from './pages/register/RegisterForm';
import ExamPortal from './pages/exam-questions/ExamPortal';
// import CreateQuestion from './pages/createQuestion/CreateQuestion.jsx';

function App() {
  // const location = useLocation();
  // const hideSidebar = location.pathname === "/login";
  return (

    <div>
    <Routes>
    <Route path='/' element={<LoginForm/>}/>
    <Route path='/register' element={<RegisterForm/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
    <Route path='/question' element={<Questions/>}/>
    <Route path='/exam-schedule' element={<ExamSchedule/>}/>
    <Route path='/exam-portal' element={<ExamPortal/>}/>
    {/* <Route path='/create-question' element={<CreateQuestion/>}/> */}
    
    </Routes>
  </div>
    
  );
}

export default App;
