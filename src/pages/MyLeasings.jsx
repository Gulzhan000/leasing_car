import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';

const MyLeasings = () => {
  const user = useSelector(state => state.user);
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    loadLeases();
  }, []);

  const loadLeases = async () => {
    const data = await api.getLeases();
    // Для теста показываем все заявки
    setLeases(data);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'одобрено': return '#27ae60';
      case 'отказано': return '#e74c3c';
      default: return '#f39c12';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'одобрено': return 'ОДОБРЕНО';
      case 'отказано': return 'ОТКАЗАНО';
      default: return 'НА РАССМОТРЕНИИ';
    }
  };

  return (
    <div className="my-leasings-page">
      <h1 className="page-title">МОИ ОФОРМЛЕНИЯ</h1>
      
      {leases.length === 0 ? (
        <div className="empty-state">
          <p>У вас пока нет оформленных заявок.</p>
          <a href="/">Посмотреть автомобили</a>
        </div>
      ) : (
        <div className="leases-container">
          {leases.map(lease => (
            <div key={lease.id} className="user-lease-card">
              <div className="user-lease-content">
                <h3 className="user-car-title">{lease.carName || 'Автомобиль'}</h3>
                
                <div className="user-details">
                  <p><strong>Email:</strong> {lease.email || 'Не указан'}</p>
                  <p><strong>ФИО:</strong> {lease.fullName || 'Не указано'}</p>
                  <p><strong>Срок:</strong> {lease.term || 12} месяцев</p>
                  <p><strong>Дата оформления:</strong> {formatDate(lease.date)}</p>
                </div>
              </div>
            
              <div className="user-status-block">
                <p className="status-label"><strong>Статус:</strong></p>
                <span 
                  className="status-badge"
                  style={{backgroundColor: getStatusColor(lease.status)}}
                >
                  {getStatusText(lease.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyLeasings;