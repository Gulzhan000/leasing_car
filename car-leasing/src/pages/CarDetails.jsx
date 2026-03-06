import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const cars = useSelector(state => state.cars);

  useEffect(() => {
    // Сначала ищем в Redux store
    const foundCar = cars.find(c => c.id === parseInt(id));
    if (foundCar) {
      setCar(foundCar);
      setLoading(false);
    } else {
      // Если нет в store, загружаем из API
      api.getCarById(id).then(data => {
        setCar(data);
        setLoading(false);
      }).catch(error => {
        console.error('Ошибка загрузки автомобиля:', error);
        setLoading(false);
      });
    }
  }, [id, cars]);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!car) {
    return <div className="not-found">Автомобиль не найден</div>;
  }

  return (
    <div className="car-details-page">
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>

      <div className="car-details-container">
        <div className="car-image-section">
          <img 
            src={car.image} 
            alt={`${car.brand} ${car.model}`} 
            className="car-detail-image"
          />
        </div>

        <div className="car-info-section">
          <h1>{car.brand} {car.model}</h1>
          <p className="car-year">{car.year} год</p>
          <p className="car-price">$ {car.price.toLocaleString()}</p>
          
          <div className="car-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Двигатель:</span>
              <span className="spec-value">{car.engine}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Коробка:</span>
              <span className="spec-value">{car.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Привод:</span>
              <span className="spec-value">{car.drive}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Цвет:</span>
              <span className="spec-value">{car.color}</span>
            </div>
          </div>

          <button 
            className="lease-button"
            onClick={() => navigate(`/lease/${car.id}`)}
          >
            Оформить лизинг
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;