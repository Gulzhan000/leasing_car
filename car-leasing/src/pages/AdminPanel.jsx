import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LeaseCard from '../components/LeaseCard';

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

  return (
    <div className="admin-panel-page">
      <h1>Профиль администратора</h1>
      <h2>Управление заявками</h2>
      
      {leases.length === 0 ? (
        <p>Нет заявок на оформление.</p>
      ) : (
        <div className="leases-grid">
          {leases.map(lease => (
            <LeaseCard 
              key={lease.id} 
              lease={lease}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;