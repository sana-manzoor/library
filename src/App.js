import './App.css';
import { Routes,Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Bookadd from './components/Bookadd';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Viewbook from './components/Viewbook';
import Viewstudent from './components/Viewstudent';
import Editbook from './components/Editbook';
import User from './pages/User';
import History from './components/History';
import Viewreservation from './components/Viewreservation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Editprofile from './components/Editprofile';
import Forgotp from './components/Forgotp';
import Changep from './components/Changep';

function App() {
  return (
    <div className="App">

      <Header/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin' element={<Admin/>}/>
        <Route path='/addb' element={<Bookadd/>}/>
        <Route path='/log' element={<Login/>}/>
        <Route path='/reg' element={<Register/>}/>
        <Route path='/viewb' element={<Viewbook/>}/>
        <Route path='/viewS' element={<Viewstudent/>}/>
        <Route path='/editb' element={<Editbook/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/reservelist' element={<Viewreservation/>}/>
        <Route path='/editprof' element={<Editprofile/>}/>
        <Route path='/forgotp' element={<Forgotp/>}/>
        <Route path='/changep' element={<Changep/>}/>

      </Routes>
      <ToastContainer/>
      {/* <Footer/> */}
     
    </div>
  );
}

export default App;
