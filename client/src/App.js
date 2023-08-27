import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/PATIENTS/Dashboard/Dashboard';
import Record from './Components/PATIENTS/Records/Record';
import Stock from './Components/PATIENTS/Stock/Stock';
import Booking from './Components/PATIENTS/Bookings/Booking';
import Navbar from './Components/PATIENTS/Navbar/Navbar';
import Login from './Components/Global/Login/Login';
import Register from './Components/Global/Register/Register.jsx';
import DBooking from './Components/DOCTOR/Bookings/Booking';
import DRecord from './Components/DOCTOR/Records/Record';
import DStock from './Components/DOCTOR/Stock/Stock';
import DDashboard from './Components/DOCTOR/Dashboard/Dashboard';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/record' element={<Record/>}/>
        <Route path='/stock' element={<Stock/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/d' element={<DDashboard/>}/>
        <Route path='/dregister' element={<Register/>}/>
        <Route path='/dstock' element={<DStock/>}/>
        <Route path='/dbooking' element={<DBooking/>}/>
        <Route path='/drecord' element={<DRecord/>}/>
      </Routes>
    </div>
  );
}

export default App;
