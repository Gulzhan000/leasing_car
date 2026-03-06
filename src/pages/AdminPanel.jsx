import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminPanel = () => {
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    loadLeases();
  }, []);

  const loadLeases = async () => {
    const data = await api.getLeases();
    setLeases(data);
  };

  const handleStatusChange = async (leaseId, newStatus) => {
    await api.updateLeaseStatus(leaseId, newStatus);
    loadLeases();
  };

  const handleDeleteLease = async (leaseId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      await api.deleteLease(leaseId);
      loadLeases(); // Перезагружаем список после удаления
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="admin-panel-page">
      <h1 className="page-title">АДМИН</h1>
      
      {leases.length === 0 ? (
        <p>Нет заявок на оформление.</p>
      ) : (
        <div className="leases-container">
          {leases.map(lease => (
            <div key={lease.id} className="admin-lease-card">
              <div className="admin-lease-content">
                <h3 className="admin-car-title">{lease.carName || 'Автомобиль'}</h3>
                
                <div className="admin-details-grid">
                  <p>
                    <strong>Цена:</strong>
                    <span>$ {lease.amount?.toLocaleString()}</span>
                  </p>
                  <p>
                    <strong>Срок:</strong>
                    <span>{lease.term || 12} месяцев</span>
                  </p>
                  <p>
                    <strong>Дата:</strong>
                    <span>{formatDate(lease.date)}</span>
                  </p>
                  <p>
                    <strong>ФИО:</strong>
                    <span>{lease.fullName || 'Не указано'}</span>
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <span>{lease.email || 'Не указан'}</span>
                  </p>
                  <p>
                    <strong>Телефон:</strong>
                    <span>{lease.phone || 'Не указан'}</span>
                  </p>
                  <p>
                    <strong>Персональный номер:</strong>
                    <span>{lease.personalNumber || 'Не указан'}</span>
                  </p>
                  <p>
                    <strong>ID документа:</strong>
                    <span>{lease.documentId || 'Не указан'}</span>
                  </p>
                  <p>
                    <strong>Дата выдачи:</strong>
                    <span>{lease.issueDate || 'Не указана'}</span>
                  </p>
                  <p>
                    <strong>Срок действия:</strong>
                    <span>{lease.expiryDate || 'Не указан'}</span>
                  </p>
                </div>
              </div>
              
              <div className="admin-status-block">
                <div className="status-control">
                  <p className="status-label"><strong>Изменить статус:</strong></p>
                  <select 
                    value={lease.status || 'на рассмотрении'}
                    onChange={(e) => handleStatusChange(lease.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="на рассмотрении">На рассмотрении</option>
                    <option value="одобрено">Одобрить</option>
                    <option value="отказано">Отклонить</option>
                  </select>
                  
                  {/* Кнопка удаления */}
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteLease(lease.id)}
                  >
                    Удалить заявку
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;