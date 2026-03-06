import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeaseForm from '../components/LeaseForm';

const LeaseApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const cars = useSelector(state => state.cars);

  useEffect(() => {
    const foundCar = cars.find(c => c.id === parseInt(id));
    if (foundCar) {
      setCar(foundCar);
    } else {
      navigate('/cars');
    }
  }, [id, cars, navigate]);

  if (!car) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <LeaseForm car={car} />
    </div>
  );
};

export default LeaseApplication;