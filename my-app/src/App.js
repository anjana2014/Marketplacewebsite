import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Student from './components/Student';
import Signup from './components/Signup';
import ManageClubs from './components/ManageClubs';
import Chat from './components/Chat';
import ManageProducts from './components/ManageProducts';
import ManageAdvertisements from './components/ManageAdvertisements';
import BusinessOwner from './components/Business';
import ManageBusiness from './components/ManageBusiness';
import ManageBusinessAdvertisements from './components/ManageBusinessAdvertisements';
import Admin from './components/Admin';
import ManageStudents from './components/ManageStudents';
import ManageBusinessOwner from './components/ManageBusinessOwner';
import ModerateClubs from './components/ModerateClubs';
import ModeratePosts from './components/ModeratePosts';
import ManageShoolAdmin from './components/ManageSchoolAdmin';
import ViewReportsAdmin from './components/ViewReportsAdmin';
import SchoolAdmin from './components/SchoolAdmin'
import ForgetPassword from './components/ForgetPassword';
function App() {
  return (
    <div className="App" style={{ height: '100%' }}>
      <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/home'  element={<Home/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/student' element={<Student/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/manageclubs' element={<ManageClubs/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/manageproducts' element={<ManageProducts/>}/>
        <Route path='/manageadvertisements' element={<ManageAdvertisements/>}/>
        <Route path='/businessowner' element={<BusinessOwner/>}/>
        <Route path='/managebusiness' element={<ManageBusiness/>}/>
        <Route path='/managebusinessAdvertisements' element={<ManageBusinessAdvertisements/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/managestudents' element={<ManageStudents/>}/>
        <Route path='/managebusinessowner' element={<ManageBusinessOwner/>}/>
        <Route path='/moderateclubs' element={<ModerateClubs/>}/>
        <Route path='/moderateposts' element={<ModeratePosts/>}/>
        <Route path='/manageschooladmin' element={<ManageShoolAdmin/>}/>
        <Route path='/viewreportsadmin' element={<ViewReportsAdmin/>}/>
        <Route path='/schooladmin' element={<SchoolAdmin/>}/>
        <Route path='/ForgetPassword' element={<ForgetPassword/>}/>
        

        

        
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
