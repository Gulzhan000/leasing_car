import React from 'react';

const LeaseCard = ({ lease, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'одобрено': return '#27ae60';
      case 'отказано': return '#e74c3c';
      default: return '#f39c12';
    }
  };

  return (
    <div className="lease-card">
      <div>
        <h3>{lease.carName || 'Автомобиль'}</h3>
        <span style={{backgroundColor: getStatusColor(lease.status)}}>
          {lease.status || 'на рассмотрении'}
        </span>
      </div>
      
      <div>
        <p><strong>Сумма:</strong> {lease.amount?.toLocaleString()} ₽</p>
        <p><strong>Срок:</strong> {lease.term || 12} месяцев</p>
        <p><strong>Дата:</strong> {lease.date || new Date().toLocaleDateString()}</p>
        <p><strong>ФИО:</strong> {lease.fullName || 'Не указано'}</p>
        <p><strong>Email:</strong> {lease.email || 'Не указан'}</p>
        <p><strong>Телефон:</strong> {lease.phone || 'Не указан'}</p>
        <p><strong>Персональный номер:</strong> {lease.personalNumber || 'Не указан'}</p>
        <p><strong>ID документа:</strong> {lease.documentId || 'Не указан'}</p>
        <p><strong>Дата выдачи:</strong> {lease.issueDate || 'Не указана'}</p>
        <p><strong>Срок действия:</strong> {lease.expiryDate || 'Не указан'}</p>
      </div>

      {onStatusChange && (
        <div>
          <label>Изменить статус: </label>
          <select 
            value={lease.status || 'на рассмотрении'}
            onChange={(e) => onStatusChange(lease.id, e.target.value)}
          >
            <option value="на рассмотрении">На рассмотрении</option>
            <option value="одобрено">Одобрено</option>
            <option value="отказано">Отказано</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default LeaseCard;