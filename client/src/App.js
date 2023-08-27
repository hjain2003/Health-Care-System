import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Record from './Components/Records/Record';
import Stock from './Components/Stock/Stock';
import Booking from './Components/Bookings/Booking';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register.jsx';



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
      </Routes>
    </div>
  );
}

export default App;
