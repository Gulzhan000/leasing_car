import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const cars = useSelector(state => state.cars);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Car Leasing</h1>
        
        <div className="car-categories">
          <span>Electric Cars</span>
          <span>Hybrids Cars</span>
          <span>Business/Commercial</span>
        </div>

        <div className="hero-image">
          <img src="/src/pictures/header_Bmw.png" alt="BMW" />
        </div>
      </div>
      
      <h2>Доступные автомобили</h2>
      <div className="car-grid">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`} 
              className="car-image"
            />
            <div className="car-content">
              <h3 className="car-title">{car.brand} {car.model}</h3>
              <p className="car-year">{car.year} год</p>
              <p className="car-price">$ {car.price.toLocaleString()}</p>
              {/* Удалена строка с car-specs */}
              <button 
                className="details-button"
                onClick={() => navigate(`/car/${car.id}`)}
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;