import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import LeaseCard from '../components/LeaseCard';

const MyLeasings = () => {
  const user = useSelector(state => state.user);
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    loadLeases();
  }, []);

  const loadLeases = async () => {
    const data = await api.getLeases();
    // Фильтруем заявки текущего пользователя
    const userLeases = user?.email 
      ? data.filter(lease => lease.email === user.email)
      : data;
    setLeases(userLeases);
  };

  return (
    <div className="my-leasings-page">
      <h1>Мои оформления</h1>
      
      {leases.length === 0 ? (
        <div className="empty-state">
          <p>У вас пока нет оформленных заявок.</p>
          <a href="/">Посмотреть автомобили</a>
        </div>
      ) : (
        <div className="leases-grid">
          {leases.map(lease => (
            <LeaseCard key={lease.id} lease={lease} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLeasings;