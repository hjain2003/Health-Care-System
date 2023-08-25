import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Record from './Components/Records/Record';
import Stock from './Components/Stock/Stock';
import Booking from './Components/Bookings/Booking';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/record' element={<Record/>}/>
        <Route path='/stock' element={<Stock/>}/>
        <Route path='/booking' element={<Booking/>}/>
      </Routes>
    </div>
  );
}

export default App;
