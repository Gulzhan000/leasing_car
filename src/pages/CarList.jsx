import React from 'react';
import { useSelector } from 'react-redux';
import CarCard from '../components/CarCard';

const CarList = () => {
  const cars = useSelector(state => state.cars);

  return (
    <div className="car-list-container">
      <h2>Доступные автомобили</h2>
      <div className="car-grid">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarList;