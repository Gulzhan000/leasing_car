import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import LeaseApplication from './pages/LeaseApplication';
import MyLeasings from './pages/MyLeasings';
import AdminPanel from './pages/AdminPanel';

// Action creator
const fetchCars = (cars) => ({
  type: 'FETCH_CARS',
  payload: cars
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    api.getCars().then(cars => {
      dispatch(fetchCars(cars));
    }).catch(error => {
      console.error('Ошибка загрузки автомобилей:', error);
    });
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/lease/:id" element={<LeaseApplication />} />
          <Route path="/my-leasings" element={<MyLeasings />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
